import type { Partner, Transaction, User, Invoice } from './types';

export const partners: Partner[] = [
  {
    id: 'p001',
    companyName: 'Innovate Solutions',
    status: 'Active',
    joinedDate: '2023-01-15',
    industry: 'Technology',
    address: '123 Tech Park, Silicon Valley, CA 94000',
    website: 'innovate.com',
    contacts: [
      { id: 'c001', name: 'Alice Johnson', role: 'CEO', email: 'alice.j@innovate.com', phone: '111-222-3333', isPrimary: true },
      { id: 'c002', name: 'David Chen', role: 'Billing Specialist', email: 'david.c@innovate.com', phone: '111-222-3334', isPrimary: false },
    ]
  },
  {
    id: 'p002',
    companyName: 'QuantumLeap Inc.',
    status: 'Active',
    joinedDate: '2022-11-20',
    industry: 'Finance',
     address: '456 Finance Ave, New York, NY 10001',
    website: 'quantumleap.com',
    contacts: [
      { id: 'c003', name: 'Bob Williams', role: 'Account Manager', email: 'bob.w@quantumleap.com', phone: '222-333-4444', isPrimary: true },
    ]
  },
  {
    id: 'p003',
    companyName: 'Synergy Corp',
    status: 'Pending',
    joinedDate: '2023-05-10',
    industry: 'Healthcare',
    address: '789 Health Blvd, Boston, MA 02101',
    website: 'synergy.com',
    contacts: [
      { id: 'c004', name: 'Charlie Brown', role: 'Project Manager', email: 'charlie.b@synergy.com', phone: '333-444-5555', isPrimary: true },
       { id: 'c005', name: 'Grace Lee', role: 'Legal Counsel', email: 'grace.l@synergy.com', phone: '333-444-5556', isPrimary: false },
    ]
  },
  {
    id: 'p004',
    companyName: 'Apex Logistics',
    status: 'Inactive',
    joinedDate: '2021-08-01',
    industry: 'Logistics',
     address: '101 Supply Chain, Houston, TX 77001',
    website: 'apexlogistics.com',
    contacts: [
      { id: 'c006', name: 'Diana Prince', role: 'Operations Head', email: 'diana.p@apex.com', phone: '444-555-6666', isPrimary: true },
    ]
  },
  {
    id: 'p005',
    companyName: 'Starlight Media',
    status: 'Active',
    joinedDate: '2023-03-22',
    industry: 'Media',
    address: '202 Creative Way, Los Angeles, CA 90001',
    website: 'starlightmedia.com',
    contacts: [
      { id: 'c007', name: 'Ethan Hunt', role: 'Creative Director', email: 'ethan.h@starlight.com', phone: '555-666-7777', isPrimary: true },
      { id: 'c008', name: 'Frank Miller', role: 'Producer', email: 'frank.m@starlight.com', phone: '555-666-7788', isPrimary: false },
    ]
  },
];

export const transactions: Transaction[] = [
  {
    id: 't001',
    partnerId: 'p001',
    partnerName: 'Innovate Solutions',
    amount: 5000,
    status: 'Paid',
    date: '2023-06-01',
    type: 'Payment',
  },
  {
    id: 't002',
    partnerId: 'p002',
    partnerName: 'QuantumLeap Inc.',
    amount: 7500,
    status: 'Pending',
    date: '2023-06-15',
    type: 'Receipt',
  },
  {
    id: 't003',
    partnerId: 'p001',
    partnerName: 'Innovate Solutions',
    amount: 2500,
    status: 'Overdue',
    date: '2023-05-20',
    type: 'Payment',
  },
  {
    id: 't004',
    partnerId: 'p005',
    partnerName: 'Starlight Media',
    amount: 10000,
    status: 'Paid',
    date: '2023-06-05',
    type: 'Payment',
  },
  {
    id: 't005',
    partnerId: 'p002',
    partnerName: 'QuantumLeap Inc.',
    amount: 3000,
    status: 'Failed',
    date: '2023-06-10',
    type: 'Receipt',
  },
  {
    id: 't006',
    partnerId: 'p003',
    partnerName: 'Synergy Corp',
    amount: 1500,
    status: 'Pending',
    date: '2023-06-25',
    type: 'Payment',
  },
];

export const users: User[] = [
  {
    id: 'u001',
    name: 'Admin User',
    email: 'admin@paragon.com',
    role: 'Admin',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    id: 'u002',
    name: 'Manager Mike',
    email: 'mike.m@paragon.com',
    role: 'Manager',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    id: 'u003',
    name: 'Viewer Veronica',
    email: 'veronica.v@paragon.com',
    role: 'Viewer',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
];

export const invoices: Invoice[] = [
  { id: 'inv-001', partnerId: 'p001', partnerName: 'Innovate Solutions', amount: 2500, status: 'Paid', issueDate: '2023-10-01', dueDate: '2023-10-31' },
  { id: 'inv-002', partnerId: 'p002', partnerName: 'QuantumLeap Inc.', amount: 5000, status: 'Pending', issueDate: '2023-10-05', dueDate: '2023-11-04' },
  { id: 'inv-003', partnerId: 'p003', partnerName: 'Synergy Corp', amount: 7500, status: 'Overdue', issueDate: '2023-09-15', dueDate: '2023-10-15' },
  { id: 'inv-004', partnerId: 'p001', partnerName: 'Innovate Solutions', amount: 3000, status: 'Draft', issueDate: '2023-11-01', dueDate: '2023-12-01' },
  { id: 'inv-005', partnerId: 'p005', partnerName: 'Starlight Media', amount: 1000, status: 'Paid', issueDate: '2023-10-10', dueDate: '2023-11-09' },
];
