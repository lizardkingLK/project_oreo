import clientPromise from "@/lib/mongodb";
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
    .find({ $or: [{ from: userObjectId }, { to: userObjectId }] })
    .toArray();
};
