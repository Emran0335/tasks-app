import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    // console.log(params.taskId);
    if (!params.taskId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const deleteTask = await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });
    return NextResponse.json(deleteTask);
  } catch (error) {
    console.log("Error deleting: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
