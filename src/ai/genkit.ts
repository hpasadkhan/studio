import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Specify the model for the plugin, which will be used by default
      model: 'gemini-1.5-flash-latest',
    }),
  ],
});
