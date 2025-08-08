'use server';

import { optimizePaymentTerms, type OptimizePaymentTermsInput } from '@/ai/flows/optimize-payment-terms';
import { z } from 'zod';

const OptimizePaymentTermsInputSchema = z.object({
  partnerRiskProfile: z.string().min(10, { message: "Please provide a more detailed risk profile." }),
  transactionHistory: z.string().min(10, { message: "Please provide a more detailed transaction history." }),
});

export async function handleOptimizePaymentTerms(input: OptimizePaymentTermsInput) {
  try {
    const validatedInput = OptimizePaymentTermsInputSchema.parse(input);
    const result = await optimizePaymentTerms(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten() };
    }
    console.error("Error optimizing payment terms:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
