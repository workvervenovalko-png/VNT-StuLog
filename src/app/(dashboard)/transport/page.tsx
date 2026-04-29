import Image from "next/image";
import prisma from "@/lib/prisma";
import TransportClient from "@/components/TransportClient";

const TransportPage = async () => {
  const data = await prisma.transport.findMany();

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-plSky">Transport Management</h1>
      <TransportClient initialData={data} />
    </div>
  );
};

export default TransportPage;
