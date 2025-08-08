
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, MoreVertical, FileText, Bot } from 'lucide-react';
import { partners, invoices as allInvoices } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type Invoice } from '@/lib/types';

// Placeholder for workflow data - in a real app, this would be fetched
const workflows = [
  { id: 'wf-001', name: 'Monthly Recurring' },
  { id: 'wf-002', name: 'Quarterly Billing' },
  { id: 'wf-003', name: 'Milestone-Based' },
  { id: 'wf-004', name: 'Annual Upfront' },
];

export default function PartnerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params.id as string;

  const partner = partners.find((p) => p.id === partnerId);
  const partnerInvoices = allInvoices.filter((p) => p.partnerId === partnerId);
  const primaryContact = partner?.contacts.find(c => c.isPrimary);

  const [assignedWorkflow, setAssignedWorkflow] = React.useState<string | undefined>(undefined);

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-muted-foreground">Partner not found.</p>
        <Button onClick={() => router.back()} variant="outline" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {partner.companyName}
        </h1>
        <Badge variant="outline" className="ml-auto sm:ml-0">
          {partner.status}
        </Badge>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>View Contract</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Deactivate Partner</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Partner Information</CardTitle>
            <CardDescription>Contact and company details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
             {primaryContact && (
              <div className="grid grid-cols-2">
                <span className="font-semibold text-muted-foreground">Primary Contact</span>
                <span>{primaryContact.name} ({primaryContact.role})</span>
              </div>
            )}
             {primaryContact && (
              <div className="grid grid-cols-2">
                <span className="font-semibold text-muted-foreground">Email</span>
                <a href={`mailto:${primaryContact.email}`} className="text-primary hover:underline">
                  {primaryContact.email}
                </a>
              </div>
            )}
            <div className="grid grid-cols-2">
              <span className="font-semibold text-muted-foreground">Industry</span>
              <span>{partner.industry}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-semibold text-muted-foreground">Joined On</span>
              <span>{partner.joinedDate}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
           <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Payment Workflow</CardTitle>
                <CardDescription>Manage the payment schedule for this partner.</CardDescription>
            </div>
             <Button asChild variant="outline" size="sm">
                <Link href={`/optimize?partnerId=${partner.id}`}>
                    <Bot className="mr-2 h-4 w-4" />
                    AI Optimize Workflow
                </Link>
             </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="workflow-select" className="text-sm font-medium text-muted-foreground">
                Assigned Workflow
              </label>
              <div className="flex items-center gap-4 mt-1">
                <Select value={assignedWorkflow} onValueChange={setAssignedWorkflow}>
                  <SelectTrigger id="workflow-select">
                    <SelectValue placeholder="Select a workflow..." />
                  </SelectTrigger>
                  <SelectContent>
                    {workflows.map((wf) => (
                      <SelectItem key={wf.id} value={wf.id}>
                        {wf.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button disabled={!assignedWorkflow}>Apply Workflow</Button>
              </div>
               {assignedWorkflow && (
                <p className="text-xs text-muted-foreground mt-2">
                  Applying a workflow will generate a new set of invoices based on the selected schedule.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>All invoices associated with {partner.companyName}.</CardDescription>
        </CardHeader>
        <CardContent>
          {partnerInvoices.length > 0 ? (
            <ul className="space-y-4">
              {partnerInvoices.map(invoice => (
                <li key={invoice.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Invoice {invoice.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {invoice.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="font-semibold">${invoice.amount.toLocaleString()}</span>
                     <Badge className={cn('text-xs', getStatusBadge(invoice.status))} variant="outline">
                      {invoice.status}
                    </Badge>
                     <Button variant="outline" size="sm">View</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No invoices found for this partner.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
