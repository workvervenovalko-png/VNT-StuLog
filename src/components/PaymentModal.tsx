"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/actions";
import { toast } from "react-toastify";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await createRazorpayOrder(item.amountPaid, item.id);
      
      if (!res.success) {
        toast.error("Failed to initiate payment");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use public key for client
        amount: res.order.amount,
        currency: "INR",
        name: process.env.NEXT_PUBLIC_FROM_NAME || "EduCore ERP",
        description: `Payment for ${item.category.name}`,
        order_id: res.order.id,
        handler: async function (response: any) {
          const verification = await verifyRazorpayPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            item.id
          );

          if (verification.success) {
            toast.success("Payment successful!");
            setIsOpen(false);
            window.location.reload(); // Refresh to show PAID status
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: `${item.student.name} ${item.student.surname}`,
          email: item.student.email || "",
          contact: item.student.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white px-2 py-1 rounded-md text-xs hover:bg-green-700 transition"
      >
        Pay Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 w-96">
            <h2 className="text-lg font-bold text-plSky">Fee Payment Detail</h2>
            <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-100">
               <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-xs">Fee Category:</span>
                  <span className="text-sm font-bold">{item.category.name}</span>
               </div>
               <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-xs">Student:</span>
                  <span className="text-sm font-bold">{item.student.name} {item.student.surname}</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Total Amount:</span>
                  <span className="text-lg font-extrabold text-plSky">₹{item.amountPaid}</span>
               </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-bold transition ${
                loading ? "bg-gray-400" : "bg-plSky hover:bg-plSky/80"
              }`}
            >
              {loading ? "Initializing..." : "Proceed to Secure Payment"}
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 text-sm text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
            <div className="flex items-center gap-2 opacity-30 mt-2">
                <Image src="/razorpay-logo.png" alt="Razorpay" width={60} height={20} />
                <span className="text-[8px]">Secure SSL Encryption</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
