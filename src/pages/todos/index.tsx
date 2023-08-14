import React from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "@/redux/api/apiSlice";

type Props = {};

const index = (props: Props) => {
  const [title, setTitle] = React.useState<string>("");
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const {
    data: todos,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetTodosQuery({});

  const handleAddTodo = (title: string) => {
    addTodo({
      title,
      completed: false,
      userId: 1,
    });
    setTitle("");
  };

  const handleUpdateTodo = (id: number, completed: boolean) => {
    updateTodo({
      id: id,
      completed: !completed,
    });
  };

  return (
    <div>
      <input
        type="text"
        className="border border-gray-700 m-2 p-1"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        className="border border-gray-700 p-1"
        onClick={() => handleAddTodo(title)}
      >
        add
      </button>
      <div className="ml-[50px] flex flex-col gap-[4px]">
        {todos?.map((todo: any) => {
          return (
            <div className="flex gap-[20px]">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleUpdateTodo(todo.id, todo.completed)}
              />
              <p>{todo.title}</p>
              <button className="h-[21px] bg-red-400 text-white w-[21px] rounded-full flex justify-center items-center" onClick={() => deleteTodo({ id: todo.id })}>x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
