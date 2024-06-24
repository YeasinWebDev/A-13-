import { Db, MongoClient, ServerApiVersion } from "mongodb";

let db: Db | undefined;
export const connectDb = async ():Promise<Db | undefined> => {
  if (db) return db;

  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("a13");
    return db;
  } catch (error) {
    console.log(error);
  }
};
