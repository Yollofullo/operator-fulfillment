import { jsPDF } from 'jspdf';

export function generateInvoice(order: any) {
  const doc = new jsPDF();
  doc.text('Invoice', 10, 10);
  doc.text(`Customer: ${order.customer}`, 10, 20);
  doc.text(`Destination: ${order.destination}`, 10, 30);
  doc.text(`Status: ${order.status}`, 10, 40);
  doc.save(`invoice_${order.id}.pdf`);
}
