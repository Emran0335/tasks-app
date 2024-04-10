import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  // console.log(params.taskId);
  try {
    if (!params.taskId) {
      return new NextResponse("Not Found!", { status: 404 });
    }
    const { title, description } = await req.json();

    // edit todo title and description
    const editedTask = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        title: title,
        description: description,
      },
    });
    // Respont with the edited task
    return NextResponse.json(editedTask, { status: 200 });
  } catch (error) {
    console.log("[Edited TASK]", error);

    // Handle erros
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
