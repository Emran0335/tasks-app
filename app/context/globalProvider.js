"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import themes from "./themes";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapse, setCollapse] = useState(false);

  // for editing
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({
    title: "",
    description: "",
    id: "",
  });
  const handleEdit = useCallback(({ title, description, id }) => {
    setIsEditing(true);
    setTaskToEdit({ title, description, id });
  });

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapse(!collapse);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      const sortedTasks = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setTasks(sortedTasks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const deleteTask = async (id) => {
    try {
      const apiUrl = `api/tasks/${id}/delete`;
      const requestData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(apiUrl, requestData);
      if (!response.ok) {
        throw new Error(`Failed to delete ${title} - ${response.statusText}`);
      }
      toast.success("Task Deleted!");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task.id}/update/`, task);
      if (res.data.error) {
        toast.error(res.data.error);
      }
      toast.success("Task updated successfully.");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        allTasks,
        deleteTask,
        updateTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        modal,
        openModal,
        setModal,
        closeModal,
        collapse,
        collapseMenu,

        // for editing or creating
        isEditing,
        setIsEditing,
        taskToEdit,
        handleEdit,
      }}
    >
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
