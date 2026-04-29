"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { z } from "zod";
import { createBookIssue } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = z.object({
  bookId: z.string().min(1, { message: "Book is required!" }),
  classId: z.string().min(1, { message: "Class is required!" }),
  studentId: z.string().min(1, { message: "Student is required!" }),
  dueDate: z.string().min(1, { message: "Due date is required!" }),
});

type Schema = z.infer<typeof schema>;

const BookIssueForm = ({
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
    watch,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const [state, formAction] = useFormState(createBookIssue, {
    success: false,
    error: false,
  });

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Book has been issued successfully!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, setOpen]);

  const { books, classes, students } = relatedData;
  const selectedClassId = watch("classId");
  
  // Filter students based on selected class
  const filteredStudents = students.filter((s: any) => s.classId.toString() === selectedClassId);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Issue a Book</h1>

      <div className="flex justify-between flex-wrap gap-4">
        {/* BOOK SELECTION */}
        <div className="flex flex-col gap-2 w-full md:w-[45%]">
          <label className="text-xs text-gray-400">Select Book</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("bookId")}
          >
             <option value="">Select a book</option>
            {books.map((book: { id: number; title: string; availableCopies: number }) => (
              <option value={book.id} key={book.id} disabled={book.availableCopies === 0}>
                {book.title} ({book.availableCopies} available)
              </option>
            ))}
          </select>
          {errors.bookId?.message && (
            <p className="text-xs text-red-400">{errors.bookId.message.toString()}</p>
          )}
        </div>

        {/* CLASS SELECTION */}
        <div className="flex flex-col gap-2 w-full md:w-[45%]">
          <label className="text-xs text-gray-400">Step 1: Select Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            onChange={(e) => {
                register("classId").onChange(e);
                setValue("studentId", ""); // Reset student on class change
            }}
          >
            <option value="">Select Class</option>
            {classes.map((c: { id: number; name: string }) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">{errors.classId.message.toString()}</p>
          )}
        </div>

        {/* STUDENT SELECTION */}
        <div className="flex flex-col gap-2 w-full md:w-[45%]">
          <label className="text-xs text-gray-400">Step 2: Select Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentId")}
            disabled={!selectedClassId}
          >
            <option value="">Select Student</option>
            {filteredStudents.map((s: { id: string; name: string; surname: string }) => (
              <option value={s.id} key={s.id}>
                {s.name} {s.surname}
              </option>
            ))}
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">{errors.studentId.message.toString()}</p>
          )}
        </div>

        <InputField
          label="Due Date"
          name="dueDate"
          register={register}
          error={errors.dueDate}
          type="date"
        />
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        Issue Book
      </button>
    </form>
  );
};

export default BookIssueForm;
