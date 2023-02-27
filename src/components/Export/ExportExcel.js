import *  as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

const ExportExcel = (data, columns, filename) => {
  // Create a worksheet
  const ws = XLSX.utils.json_to_sheet(data, { header: columns });

  // Create a workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Convert the workbook to an ArrayBuffer
  const buffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

  // Save the file
  saveAs(new Blob([buffer]), `${filename}`);
}

export default ExportExcel;