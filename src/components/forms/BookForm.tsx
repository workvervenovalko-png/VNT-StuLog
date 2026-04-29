"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import InputField from "../InputField";
import { createBook } from "@/lib/actions";

import { bookSchema, BookSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

const BookForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
  });

  const [state, formAction] = useFormState(createBook, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Book has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add a new book" : "Update book details"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
        <InputField
          label="Author"
          name="author"
          defaultValue={data?.author}
          register={register}
          error={errors.author}
        />
        <InputField
          label="ISBN"
          name="isbn"
          defaultValue={data?.isbn}
          register={register}
          error={errors.isbn}
        />
        <InputField
          label="Total Copies"
          name="totalCopies"
          type="number"
          defaultValue={data?.totalCopies}
          register={register}
          error={errors.totalCopies}
        />
      </div>
      {state.error && <span className="text-red-500">Something went wrong!</span>}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Add" : "Update"}
      </button>
    </form>
  );
};

export default BookForm;
