import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const { userId } = auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
      }
      const tasks = await prisma.task.findMany({
        where: {
          userId,
        },
      });
      // console.log("all tasks", tasks);
      return NextResponse.json(tasks);
    } catch (error) {
      console.log("Error getting: ", error);
      return NextResponse.json({ error: "Error getting task", status: 500 });
    }
  }
  