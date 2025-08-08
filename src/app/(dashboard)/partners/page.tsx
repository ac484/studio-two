
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

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
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { partners } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';

export default function PartnersPage() {
  const router = useRouter();

  const getStatusBadge = (status: 'Active' | 'Inactive' | 'Pending') => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const handleRowClick = (partnerId: string) => {
    router.push(`/partners/${partnerId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>
          <p className="text-muted-foreground">Manage your company's partners and their details.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Partner Directory</CardTitle>
              <CardDescription>
                A complete list of all partners in your network.
              </CardDescription>
            </div>
             <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search partners..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead className="hidden sm:table-cell">Primary Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Joined On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => {
                const primaryContact = partner.contacts.find(c => c.isPrimary);
                return (
                  <TableRow key={partner.id} onClick={() => handleRowClick(partner.id)} className="cursor-pointer">
                    <TableCell>
                      <div className="font-medium">{partner.companyName}</div>
                      <div className="text-sm text-muted-foreground">
                        {partner.industry}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {primaryContact ? (
                        <>
                          <div className="font-medium">{primaryContact.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {primaryContact.email}
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground">N/A</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('text-xs', getStatusBadge(partner.status))} variant="outline">
                        {partner.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{partner.joinedDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => router.push(`/partners/${partner.id}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
