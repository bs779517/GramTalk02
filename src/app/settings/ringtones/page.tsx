"use client";

import type { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getPersonalizedRingtoneSuggestions,
  type PersonalizedRingtoneSuggestionsOutput,
} from "@/ai/flows/personalized-ringtone-suggestions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { RingtonePlayer } from "@/components/RingtonePlayer";
import Link from 'next/link';

const formSchema = z.object({
  userPreferences: z.string().min(10, {
    message: "Please describe your preferences in at least 10 characters.",
  }),
  callContext: z.string().min(3, {
    message: "Call context must be at least 3 characters.",
  }),
});

export default function RingtoneGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<PersonalizedRingtoneSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userPreferences: "",
      callContext: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuggestions(null);

    try {
      const result = await getPersonalizedRingtoneSuggestions(values);
      setSuggestions(result);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="bg-primary text-primary-foreground p-3 flex items-center gap-3 shadow-md z-10 flex-shrink-0">
        <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold">AI Ringtone Composer</h1>
      </header>
      <main className="flex-grow overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="w-full shadow-lg border-none">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center mb-2">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-3xl font-headline font-bold text-primary">AI Ringtone Composer</CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                Describe your vibe, and let AI create a unique ringtone for you.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="userPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Your Music Preferences</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Calm, acoustic guitar melodies like Ed Sheeran, but with a slight electronic beat. Good for waking up.'"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="callContext"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Call Context</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 'A business call from a new client.'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Compose My Ringtones"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          {suggestions && (
            <div className="mt-12 space-y-8 pb-8">
              <RingtonePlayer
                title="Ringtone Suggestion"
                audioSrc={suggestions.ringtoneSuggestion}
              />
              <RingtonePlayer
                title="Sound Effect Suggestion"
                audioSrc={suggestions.soundEffectSuggestion}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
