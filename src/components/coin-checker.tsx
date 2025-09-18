
'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  estimateCoinValue,
  estimateCoinValueByImage,
  type EstimateCoinValueByImageInput,
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
import { ChevronDown, Loader2, Sparkles, Scale, Ruler, Atom, History, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Separator } from './ui/separator';

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
  image: z.custom<File>().optional(),
});

function CoinCheckerForm({ coinTypeFromQuery }: { coinTypeFromQuery: string | null }) {
  const [result, setResult] = useState<EstimateCoinValueOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: coinTypeFromQuery || '',
      year: '',
      image: undefined,
    },
  });

  useEffect(() => {
    if (coinTypeFromQuery) {
      form.setValue('type', coinTypeFromQuery, { shouldValidate: true });
    }
  }, [coinTypeFromQuery, form]);


  const selectedCoinType = form.watch('type');
  const selectedImage = form.watch('image');

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearImage = () => {
    form.setValue('image', undefined);
    setPreviewImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      let estimation: EstimateCoinValueOutput;
      if (data.image) {
        const reader = new FileReader();
        reader.readAsDataURL(data.image);
        reader.onload = async () => {
          const photoDataUri = reader.result as string;
          estimation = await estimateCoinValueByImage({
            ...data,
            photoDataUri,
          } as EstimateCoinValueByImageInput);
          setResult(estimation);
          setIsLoading(false);
        };
        reader.onerror = (error) => {
            throw error;
        }
      } else {
         estimation = await estimateCoinValue({type: data.type, year: data.year});
         setResult(estimation);
         setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to estimate coin value. Please try again.',
      });
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

               <div className="space-y-2">
                <FormLabel>Or Upload an Image</FormLabel>
                 {previewImage ? (
                    <div className="relative group w-32 h-32">
                        <Image src={previewImage} alt="Preview" layout="fill" objectFit="cover" className="rounded-md border-2 border-primary/50" />
                        <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={clearImage}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                 ) : (
                    <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                    </Button>
                 )}
                <FormControl>
                    <Input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/webp" 
                    />
                </FormControl>
                <FormMessage />
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
        <div className="mt-12 animate-fade-in-up space-y-8">
          <CardHeader className="text-center px-0 pt-0">
            <CardTitle>Estimation Results</CardTitle>
            <CardDescription className="flex justify-center items-center gap-2">
                Confidence: <span className="font-medium text-foreground">{result.confidence}</span>
            </CardDescription>
          </CardHeader>
          
          <div className="space-y-6">
            {result.coins.map((coin, index) => (
              <Card key={index} className="overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="relative md:col-span-1 h-56 md:h-full min-h-[200px]">
                      <Image
                        src={coin.imageUrl}
                        alt={coin.description}
                        fill
                        objectFit="cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <h3 className="font-bold text-2xl text-primary">{coin.description}</h3>
                       <div className="mt-4">
                         <p className="text-sm text-muted-foreground">Estimated Value</p>
                         <p className="text-3xl font-bold text-foreground">{coin.estimatedValue}</p>
                       </div>
                       
                       <Separator className="my-6" />

                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                          <div className="flex items-start gap-3">
                              <Atom className="h-5 w-5 mt-0.5 text-accent" />
                              <div>
                                <p className="font-semibold">Composition</p>
                                <p className="text-muted-foreground">{coin.composition}</p>
                              </div>
                          </div>
                           <div className="flex items-start gap-3">
                              <Scale className="h-5 w-5 mt-0.5 text-accent" />
                              <div>
                                <p className="font-semibold">Weight</p>
                                <p className="text-muted-foreground">{coin.weight}</p>
                              </div>
                          </div>
                           <div className="flex items-start gap-3">
                              <Ruler className="h-5 w-5 mt-0.5 text-accent" />
                              <div>
                                <p className="font-semibold">Diameter</p>
                                <p className="text-muted-foreground">{coin.diameter}</p>
                              </div>
                          </div>
                       </div>
                       
                       <div className="mt-6 flex items-start gap-3 text-sm">
                           <History className="h-5 w-5 mt-0.5 text-accent" />
                           <div>
                             <p className="font-semibold">History</p>
                             <p className="text-muted-foreground">{coin.history}</p>
                           </div>
                       </div>
                    </div>
                </div>
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
