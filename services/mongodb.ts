import clientPromise from "@/lib/mongodb";
import { Message } from "@/types";
import { dbCollections } from "@/utils/enums";
import { ObjectId } from "mongodb";

export const getUserByEmail = async (email: string) => {
  const client = await clientPromise,
    db = client.db(process.env.DB_NAME);
  return db.collection(dbCollections.users).findOne({ email });
};

export const getMessages = async (userId: string) => {
  const client = await clientPromise,
    db = client.db(process.env.DB_NAME),
    userObjectId = new ObjectId(userId);
  return db
    .collection(dbCollections.messages)
    .aggregate<Message>([
      {
        $match: {
          $or: [{ fromId: userObjectId }, { toId: userObjectId }],
        },
      },
      {
        $lookup: {
          from: dbCollections.users,
          localField: "fromId",
          foreignField: "_id",
          as: "from",
        },
      },
      {
        $unwind: "$from",
      },
      {
        $lookup: {
          from: dbCollections.users,
          localField: "toId",
          foreignField: "_id",
          as: "to",
        },
      },
      {
        $unwind: "$to",
      },
      {
        $project: {
          from: { email: 0, password: 0 },
          to: { email: 0, password: 0 },
        },
      },
      {
        $sort: { createdOn: 1 },
      },
    ])
    .toArray();
};
