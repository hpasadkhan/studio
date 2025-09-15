'use server';

/**
 * @fileOverview A coin value estimation AI agent.
 *
 * - estimateCoinValue - A function that handles the coin value estimation process.
 * - EstimateCoinValueInput - The input type for the estimateCoinValue function.
 * - EstimateCoinValueOutput - The return type for the estimateCoinValue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateCoinValueInputSchema = z.object({
  type: z.string().describe('The type of the coin.'),
  year: z.string().describe('The year the coin was minted.'),
  condition: z.string().describe('The condition of the coin (e.g., Mint, Very Fine, Fine, Good, Poor).'),
});
export type EstimateCoinValueInput = z.infer<typeof EstimateCoinValueInputSchema>;

const EstimateCoinValueOutputSchema = z.object({
  estimatedValue: z.string().describe('The estimated value of the coin.'),
  confidence: z.string().describe('The confidence level of the estimated value (e.g., High, Medium, Low).'),
});
export type EstimateCoinValueOutput = z.infer<typeof EstimateCoinValueOutputSchema>;

export async function estimateCoinValue(input: EstimateCoinValueInput): Promise<EstimateCoinValueOutput> {
  return estimateCoinValueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateCoinValuePrompt',
  input: {schema: EstimateCoinValueInputSchema},
  output: {schema: EstimateCoinValueOutputSchema},
  prompt: `You are an expert numismatist specializing in estimating the value of coins.

You will use this information to estimate the value of the coin.

Coin Type: {{{type}}}
Year: {{{year}}}
Condition: {{{condition}}}

Estimate the value of the coin and provide a confidence level for your estimate.
`,
});

const estimateCoinValueFlow = ai.defineFlow(
  {
    name: 'estimateCoinValueFlow',
    inputSchema: EstimateCoinValueInputSchema,
    outputSchema: EstimateCoinValueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
