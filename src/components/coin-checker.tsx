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
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
            Check Your Coin's Value
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
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full"
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

      {result && result.coins && (
        <Card className="mt-8 animate-fade-in-up">
          <CardHeader>
            <CardTitle>Estimation Result</CardTitle>
            <CardDescription className="flex justify-between items-center">
              <span>Here are the estimated values for the coins found.</span>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Confidence:</p>
                <p className="text-sm font-medium">{result.confidence}</p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Estimated Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.coins.map((coin, index) => (
                  <TableRow key={index}>
                    <TableCell>{coin.description}</TableCell>
                    <TableCell className="text-right font-medium">{coin.estimatedValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
