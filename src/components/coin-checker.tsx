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
        { label: 'Wartime Steel Penny', query: 'Wartime Steel Penny' },
        { label: 'Draped Bust Penny', query: 'Draped Bust Penny' },
      ],
    },
    Nickel: {
      subItems: [
        { label: 'Jefferson Nickel', query: 'Jefferson Nickel' },
        { label: 'Buffalo Nickel', query: 'Buffalo Nickel' },
        { label: 'Liberty Head V Nickel', query: 'Liberty Head V Nickel' },
        { label: 'Shield Nickel', query: 'Shield Nickel' },
        { label: 'Wartime Silver Nickel', query: 'Wartime Silver Nickel' },
      ],
    },
    Dime: {
      subItems: [
        { label: 'Roosevelt Dime', query: 'Roosevelt Dime' },
        { label: 'Mercury Dime', query: 'Mercury Dime' },
        { label: 'Barber Dime', query: 'Barber Dime' },
        { label: 'Seated Liberty Dime', query: 'Seated Liberty Dime' },
        { label: 'Draped Bust Dime', query: 'Draped Bust Dime' },
      ],
    },
    Quarter: {
      subItems: [
        { label: 'Washington Quarter', query: 'Washington Quarter' },
        { label: 'Standing Liberty Quarter', query: 'Standing Liberty Quarter' },
        { label: 'Barber Quarter', query: 'Barber Quarter' },
        { label: 'Seated Liberty Quarter', query: 'Seated Liberty Quarter' },
        { label: '50 State Quarters', query: '50 State Quarters' },
      ],
    },
    'Half Dollar': {
      subItems: [
        { label: 'Kennedy Half Dollar', query: 'Kennedy Half Dollar' },
        { label: 'Franklin Half Dollar', query: 'Franklin Half Dollar' },
        { label: 'Walking Liberty Half Dollar', query: 'Walking Liberty Half Dollar' },
        { label: 'Barber Half Dollar', query: 'Barber Half Dollar' },
        { label: 'Seated Liberty Half Dollar', query: 'Seated Liberty Half Dollar' },
      ],
    },
    Dollar: {
      subItems: [
        { label: 'Eisenhower Dollar', query: 'Eisenhower Dollar' },
        { label: 'Peace Dollar', query: 'Peace Dollar' },
        { label: 'Morgan Dollar', query: 'Morgan Dollar' },
        { label: 'Trade Dollar', query: 'Trade Dollar' },
        { label: 'Sacagawea Dollar', query: 'Sacagawea Dollar' },
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
         <div className="flex justify-center items-center mt-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
         </div>
      )}

      {result && result.coins && (
        <div className="mt-12 animate-fade-in-up">
          <CardHeader className="text-center px-0">
            <CardTitle>Estimation Results</CardTitle>
            <CardDescription className="flex justify-center items-center gap-2">
                Confidence: <span className="font-medium text-foreground">{result.confidence}</span>
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {result.coins.map((coin, index) => (
              <Card key={index} className="flex flex-col overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative w-full h-56">
                    <Image
                      src={coin.imageUrl}
                      alt={coin.description}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                     <h3 className="font-semibold text-lg text-foreground">{coin.description}</h3>
                     <div className="mt-4">
                       <p className="text-sm text-muted-foreground">Estimated Value</p>
                       <p className="text-2xl font-bold text-primary">{coin.estimatedValue}</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
