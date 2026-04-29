import Announcements from "@/components/Announcements";
import FinanceChartContainer from "@/components/FinanceChartContainer";
import UserCard from "@/components/UserCard";

const AccountantPage = async () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="feeCollection" />
          <UserCard type="payroll" />
          <UserCard type="pendingFees" />
          <UserCard type="expenses" />
        </div>
        {/* CHARTS */}
        <div className="w-full h-[500px]">
          <FinanceChartContainer />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Announcements />
        <div className="bg-white p-4 rounded-md shadow-sm">
            <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
                <button className="p-2 bg-plSkyLight text-plSky rounded-md font-medium text-sm">Create Invoice</button>
                <button className="p-2 bg-plPurpleLight text-plSky rounded-md font-medium text-sm">Process Payroll</button>
                <button className="p-2 bg-plYellowLight text-plSky rounded-md font-medium text-sm">Financial Report</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantPage;
