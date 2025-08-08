
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, File, ListFilter, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Invoice } from '@/lib/types';

// Placeholder data - replace with actual data fetching
const invoices: Invoice[] = [
  { id: 'inv-001', partnerId: 'p001', partnerName: 'Innovate Solutions', amount: 2500, status: 'Paid', issueDate: '2023-10-01', dueDate: '2023-10-31' },
  { id: 'inv-002', partnerId: 'p002', partnerName: 'QuantumLeap Inc.', amount: 5000, status: 'Pending', issueDate: '2023-10-05', dueDate: '2023-11-04' },
  { id: 'inv-003', partnerId: 'p003', partnerName: 'Synergy Corp', amount: 7500, status: 'Overdue', issueDate: '2023-09-15', dueDate: '2023-10-15' },
  { id: 'inv-004', partnerId: 'p001', partnerName: 'Innovate Solutions', amount: 3000, status: 'Draft', issueDate: '2023-11-01', dueDate: '2023-12-01' },
  { id: 'inv-005', partnerId: 'p005', partnerName: 'Starlight Media', amount: 1000, status: 'Paid', issueDate: '2023-10-10', dueDate: '2023-11-09' },
];


export default function InvoicesPage() {
  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage and track all partner invoices.</p>
        </div>
        <div className="flex items-center gap-2">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Paid</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Overdue</DropdownMenuCheckboxItem>
                 <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          <Button size="sm" variant="outline" className="gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export CSV
            </span>
          </Button>
           <Button size="sm" className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Invoice
            </span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>
            A detailed log of all invoices sent to partners.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Issue Date</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                     <div className="font-medium">{invoice.partnerName}</div>
                     <div className="text-sm text-muted-foreground hidden sm:inline">ID: {invoice.id}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className={cn('text-xs', getStatusBadge(invoice.status))} variant="outline">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{invoice.issueDate}</TableCell>
                  <TableCell className="hidden md:table-cell">{invoice.dueDate}</TableCell>
                  <TableCell className="text-right">
                    ${invoice.amount.toLocaleString()}
                  </TableCell>
                   <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Void Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

