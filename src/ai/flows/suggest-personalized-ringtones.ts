'use server';

/**
 * @fileOverview Provides AI-generated suggestions for unique ringtones and incoming call sound effects.
 *
 * - getPersonalizedRingtoneSuggestions - A function that retrieves personalized ringtone suggestions.
 * - PersonalizedRingtoneSuggestionsInput - The input type for the getPersonalizedRingtoneSuggestions function.
 * - PersonalizedRingtoneSuggestionsOutput - The return type for the getPersonalizedRingtoneSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const PersonalizedRingtoneSuggestionsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user\u2019s preferences, including their favorite music genres, artists, and preferred sound characteristics (e.g., calm, upbeat, electronic).'
    ),
  callContext: z
    .string()
    .describe(
      'The context of the call, such as whether it is a personal or business call, or if it is from a specific contact.'
    ),
});
export type PersonalizedRingtoneSuggestionsInput = z.infer<typeof PersonalizedRingtoneSuggestionsInputSchema>;

const PersonalizedRingtoneSuggestionsOutputSchema = z.object({
  ringtoneSuggestion: z.string().describe('A unique ringtone suggestion in audio wav format, based on the user\u2019s preferences and the call context.'),
  soundEffectSuggestion: z.string().describe('A unique incoming call sound effect suggestion in audio wav format, based on the user\u2019s preferences and the call context.'),
});
export type PersonalizedRingtoneSuggestionsOutput = z.infer<typeof PersonalizedRingtoneSuggestionsOutputSchema>;

export async function getPersonalizedRingtoneSuggestions(input: PersonalizedRingtoneSuggestionsInput): Promise<PersonalizedRingtoneSuggestionsOutput> {
  return personalizedRingtoneSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRingtoneSuggestionsPrompt',
  input: {schema: PersonalizedRingtoneSuggestionsInputSchema},
  prompt: `You are an AI-powered ringtone and sound effect suggestion generator. Based on the user's preferences and the call context, you will generate unique ringtone and sound effect suggestions.

User Preferences: {{{userPreferences}}}
Call Context: {{{callContext}}}

You should generate suggestions that are creative, personalized, and appropriate for the given context. The ringtone and sound effect suggestions should be described in detail. For each suggestion, describe the music genre and the sound characteristics, and suggest a way to generate it using text-to-speech/text-to-audio/sound effects libraries.

Ringtone Suggestion:
Sound Effect Suggestion:`,
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateAudio = async (text: string): Promise<string> => {
  const {media: pcmDataUri} = await ai.generate({
    model: 'googleai/gemini-2.5-flash-preview-tts',
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Algenib' },
        },
      },
    },
    prompt: text,
  });
  if (!pcmDataUri) {
    throw new Error('no media returned');
  }
  const audioBuffer = Buffer.from(
    pcmDataUri.substring(pcmDataUri.indexOf(',') + 1),
    'base64'
  );
  return 'data:audio/wav;base64,' + (await toWav(audioBuffer));
};

const personalizedRingtoneSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedRingtoneSuggestionsFlow',
    inputSchema: PersonalizedRingtoneSuggestionsInputSchema,
    outputSchema: PersonalizedRingtoneSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    const ringtoneDescription = output.ringtoneSuggestion || 'A generic ringtone.';
    const soundEffectDescription = output.soundEffectSuggestion || 'A generic sound effect.';

    const ringtoneSuggestion = await generateAudio(ringtoneDescription);
    const soundEffectSuggestion = await generateAudio(soundEffectDescription);

    return {
      ringtoneSuggestion,
      soundEffectSuggestion,
    };
  }
);
