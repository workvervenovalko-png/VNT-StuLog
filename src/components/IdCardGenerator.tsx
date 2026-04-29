"use client";

import { jsPDF } from "jspdf";

const IdCardGenerator = ({ student }: { student: any }) => {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85, 55], // Standard ID card size
    });

    // Background
    doc.setFillColor(30, 58, 138); // Deep Blue
    doc.rect(0, 0, 85, 15, "F");

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("VNT EDUCORE", 42.5, 10, { align: "center" });

    // Student Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Name: ${student.name} ${student.surname}`, 5, 25);
    doc.text(`ID: ${student.id}`, 5, 32);
    doc.text(`Class: ${student.class?.name || "N/A"}`, 5, 39);
    doc.text(`Phone: ${student.phone || "N/A"}`, 5, 46);

    // Placeholder for photo
    doc.setDrawColor(0, 0, 0);
    doc.rect(60, 20, 20, 25);
    doc.setFontSize(6);
    doc.text("PHOTO", 70, 32.5, { align: "center" });

    // Footer
    doc.setFillColor(212, 175, 55); // Gold
    doc.rect(0, 50, 85, 5, "F");

    doc.save(`ID_Card_${student.name}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-plSky text-white px-2 py-1 rounded-md text-xs hover:bg-blue-900 transition"
    >
      ID Card
    </button>
  );
};

export default IdCardGenerator;
