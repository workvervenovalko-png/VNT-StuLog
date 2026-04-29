import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import prisma from "@/lib/prisma";

const LibrarianPage = async () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="books" />
          <UserCard type="issued" />
          <UserCard type="overdue" />
          <UserCard type="fines" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
             {/* Use a placeholder or different chart for Library stats */}
             <div className="bg-white rounded-xl w-full h-full p-4">
                <h1 className="text-lg font-semibold">Book Issuance Trends</h1>
                <div className="h-full flex items-center justify-center text-gray-400">
                    [Chart Placeholder]
                </div>
             </div>
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={{}} />
        <Announcements />
      </div>
    </div>
  );
};

export default LibrarianPage;
