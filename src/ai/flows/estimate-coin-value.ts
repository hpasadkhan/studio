
'use server';

/**
 * @fileOverview A coin value estimation AI agent.
 *
 * - estimateCoinValue - A function that handles the coin value estimation process based on text input.
 * - estimateCoinValueByImage - A function that handles coin value estimation based on an uploaded image.
 * - EstimateCoinValueInput - The input type for the estimateCoinValue function.
 * - EstimateCoinValueByImageInput - The input type for the estimateCoinValueByImage function.
 * - EstimateCoinValueOutput - The return type for the estimation functions.
 */

import {ai} from '@/ai/genkit';
import { EstimateCoinValueByImageInputSchema } from '@/ai/schemas';
import {z} from 'genkit';

const EstimateCoinValueInputSchema = z.object({
  type: z.string().describe('The type of the coin.'),
  year: z.string().describe('The year the coin was minted.'),
});
export type EstimateCoinValueInput = z.infer<typeof EstimateCoinValueInputSchema>;


export type EstimateCoinValueByImageInput = z.infer<typeof EstimateCoinValueByImageInputSchema>;


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

export async function estimateCoinValue(input: EstimateCoinValueInput): Promise<EstimateCoinValueOutput> {
  return estimateCoinValueFlow(input);
}

export async function estimateCoinValueByImage(input: EstimateCoinValueByImageInput): Promise<EstimateCoinValueOutput> {
    return estimateCoinValueByImageFlow(input);
}

const textPrompt = ai.definePrompt({
  name: 'estimateCoinValuePrompt',
  input: {schema: EstimateCoinValueInputSchema},
  output: {schema: EstimateCoinValueOutputSchema},
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

const imagePrompt = ai.definePrompt({
    name: 'estimateCoinValueByImagePrompt',
    input: {schema: EstimateCoinValueByImageInputSchema},
    output: {schema: EstimateCoinValueOutputSchema},
    prompt: `You are an expert numismatist specializing in estimating the value of United States coins from images. Your task is to analyze the provided image of a coin and provide a detailed and accurate list of coin variations that match it.

Use the image as the primary source of truth. The user-provided type and year may be inaccurate, so prioritize the visual information from the image. Identify the coin's type, year, mint mark, and condition from the image.

Image of the coin: {{media url=photoDataUri}}
User-provided type (use as a hint): {{{type}}}
User-provided year (use as a hint): {{{year}}}

Based on your analysis of the image, list all known coin variations that are a possible match. For each potential variation, provide:
1.  A clear and concise description (e.g., "1909-S VDB Lincoln Penny").
2.  The estimated market value based on recent sales and auctions, considering the visible condition. Use a realistic price range (e.g., "$1,000 - $1,500").
3.  A direct URL to a high-quality, publicly available reference image of the identified coin variation from a reputable source (e.g., PCGS, NGC, USA CoinBook, or Wikimedia Commons).
4.  The coin's metallic composition (e.g., "95% Copper, 5% Zinc").
5.  The coin's official weight in grams (e.g., "3.11 g").
6.  The coin's official diameter in millimeters (e.g., "19.05 mm").
7.  A brief, interesting historical fact or piece of context about the coin.

Provide a confidence level for your estimates (High, Medium, or Low) based on the clarity of the image and the available data for the specified coin.
`,
});

const estimateCoinValueFlow = ai.defineFlow(
  {
    name: 'estimateCoinValueFlow',
    inputSchema: EstimateCoinValueInputSchema,
    outputSchema: EstimateCoinValueOutputSchema,
  },
  async input => {
    const {output} = await textPrompt(input);
    return output!;
  }
);

const estimateCoinValueByImageFlow = ai.defineFlow(
  {
    name: 'estimateCoinValueByImageFlow',
    inputSchema: EstimateCoinValueByImageInputSchema,
    outputSchema: EstimateCoinValueOutputSchema,
  },
  async input => {
    const {output} = await imagePrompt(input);
    return output!;
  }
);

    