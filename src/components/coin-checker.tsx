'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  estimateCoinValue,
  type EstimateCoinValueInput,
  type EstimateCoinValueOutput,
} from '@/ai/flows/estimate-coin-value';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  type: z
    .string()
    .min(2, { message: 'Coin type must be at least 2 characters.' }),
  year: z
    .string()
    .refine(
      (val) =>
        !isNaN(parseInt(val, 10)) &&
        parseInt(val, 10) > 1000 &&
        parseInt(val, 10) <= new Date().getFullYear(),
      {
        message: 'Please enter a valid year.',
      }
    ),
  condition: z.enum(['Mint', 'Very Fine', 'Fine', 'Good', 'Poor'], {
    required_error: 'You need to select a coin condition.',
  }),
});

export function CoinChecker() {
  const [result, setResult] = useState<EstimateCoinValueOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: '',
      year: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const estimation = await estimateCoinValue(
        data as EstimateCoinValueInput
      );
      setResult(estimation);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to estimate coin value. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-2xl shadow-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-3xl font-bold">
            <Sparkles className="h-8 w-8 text-accent" />
            Check Your Coin&apos;s Value
          </CardTitle>
          <CardDescription>
            Enter the details of your coin to get an AI-powered value
            estimation. It&apos;s completely free!
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coin Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Lincoln Penny" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1909" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mint">Mint</SelectItem>
                        <SelectItem value="Very Fine">Very Fine</SelectItem>
                        <SelectItem value="Fine">Fine</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Estimating...
                  </>
                ) : (
                  'Estimate Value'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {result && (
        <Card className="mt-8 animate-fade-in-up">
          <CardHeader>
            <CardTitle>Estimation Result</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-center">
            <p className="text-muted-foreground">Estimated Value</p>
            <p className="text-5xl font-bold text-primary">
              {result.estimatedValue}
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-sm text-muted-foreground">Confidence:</p>
              <p className="text-sm font-medium">{result.confidence}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
