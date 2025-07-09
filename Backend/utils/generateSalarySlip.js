const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateSalarySlip = (salary, employee) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const dirPath = path.join(__dirname, '../slips');

    // Create "slips" folder if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const filePath = path.join(dirPath, `salary-slip-${salary._id}.pdf`);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(18).text('Salary Slip', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Employee Name: ${employee.name}`);
    doc.text(`Position: ${employee.position}`);
    doc.text(`Contact: ${employee.contact}`);
    doc.text(`Email: ${employee.email}`);
    doc.moveDown();

    doc.text(`Month: ${salary.month}-${salary.year}`);
    doc.text(`Base Salary: ₹${salary.baseSalary}`);
    doc.text(`Present Days: ${salary.presentDays}`);
    doc.text(`Advance Payment: ₹${salary.advances}`);
    doc.text(`Deductions: ₹${salary.deductions}`);
    doc.text(`Final Salary: ₹${salary.finalSalary}`);
    doc.text(`Status: ${salary.paid ? "Paid" : "Pending"}`);

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = generateSalarySlip;
