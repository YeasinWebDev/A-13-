import { connectDb } from "@/lib/conectDb";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  const user: user = await request.json();

  try {
    const db = await connectDb();
    if (!db) {
      return new Response(
        JSON.stringify({ message: "Database connection failed" }),
        { status: 500 }
      );
    }

    const userCollection = await db.collection("users");
    const exist = await userCollection.findOne({ email: user.email });
    if (exist) {
      return Response.json({ massage: "user already exist" }, { status: 400 });
    }


    const hashPassword = bcrypt.hashSync(user.password, 10);

    const result = await userCollection.insertOne({
      ...user,
      password: hashPassword,
    });


    return Response.json(
      { massage: "user Created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { massage: "user not Created", error },
      { status: 400 }
    );
  }
};

type user = {
  name: string;
  email: string;
  password: string;
};
