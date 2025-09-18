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
});
export type EstimateCoinValueInput = z.infer<typeof EstimateCoinValueInputSchema>;

const CoinDetailSchema = z.object({
  description: z.string().describe('The detailed description of the coin variation.'),
  estimatedValue: z.string().describe('The estimated value of the coin variation.'),
  imageUrl: z.string().url().describe('A URL to a high-quality, publicly available image of the coin variation. The image should accurately represent the coin.'),
});

const EstimateCoinValueOutputSchema = z.object({
  coins: z.array(CoinDetailSchema).describe('A list of coin variations and their estimated values.'),
  confidence: z.string().describe('The confidence level of the estimated values (e.g., High, Medium, Low).'),
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

You will use this information to provide a list of coin variations, their estimated values, and a URL to an image for each variation.

Coin Type: {{{type}}}
Year: {{{year}}}

List all coin variations for the given type and year, with their estimated values and a high-quality, publicly available image URL. Provide a confidence level for your estimates.
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
