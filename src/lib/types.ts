export interface Contact {
  id: string;
  name: string;
  role: string; // e.g., "Account Manager", "Technical Lead", "Billing"
  email: string;
  phone?: string;
  isPrimary: boolean;
}

export interface Partner {
  id: string;
  companyName: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinedDate: string;
  industry: string;
  address?: string;
  website?: string;
  contacts: Contact[];
}

export interface Invoice {
  id: string;
  partnerId: string;
  partnerName:string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  dueDate: string;
  issueDate: string;
}

export interface Transaction {
  id: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Failed';
  date: string;
  type: 'Payment' | 'Receipt';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Viewer';
  avatarUrl: string;
}
