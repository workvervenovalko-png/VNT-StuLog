"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import InputField from "../InputField";
import { createEvent } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  classId: z.string().optional(),
});

type EventSchema = z.infer<typeof eventSchema>;

const EventForm = ({
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
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const [state, formAction] = useFormState(createEvent, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Event has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new event" : "Update the event"}
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
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
        <InputField
          label="Start Time"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors.startTime}
          type="datetime-local"
        />
        <InputField
          label="End Time"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors.endTime}
          type="datetime-local"
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EventForm;
