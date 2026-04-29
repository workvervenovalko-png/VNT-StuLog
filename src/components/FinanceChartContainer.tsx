import prisma from "@/lib/prisma";
import FinanceChart from "./FinanceChart";

const FinanceChartContainer = async () => {
  // Simple mock of aggregation since we don't have many payments yet
  const payments = await prisma.feePayment.findMany({
    select: {
      amountPaid: true,
      paymentDate: true,
    }
  });

  const monthlyData: { [key: string]: { income: number; expense: number } } = {
    Jan: { income: 0, expense: 0 },
    Feb: { income: 0, expense: 0 },
    Mar: { income: 0, expense: 0 },
    Apr: { income: 0, expense: 0 },
    May: { income: 0, expense: 0 },
    Jun: { income: 0, expense: 0 },
    Jul: { income: 0, expense: 0 },
    Aug: { income: 0, expense: 0 },
    Sep: { income: 0, expense: 0 },
    Oct: { income: 0, expense: 0 },
    Nov: { income: 0, expense: 0 },
    Dec: { income: 0, expense: 0 },
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  payments.forEach(p => {
    const month = monthNames[new Date(p.paymentDate).getMonth()];
    monthlyData[month].income += p.amountPaid;
    // We can mock expenses as 40% of income for visual effect if no real expense table
    monthlyData[month].expense += p.amountPaid * 0.4;
  });

  const data = monthNames.map(m => ({
    name: m,
    income: monthlyData[m].income,
    expense: monthlyData[m].expense,
  }));

  return (
    <FinanceChart data={data} />
  );
};

export default FinanceChartContainer;
