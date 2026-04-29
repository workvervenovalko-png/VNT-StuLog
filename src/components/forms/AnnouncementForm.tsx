"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import InputField from "../InputField";
import { createAnnouncement } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  classId: z.string().optional(),
});

type AnnouncementSchema = z.infer<typeof announcementSchema>;

const AnnouncementForm = ({
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
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

  const [state, formAction] = useFormState(createAnnouncement, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Announcement has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new announcement" : "Update announcement"}
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
          label="Date"
          name="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
          type="date"
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
