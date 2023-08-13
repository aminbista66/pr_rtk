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

  const handleAddTodo = () => {
    addTodo({
      title,
      completed: false,
      userId: 1
    });
  }


  return (
    <div>
      <input type="text" onChange={(e) => setTitle(e.target.value)}/>
      <button>add</button>
    </div>
  );
};

export default index;
