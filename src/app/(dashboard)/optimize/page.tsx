'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, ThumbsUp, ShieldAlert, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { handleOptimizePaymentTerms } from '@/app/actions';
import { type OptimizePaymentTermsOutput } from '@/ai/flows/optimize-payment-terms';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  partnerRiskProfile: z
    .string()
    .min(50, 'Please provide a detailed risk profile of at least 50 characters.'),
  transactionHistory: z
    .string()
    .min(50, 'Please provide a detailed transaction history of at least 50 characters.'),
});

type FormData = z.infer<typeof FormSchema>;

export default function OptimizePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizePaymentTermsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      partnerRiskProfile: '',
      transactionHistory: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setResult(null);
    
    try {
        const response = await handleOptimizePaymentTerms(data);

        if (response.success && response.data) {
          setResult(response.data);
        } else {
          const errorMessage = response.error || 'An unexpected error occurred.';
          toast({
            variant: 'destructive',
            title: 'Error',
            description: errorMessage,
          });
        }
    } catch (e: any) {
         toast({
            variant: 'destructive',
            title: 'Error',
            description: e.message || 'An unexpected error occurred while calling the AI.',
        });
    }


    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-full border bg-card p-3">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Payment Term Optimizer</h1>
          <p className="text-muted-foreground">
            Leverage AI to get optimal payment terms based on partner risk profiles and transaction history.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Partner Data Input</CardTitle>
            <CardDescription>Provide the necessary information for analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="partnerRiskProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partner Risk Profile</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Credit score: 750, Industry: Stable tech sector, Financial health: Positive cash flow..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transactionHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction History</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Consistent on-time payments, average transaction $5,000, 3 years of partnership..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-4 w-4" />
                      Generate Suggestions
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
           <Card>
             <CardHeader className="flex flex-row items-center gap-4 space-y-0">
               <ThumbsUp className="h-6 w-6 text-green-500" />
               <div>
                  <CardTitle>Suggested Payment Terms</CardTitle>
                  <CardDescription>Optimal terms to improve cash flow.</CardDescription>
                </div>
             </CardHeader>
             <CardContent className="text-sm">
                {isLoading && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></div>}
                
                {result && <p>{result.suggestedPaymentTerms}</p>}
                {!isLoading && !result && <p className="text-muted-foreground">AI recommendations will appear here.</p>}
             </CardContent>
           </Card>
           
           <Card>
             <CardHeader className="flex flex-row items-center gap-4 space-y-0">
               <ShieldAlert className="h-6 w-6 text-orange-500" />
               <div>
                 <CardTitle>Risk Mitigation Strategies</CardTitle>
                 <CardDescription>Actions to minimize financial risk.</CardDescription>
               </div>
             </CardHeader>
             <CardContent className="text-sm">
                {isLoading && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /></div>}
                {result && <p>{result.riskMitigationStrategies}</p>}
                {!isLoading && !result && <p className="text-muted-foreground">AI recommendations will appear here.</p>}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
