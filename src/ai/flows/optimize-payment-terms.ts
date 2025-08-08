'use server';

/**
 * @fileOverview A payment term optimization AI agent that designs state machine-based workflows.
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

const StateSchema = z.object({
  name: z.string().describe("The name of the state (e.g., 'Invoice Sent', 'Payment Received')."),
  description: z.string().describe('A brief description of what this state represents.'),
});

const TriggerSchema = z.object({
    name: z.string().describe("The name of the trigger that causes a state transition (e.g., 'Receive Payment', 'Milestone Approved')."),
    from: z.string().describe('The state from which this trigger originates.'),
    to: z.string().describe('The state to which this trigger leads.'),
});

const OptimizePaymentTermsOutputSchema = z.object({
  suggestedPlanName: z.string().describe("A descriptive name for the suggested payment plan (e.g., 'Secure Milestone Plan', 'Quarterly Net-60')."),
  states: z.array(StateSchema).describe('An array of all possible states in the payment workflow state machine.'),
  triggers: z.array(TriggerSchema).describe('An array of all possible triggers that transition between states.'),
  summary: z.string().describe('A human-readable summary explaining the logic behind the suggested plan.'),
});
export type OptimizePaymentTermsOutput = z.infer<typeof OptimizePaymentTermsOutputSchema>;

export async function optimizePaymentTerms(input: OptimizePaymentTermsInput): Promise<OptimizePaymentTermsOutput> {
  return optimizePaymentTermsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizePaymentTermsPrompt',
  input: {schema: OptimizePaymentTermsInputSchema},
  output: {schema: OptimizePaymentTermsOutputSchema},
  prompt: `You are an expert financial workflow architect specializing in designing state machine-based payment plans for B2B partnerships.

Based on the provided partner risk profile and transaction history, design a custom, state-driven payment workflow. The workflow should be represented as a state machine with a clear set of states and triggers for transitions.

**Partner Risk Profile:**
{{{partnerRiskProfile}}}

**Transaction History:**
{{{transactionHistory}}}

**Your Task:**
1.  **Define States:** Create a list of clear, logical states for the entire payment lifecycle. Examples include 'Awaiting Down Payment', 'Milestone 1: In Progress', 'Milestone 1: Invoice Sent', 'Final Payment Received', 'Completed'.
2.  **Define Triggers:** Specify the triggers that cause transitions between these states. Examples include 'Down Payment Confirmed', 'Milestone 1 Approved by Partner', 'Final Invoice Paid'.
3.  **Create a Plan:** Name the plan descriptively and provide a summary explaining why this state machine structure is optimal for the given partner, considering their risk and history.

The goal is to create a robust, traceable, and automated workflow that minimizes financial risk while maintaining a good partner relationship.
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
