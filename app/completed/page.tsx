"use client";
import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

function page() {
  const { completedTasks } = useGlobalState();
  return <Tasks TaskHeader="Completed Tasks" tasks={completedTasks} />;
}

export default page;
