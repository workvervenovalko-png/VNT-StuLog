"use client";

import { returnBookIssue } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ReturnBookButton = ({ id }: { id: number }) => {
  const [state, formAction] = useFormState(returnBookIssue, {
    success: false,
    error: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast("Book returned successfully!");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-plSky">
        <Image src="/view.png" alt="Return" width={16} height={16} title="Mark as Returned" />
      </button>
    </form>
  );
};

export default ReturnBookButton;
