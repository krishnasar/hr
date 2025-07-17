// src/utils/exportUtils.js
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';

export const exportToCSV = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Countries');
  XLSX.writeFile(wb, 'countries.csv');
};

export const exportToExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Countries');
  XLSX.writeFile(wb, 'countries.xlsx');
};

export const exportToPDF = (data) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Country ID', 'Country Name', 'Region ID']],
    body: data.map(d => [d.country_id, d.country_name, d.region_id])
  });
  doc.save('countries.pdf');
};

export const exportToDOCX = async (data) => {
  const rows = data.map(d => new TableRow({
    children: [
      new TableCell({ children: [new Paragraph(d.country_id)] }),
      new TableCell({ children: [new Paragraph(d.country_name)] }),
      new TableCell({ children: [new Paragraph(d.region_id.toString())] })
    ]
  }));
  const doc = new Document({
    sections: [{ children: [new Table({ rows })] }]
  });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'countries.docx');
};
