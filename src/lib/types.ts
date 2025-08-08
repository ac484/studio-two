export interface Partner {
  id: string;
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinedDate: string;
  industry: string;
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
