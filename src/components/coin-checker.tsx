'use client';

import { Suspense, useEffect, useState } from 'react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const FormSchema = z.object({
  type: z
    .string()
    .min(2, { message: 'Please select a coin type.' }),
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

function CoinCheckerForm({ coinTypeFromQuery }: { coinTypeFromQuery: string | null }) {
  const [result, setResult] = useState<EstimateCoinValueOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: coinTypeFromQuery || '',
      year: '',
    },
  });

  // By using the coinTypeFromQuery as a key, we force the component to re-render when the query param changes.
  useEffect(() => {
    if (coinTypeFromQuery) {
      form.setValue('type', coinTypeFromQuery, { shouldValidate: true });
    }
  }, [coinTypeFromQuery, form]);


  const selectedCoinType = form.watch('type');

  const coinTypes = {
    Penny: {
      subItems: [
        { label: 'Lincoln Penny', query: 'Lincoln Penny' },
        { label: 'Indian Head Penny', query: 'Indian Head Penny' },
        { label: 'Flying Eagle Penny', query: 'Flying Eagle Penny' },
        { label: 'Large Cent', query: 'Large Cent' },
      ],
    },
    Nickel: {
      subItems: [
        { label: 'Jefferson Nickel', query: 'Jefferson Nickel' },
        { label: 'Buffalo Nickel', query: 'Buffalo Nickel' },
        { label: 'Liberty Head V Nickel', query: 'Liberty Head V Nickel' },
        { label: 'Shield Nickel', query: 'Shield Nickel' },
      ],
    },
    Dime: {
      subItems: [
        { label: 'Roosevelt Dime', query: 'Roosevelt Dime' },
        { label: 'Mercury Dime', query: 'Mercury Dime' },
        { label: 'Barber Dime', query: 'Barber Dime' },
        { label: 'Seated Liberty Dime', query: 'Seated Liberty Dime' },
      ],
    },
    Quarter: {
      subItems: [
        { label: 'Washington Quarter', query: 'Washington Quarter' },
        { label: 'Standing Liberty Quarter', query: 'Standing Liberty Quarter' },
        { label: 'Barber Quarter', query: 'Barber Quarter' },
        { label: 'Seated Liberty Quarter', query: 'Seated Liberty Quarter' },
      ],
    },
    'Half Dollar': {
      subItems: [
        { label: 'Kennedy Half Dollar', query: 'Kennedy Half Dollar' },
        { label: 'Franklin Half Dollar', query: 'Franklin Half Dollar' },
        { label: 'Walking Liberty Half Dollar', query: 'Walking Liberty Half Dollar' },
        { label: 'Barber Half Dollar', query: 'Barber Half Dollar' },
      ],
    },
    Dollar: {
      subItems: [
        { label: 'Eisenhower Dollar', query: 'Eisenhower Dollar' },
        { label: 'Peace Dollar', query: 'Peace Dollar' },
        { label: 'Morgan Dollar', query: 'Morgan Dollar' },
        { label: 'Trade Dollar', query: 'Trade Dollar' },
      ],
    },
  };


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
    <>
      <Card className="shadow-2xl bg-card/90 backdrop-blur-sm border-primary/20 w-full">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Sparkles className="h-6 w-6 text-accent" />
            AI Coin Value Estimator
          </CardTitle>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              {selectedCoinType || "Select a coin type"}
                              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          {Object.entries(coinTypes).map(([label, { subItems }]) => (
                            <DropdownMenuSub key={label}>
                              <DropdownMenuSubTrigger>
                                {label}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                {subItems.map((item) => (
                                  <DropdownMenuItem
                                    key={item.label}
                                    onSelect={() => {
                                      form.setValue('type', item.query, { shouldValidate: true });
                                    }}
                                  >
                                    {item.label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
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

      {isLoading && (
         <div className="flex justify-center items-center mt-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
      )}

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
                  <TableHead>Image</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Estimated Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.coins.map((coin, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Image
                        src={coin.imageUrl}
                        alt={coin.description}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell>{coin.description}</TableCell>
                    <TableCell className="text-right font-medium">{coin.estimatedValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function CoinCheckerWithSuspense() {
  const searchParams = useSearchParams();
  const coinTypeFromQuery = searchParams.get('type');
  
  return <CoinCheckerForm key={coinTypeFromQuery} coinTypeFromQuery={coinTypeFromQuery} />;
}


export function CoinChecker() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CoinCheckerWithSuspense />
    </Suspense>
  )
}
