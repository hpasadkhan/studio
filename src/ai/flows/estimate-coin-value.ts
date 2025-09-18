
'use server';

/**
 * @fileOverview A coin value estimation AI agent.
 *
 * - estimateCoinValue - A function that handles the coin value estimation process based on text input.
 * - EstimateCoinValueInput - The input type for the estimateCoinValue function.
 * - EstimateCoinValueOutput - The return type for the estimation functions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const EstimateCoinValueInputSchema = z.object({
  type: z.string().describe('The type of the coin.'),
  year: z.string().describe('The year the coin was minted.'),
});
export type EstimateCoinValueInput = z.infer<typeof EstimateCoinValueInputSchema>;

const CoinDetailSchema = z.object({
  description: z.string().describe('The detailed description of the coin variation.'),
  estimatedValue: z.string().describe('The estimated value of the coin variation.'),
  imageUrl: z.string().url().describe('A URL to a high-quality, publicly available image of the coin variation. The image should accurately represent the coin.'),
  composition: z.string().describe("The metallic composition of the coin (e.g., '95% Copper, 5% Zinc')."),
  weight: z.string().describe("The weight of the coin in grams (e.g., '3.11 g')."),
  diameter: z.string().describe("The diameter of the coin in millimeters (e.g., '19.05 mm')."),
  history: z.string().describe('A brief, interesting historical fact or context about the coin variation.'),
});

const EstimateCoinValueOutputSchema = z.object({
  coins: z.array(CoinDetailSchema).describe('A list of coin variations and their estimated values.'),
  confidence: z.string().describe('The confidence level of the estimated values (e.g., High, Medium, or Low).'),
});
export type EstimateCoinValueOutput = z.infer<typeof EstimateCoinValueOutputSchema>;

const textPrompt = ai.definePrompt({
  name: 'estimateCoinValuePrompt',
  input: {schema: EstimateCoinValueInputSchema},
  output: {schema: EstimateCoinValueOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are an expert numismatist specializing in estimating the value of United States coins. Your task is to provide a detailed and accurate list of coin variations based on the user's input.

You will use this information to provide a list of coin variations and their detailed specifications.

Coin Type: {{{type}}}
Year: {{{year}}}

List all known coin variations for the given type and year. For each variation, provide:
1.  A clear and concise description (e.g., "1909-S VDB Lincoln Penny").
2.  The estimated market value based on recent sales and auctions. Use a realistic price range (e.g., "$1,000 - $1,500").
3.  A direct URL to a high-quality, publicly available image of the coin variation from a reputable numismatic source (e.g., PCGS, NGC, USA CoinBook, or Wikimedia Commons). Ensure the image accurately represents the specific coin variation.
4.  The coin's metallic composition (e.g., "95% Copper, 5% Zinc").
5.  The coin's official weight in grams (e.g., "3.11 g").
6.  The coin's official diameter in millimeters (e.g., "19.05 mm").
7.  A brief, interesting historical fact or piece of context about the coin.

Provide a confidence level for your estimates (High, Medium, or Low) based on the available data for the specified coin.
`,
});

export const estimateCoinValue = ai.defineFlow(
  {
    name: 'estimateCoinValue',
    inputSchema: EstimateCoinValueInputSchema,
    outputSchema: EstimateCoinValueOutputSchema,
  },
  async input => {
    const {output} = await textPrompt(input);
    return output!;
  }
);
    
