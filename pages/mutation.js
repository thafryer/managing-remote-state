import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import axios from "axios";
export default function Mutation() {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { status, data } = useQuery("todos", async () => {
    const res = await axios.get("/api/todos");
    return res.data;
  });

  const addTodoMutation = useMutation(
    (text) => axios.post("/api/todos", { text }),
    {
      onMutate: async (text) => {
        setText("");
        await queryClient.cancelQueries("todos");

        const previousValue = queryClient.getQueryData("todos");

        queryClient.setQueryData("todos", (old) => ({
          ...old,
          todos: [...old.todos, text],
        }));

        return previousValue;
      },
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData("todos", previousValue),
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error!!! -&gt; {error}</p>;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodoMutation.mutate(text);
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="text"
              onChange={(event) => setText(event.target.value)}
              value={text}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Fix Breakfast"
            />
          </div>
        </div>
        <button>{addTodoMutation.isLoading ? "Creating..." : "Create"}</button>
      </form>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  );
}
