import prisma from "@/lib/prisma";

const PayrollPage = async () => {
  const data = await prisma.payroll.findMany({
    include: {
      staff: true,
    },
  });

  const totalPayroll = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-plSky">Payroll & Expense Management</h1>
        <div className="flex gap-2">
            <button className="bg-white border-2 border-plSky text-plSky px-4 py-2 rounded-xl text-sm font-bold hover:bg-plSkyLight transition">Expense Report</button>
            <button className="bg-plSky text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-900 transition">Process Salaries</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* STATS */}
         <div className="bg-plSky p-6 rounded-2xl text-white flex flex-col justify-between h-40 shadow-xl">
            <span className="text-sm opacity-80 uppercase tracking-widest">Total Monthly Payroll</span>
            <h2 className="text-4xl font-bold">₹{totalPayroll.toLocaleString()}</h2>
            <span className="text-xs text-blue-200">Current active cycle</span>
         </div>
         <div className="bg-plPurple p-6 rounded-2xl text-white flex flex-col justify-between h-40 shadow-xl">
            <span className="text-sm opacity-80 uppercase tracking-widest">School Expenses</span>
            <h2 className="text-4xl font-bold">₹0</h2>
            <span className="text-xs text-yellow-100">Maintainence & Utilities</span>
         </div>
         <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 flex flex-col justify-between h-40 shadow-sm">
            <span className="text-sm text-gray-400 uppercase tracking-widest">Tax Deductions</span>
            <h2 className="text-4xl font-bold text-plSky">₹0</h2>
            <span className="text-xs text-green-500 font-medium">Auto-Calculated TDS</span>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mt-4">
         <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
               <tr>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Designation</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Month/Year</th>
                  <th className="p-4">Action</th>
               </tr>
            </thead>
            <tbody className="text-sm">
               {data.length > 0 ? (
                 data.map((item) => (
                    <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                       <td className="p-4 font-bold text-plSky">{item.staff.name} {item.staff.surname}</td>
                       <td className="p-4 text-gray-500">{item.staff.role}</td>
                       <td className="p-4 font-semibold">₹{item.amount.toLocaleString()}</td>
                       <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                             item.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                          }`}>
                             {item.status}
                          </span>
                       </td>
                       <td className="p-4 text-gray-400">{item.month} {item.year}</td>
                       <td className="p-4">
                          <button className="text-plSky hover:underline font-bold text-xs">Payslip</button>
                       </td>
                    </tr>
                 ))
               ) : (
                 <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-400 italic">
                       No payroll records generated for this cycle
                    </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default PayrollPage;
