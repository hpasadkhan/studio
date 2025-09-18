
'use client';
import { z } from 'zod';

const EstimateCoinValueInputSchema = z.object({
    type: z.string().describe('The type of the coin.'),
    year: z.string().describe('The year the coin was minted.'),
});

export const EstimateCoinValueByImageInputSchema = EstimateCoinValueInputSchema.extend({
    photoDataUri: z
    .string()
    .describe(
      "A photo of a coin, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
