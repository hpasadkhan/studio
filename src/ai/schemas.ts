
'use client';
import { z } from 'zod';

export const EstimateCoinValueInputSchema = z.object({
    type: z.string().describe('The type of the coin.'),
    year: z.string().describe('The year the coin was minted.'),
});
