import clientPromise from "@/lib/mongodb";
import { dbCollections } from "@/utils/enums";
import { ObjectId } from "mongodb";

export type Message = {
  _id: ObjectId;
  content: string;
  createdOn: Date;
  type: number;
  fromId: ObjectId;
  toId: ObjectId;
  groupId: ObjectId;
};

export const createGroup = async (email: string, userId: string) => {
  const client = await clientPromise,
    db = client.db(process.env.DB_NAME),
    user = await db.collection(dbCollections.users).findOne({ email }),
    content = "Hello There!";
  if (user) {
    return await db.collection(dbCollections.messages).insertOne({
      content,
      groupId: new ObjectId(),
      fromId: new ObjectId(userId),
      toId: new ObjectId(user._id),
      createdOn: new Date(),
      status: true,
    });
  }
  return null;
};

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
