
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, MoreVertical, FileText, Bot, Users, Building, Link2, Mail, Phone, UserCheck } from 'lucide-react';
import { partners, invoices as allInvoices } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Invoice, Contact } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

export default function PartnerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params.id as string;

  const partner = partners.find((p) => p.id === partnerId);
  const partnerInvoices = allInvoices.filter((p) => p.partnerId === partnerId);
  
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

  const primaryContact = partner.contacts.find(c => c.isPrimary);

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  const ContactCard = ({ contact }: { contact: Contact }) => (
    <Card>
        <CardHeader className="flex flex-row items-center gap-4">
             <Avatar>
                <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="people avatar" />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-xl">{contact.name}</CardTitle>
                <CardDescription>{contact.role}</CardDescription>
            </div>
            {contact.isPrimary && <Badge variant="secondary" className="ml-auto">Primary</Badge>}
        </CardHeader>
        <CardContent className="text-sm space-y-2">
            <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
            </div>
            {contact.phone && 
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{contact.phone}</span>
                </div>
            }
        </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-muted-foreground" />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {partner.companyName}
            </h1>
        </div>
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
              <DropdownMenuItem>Edit Company Details</DropdownMenuItem>
              <DropdownMenuItem>Add Contact</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Deactivate Partner</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{partner.address}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        <a href={partner.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                            {partner.website}
                        </a>
                    </div>
                     <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span>Joined on {partner.joinedDate}</span>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Payment Workflow</CardTitle>
                        <CardDescription className="text-xs">Manage payment schedule.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/optimize?partnerId=${partner.id}`}>
                            <Bot className="mr-2 h-4 w-4" />
                            AI Optimize Workflow
                        </Link>
                    </Button>
                </CardContent>
             </Card>
        </div>
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Persons</CardTitle>
                    <CardDescription>All registered contacts for {partner.companyName}.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    {partner.contacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </CardContent>
            </Card>

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
      </div>
    </div>
  );
}
