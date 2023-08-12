import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addTodo, updateTodo, deleteTodo } from "@/redux/slice";
import { useDispatch } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

type Todo = {
  id: string;
  task: string;
  is_completed: boolean;
  created_at: string;
  due_on: string;
};

export default function Home() {
  const [task, setTask] = React.useState<string>("");
  const [due, setDue] = React.useState<string>("");
  const [deleteAttempt, setDeleteAttempt] = React.useState<number>(0);

  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const addTask = () => {
    if (!task) {
      alert("Please enter a task");
      return;
    }
    if (!due) {
      alert("Please enter a due time");
      return;
    }
    dispatch(
      addTodo({
        id: uuidv4(),
        task,
        is_completed: false,
        created_at: new Date().toLocaleTimeString(),
        due_on: due,
      })
    );
    setTask("");
  };
  const handleDelete = (todoObject: Todo) => {
    console.log(deleteAttempt);
    if (!todoObject.is_completed) {
      if (deleteAttempt > 0) {
        dispatch(deleteTodo(todoObject));
        setDeleteAttempt(0);
        return;
      }
      alert(
        "You are going to delete an uncompleted task press delete once again."
      );
      setDeleteAttempt((prev) => prev + 1);
      console.log(deleteAttempt);
      return;
    }
    dispatch(deleteTodo(todoObject));
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 py-4">Todo List</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex gap-5">
          <input
            type="text"
            className="border border-gray-700 p-2 focus:border-none"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <input
            type="time"
            className="border border-gray-700 p-2 focus:border-none"
            value={due}
            onChange={(e) =>
              setDue(
                new Date(`1980-09-01T${e.target.value}`).toLocaleTimeString()
              )
            }
          />
          <button
            onClick={addTask}
            className="border border-gray-700 py-2 px-4 hover:text-white hover:bg-gray-700 cursor-pointer active:bg-gray-900 duration-150"
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex justify-center items-start mt-[30px]">
        <ul className="">
          {todos.map((todo) => (
            <li className="flex gap-[10px] items-center mb-[8px]">
              <input
                type="checkbox"
                className="mr-[5px]"
                checked={todo.is_completed}
                onChange={() => dispatch(updateTodo(todo))}
              />
              <span className="ml-2 mr-[100px]">
                {todo.is_completed ? <s>{todo.task}</s> : todo.task}
              </span>
              {todo.is_completed ? <s>from</s> : <span>from</span>}
              <span className="font-bold">
                {todo.is_completed ? <s>{todo.created_at}</s> : todo.created_at}
              </span>
              {todo.is_completed ? <s>to</s> : <span>to</span>}
              <span className="font-bold">
                {todo.is_completed ? <s>{todo.due_on}</s> : todo.due_on}
              </span>
              <button
                className="ml-4 border border-gray-700 py-1 px-2 hover:bg-gray-700 hover:text-white active:bg-gray-900"
                onClick={() => handleDelete(todo)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
