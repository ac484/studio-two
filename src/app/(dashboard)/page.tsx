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
import { partners, transactions } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardPage() {
  const recentTransactions = transactions.slice(0, 5);
  const totalPartners = partners.length;
  const pendingTransactions = transactions.filter(
    (t) => t.status === 'Pending'
  ).length;
  const totalRevenue = transactions
    .filter((t) => t.status === 'Paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const kpiData = [
    {
      title: 'Total Revenue',
      value: `$${(totalRevenue / 1000).toFixed(1)}k`,
      icon: DollarSign,
      change: '+2.5%',
      changeType: 'increase',
    },
    {
      title: 'Total Partners',
      value: totalPartners,
      icon: Users,
      change: '+5 this month',
      changeType: 'increase',
    },
    {
      title: 'Pending Transactions',
      value: pendingTransactions,
      icon: DollarSign,
      change: '-1.2%',
      changeType: 'decrease',
    },
     {
      title: 'Active Now',
      value: '3',
      icon: Users,
      change: '+1 since last hour',
      changeType: 'increase',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Failed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                 <span className={cn('mr-1', kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600')}>
                  {kpi.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            An overview of the latest financial activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.partnerName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {transaction.date}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {transaction.type}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('text-xs', getStatusBadge(transaction.status))} variant="outline">
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${transaction.amount.toLocaleString()}
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
