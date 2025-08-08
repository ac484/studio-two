'use server';

/**
 * @fileOverview A payment term optimization AI agent.
 *
 * - optimizePaymentTerms - A function that suggests optimal payment terms.
 * - OptimizePaymentTermsInput - The input type for the optimizePaymentTerms function.
 * - OptimizePaymentTermsOutput - The return type for the optimizePaymentTerms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizePaymentTermsInputSchema = z.object({
  partnerRiskProfile: z
    .string()
    .describe("The partner's risk profile, including credit score, industry stability, and financial health."),
  transactionHistory: z
    .string()
    .describe('A summary of the transaction history with the partner, including payment frequency, average transaction amount, and any past payment issues.'),
});
export type OptimizePaymentTermsInput = z.infer<typeof OptimizePaymentTermsInputSchema>;

const OptimizePaymentTermsOutputSchema = z.object({
  suggestedPaymentTerms: z
    .string()
    .describe('The suggested payment terms, including payment frequency, due date, and any discounts or penalties.'),
  riskMitigationStrategies: z
    .string()
    .describe('Strategies to mitigate financial risk, such as requiring a security deposit or shortening the payment cycle.'),
});
export type OptimizePaymentTermsOutput = z.infer<typeof OptimizePaymentTermsOutputSchema>;

export async function optimizePaymentTerms(input: OptimizePaymentTermsInput): Promise<OptimizePaymentTermsOutput> {
  return optimizePaymentTermsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizePaymentTermsPrompt',
  input: {schema: OptimizePaymentTermsInputSchema},
  output: {schema: OptimizePaymentTermsOutputSchema},
  prompt: `You are a financial risk management expert. Based on the partner's risk profile and transaction history, you will suggest optimal payment terms and risk mitigation strategies to minimize financial risk.

Partner Risk Profile: {{{partnerRiskProfile}}}
Transaction History: {{{transactionHistory}}}

Consider all available information to provide comprehensive and actionable recommendations.
`,
});

const optimizePaymentTermsFlow = ai.defineFlow(
  {
    name: 'optimizePaymentTermsFlow',
    inputSchema: OptimizePaymentTermsInputSchema,
    outputSchema: OptimizePaymentTermsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

