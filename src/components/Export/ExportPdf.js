import jsPDF from 'jspdf';
import 'jspdf-autotable';


const ExportPdf = (data, columns, filename) => {
    // Create a new jsPDF instance
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(12);

    // Create a table in the PDF document
    const tableHeader = columns.map((col) => col.toUpperCase());
    const tableRows = data.map((customer) => columns.map((col) => customer[col]));

    doc.autoTable({
      head: [tableHeader],
      body: tableRows,
    });

    // Save the PDF document and provide the user with a download link
    doc.save(filename);
};

export default ExportPdf;