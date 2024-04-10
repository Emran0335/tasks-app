"use client";
import Tasks from "../components/Tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

function page() {
  const { incompleteTasks } = useGlobalState();
  return <Tasks TaskHeader="Incomplete Tasks" tasks={incompleteTasks} />;
}
export default page;
