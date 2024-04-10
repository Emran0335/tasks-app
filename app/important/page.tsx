"use client";
import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

function page() {
  const { importantTasks } = useGlobalState();
  return <Tasks TaskHeader="Important Tasks" tasks={importantTasks} />;
}

export default page;
