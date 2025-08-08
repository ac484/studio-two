'use server';

import { optimizePaymentTerms, type OptimizePaymentTermsInput } from '@/ai/flows/optimize-payment-terms';
import { z } from 'zod';

// Zod schema for server-side validation
const OptimizePaymentTermsActionSchema = z.object({
  partnerRiskProfile: z.string().min(50, { message: "Partner risk profile must be at least 50 characters." }),
  transactionHistory: z.string().min(50, { message: "Transaction history must be at least 50 characters." }),
});

export async function handleOptimizePaymentTerms(input: OptimizePaymentTermsInput) {
  try {
    // Validate the input on the server
    const validatedInput = OptimizePaymentTermsActionSchema.parse(input);
    const result = await optimizePaymentTerms(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Flatten the errors to make them easier to display on the client
      const flatErrors = error.flatten();
      const firstError = Object.values(flatErrors.fieldErrors)[0]?.[0] || 'Invalid input.';
      return { success: false, error: firstError };
    }
    console.error("Error optimizing payment terms:", error);
    // In a real app, you might want to log this error to a service
    return { success: false, error: "An unexpected error occurred on the server. Please try again." };
  }
}
