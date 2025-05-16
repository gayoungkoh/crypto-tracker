/** Copyright © 2025 Qcells. All rights reserved.
This software is proprietary and confidential. Unauthorized use,
duplication, or distribution of software is strictly prohibited.
*/

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/FormField";

export const ToDoList = () => {
  const formSchema = z.object({
    todo: z
      .string()
      .nonempty("To do를 입력해주세요.")
      .min(10, "10자 이상 입력해주세요."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    form.setError(
      "todo",
      { message: "To do를 입력해주세요." },
      { shouldFocus: true }
    );
  };

  return (
    <div className="flex flex-col m-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField name="todo" label="To-Do" placeholder="Write a to-do" />
          <Button type="submit" className="bg-blue-800">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

// export const ToDoList = () => {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDoError("");
//     setToDo(value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do must be longer than 10 characters.");
//     }
//     console.log("submit");
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="Write a to-do"
//         />
//         <button type="submit">Add</button>
//         {toDoError !== "" && <span>{toDoError}</span>}
//       </form>
//     </div>
//   );
// };
