import Invoice from '../interfaces/Invoice';

/**
 * Mock invoice data for initial development and testing.
 * This data is an array of Invoice objects, conforming to the Invoice interface.
 * In a real application, this data would be fetched from a database.
 */
const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    clientId: '1', // Emily Johnson
    jobIds: ['job-1', 'job-4'],
    date: '03/25/2024',
    dueDate: '04/08/2024',
    amount: 240, // Total for both jobs
    status: 'Pending',
    items: [
      {
        description: 'Regular Clean - March 25',
        amount: 120,
        jobId: 'job-1'
      },
      {
        description: 'Regular Clean - April 1',
        amount: 120,
        jobId: 'job-4'
      }
    ],
    notes: 'Monthly invoice for regular cleaning services'
  },
  {
    id: 'inv-2',
    clientId: '2', // Michael Roberts
    jobIds: ['job-2'],
    date: '03/28/2024',
    dueDate: '04/11/2024',
    amount: 180,
    status: 'Pending',
    items: [
      {
        description: 'Regular Clean - March 28',
        amount: 180,
        jobId: 'job-2'
      }
    ],
    notes: 'Bi-weekly cleaning service'
  },
  {
    id: 'inv-3',
    clientId: '3', // Sarah Williams
    jobIds: ['job-3'],
    date: '04/01/2024',
    dueDate: '04/15/2024',
    amount: 240,
    status: 'Draft',
    items: [
      {
        description: 'Deep Clean - April 1',
        amount: 240,
        jobId: 'job-3'
      }
    ],
    notes: 'Monthly deep cleaning service'
  }
];

export default mockInvoices;
