'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Bot, Loader2, Sparkles, Workflow, GitBranch, KeySquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { handleOptimizePaymentTerms } from '@/app/actions';
import { type OptimizePaymentTermsOutput } from '@/ai/flows/optimize-payment-terms';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { partners } from '@/lib/placeholder-data';


const FormSchema = z.object({
  partnerRiskProfile: z
    .string()
    .min(50, 'Please provide a detailed risk profile of at least 50 characters.'),
  transactionHistory: z
    .string()
    .min(50, 'Please provide a detailed transaction history of at least 50 characters.'),
});

type FormData = z.infer<typeof FormSchema>;

// Helper to generate placeholder text from partner data
const generateRiskProfilePlaceholder = (partner: any) => {
  if (!partner) return "e.g., Credit score: 750, Industry: Stable tech sector, Financial health: Positive cash flow...";
  return `Industry: ${partner.industry}. Status: ${partner.status}. Joined on: ${partner.joinedDate}. A solid partner with a good standing.`;
}

const generateTransactionHistoryPlaceholder = (partner: any) => {
    if (!partner) return "e.g., Consistent on-time payments, average transaction $5,000, 3 years of partnership...";
    return `Partner since ${partner.joinedDate}. Consistently reliable. No major issues reported in transaction history.`;
}


export default function OptimizePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizePaymentTermsOutput | null>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get('partnerId');
  
  const partner = partners.find(p => p.id === partnerId);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      partnerRiskProfile: '',
      transactionHistory: '',
    },
  });

  useEffect(() => {
    if (partner) {
      form.setValue('partnerRiskProfile', generateRiskProfilePlaceholder(partner));
      form.setValue('transactionHistory', generateTransactionHistoryPlaceholder(partner));
    }
  }, [partner, form]);


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
          <h1 className="text-3xl font-bold">AI Workflow Architect</h1>
           <p className="text-muted-foreground">
            {partner ? `Generating a custom workflow for ${partner.companyName}.` : "Generate custom, state machine-based payment workflows using AI."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Partner Data Input</CardTitle>
            <CardDescription>Review the partner data used for AI analysis.</CardDescription>
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
                          placeholder={generateRiskProfilePlaceholder(partner)}
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
                           placeholder={generateTransactionHistoryPlaceholder(partner)}
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
                      Designing Workflow...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-4 w-4" />
                      Generate Workflow
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card>
             <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
               <div className="flex items-center gap-4">
                 <Workflow className="h-6 w-6 text-primary" />
                 <div>
                    <CardTitle>Suggested Workflow</CardTitle>
                    <CardDescription>A custom state machine for this partner.</CardDescription>
                  </div>
               </div>
               {result && <Button variant="outline" size="sm">Save Workflow</Button>}
             </CardHeader>
             <CardContent className="space-y-4">
                {isLoading && <div className="space-y-2"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-4 w-3/4" /></div>}
                
                {result && (
                  <div>
                    <h3 className="font-semibold text-lg">{result.suggestedPlanName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
                  </div>
                )}
                {!isLoading && !result && <p className="text-sm text-muted-foreground">AI-generated workflow will appear here.</p>}
                
                {result && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium flex items-center gap-2"><GitBranch className="h-4 w-4" /> States</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {isLoading && <Skeleton className="h-6 w-24" />}
                        {result.states.map(state => <Badge key={state.name} variant="secondary" title={state.description}>{state.name}</Badge>)}
                      </div>
                    </div>
                     <div>
                      <h4 className="font-medium flex items-center gap-2"><KeySquare className="h-4 w-4" /> Triggers</h4>
                       <div className="flex flex-wrap gap-2 mt-2">
                        {isLoading && <Skeleton className="h-6 w-24" />}
                        {result.triggers.map(trigger => <Badge key={trigger.name} variant="outline" title={`${trigger.from} → ${trigger.to}`}>{trigger.name}</Badge>)}
                      </div>
                    </div>
                  </div>
                )}


             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
