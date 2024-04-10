import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  // console.log(params.taskId);
  try {
    if (!params.taskId) {
      return NextResponse.json({ error: "Not Found!", status: 401 });
    }

    const { isCompleted } = await req.json();

    const updateTask = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        isCompleted: isCompleted,
      },
    });
    return NextResponse.json(updateTask);
  } catch (error) {
    console.log("Error updating: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
