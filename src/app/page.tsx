import Image from 'next/image';
import { CoinChecker } from '@/components/coin-checker';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');
  const featureImage = PlaceHolderImages.find((p) => p.id === 'feature');
  const testimonials = [
    {
      name: 'John D.',
      avatar: 'https://picsum.photos/seed/avatar1/40/40',
      text: "I found a rare 1943 copper penny in my grandpa's collection. Coin Worth Checker helped me realize it was worth a small fortune! The AI estimation was spot-on.",
    },
    {
      name: 'Sarah L.',
      avatar: 'https://picsum.photos/seed/avatar2/40/40',
      text: "As a casual collector, this tool is invaluable. It's so easy to use, and I've learned so much about the coins I own. Highly recommended!",
    },
    {
      name: 'Mike T.',
      avatar: 'https://picsum.photos/seed/avatar3/40/40',
      text: "I was skeptical at first, but the accuracy is impressive. I use it to get quick estimates before getting a professional appraisal. It's saved me a lot of time.",
    },
  ];
  const features = [
    'AI-Powered Estimates: Get instant, data-driven value estimations for your coins.',
    'Comprehensive Database: Access information on a vast range of US coins.',
    'User-Friendly Interface: Simply enter your coin type and year to get started.',
    'Free to Use: No hidden fees or subscriptions. Just pure numismatic knowledge.',
  ];

  return (
    <div className="flex-1">
      <section className="w-full py-20 md:py-28 lg:py-32 xl:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl xl:text-7xl">
                  Got Coins? Find Their Worth.
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  Instantly discover the value of your coins with our free AI-powered checker. It's fast, easy, and accurate.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="#checker">Start Checking</Link>
                </Button>
              </div>
            </div>
            {heroImage && (
              <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  alt={heroImage.description}
                  src={heroImage.imageUrl}
                  data-ai-hint={heroImage.imageHint}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            {featureImage && (
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
                <Image
                  alt={featureImage.description}
                  src={featureImage.imageUrl}
                  data-ai-hint={featureImage.imageHint}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Us?</h2>
                <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed">
                  Our platform provides everything you need to understand the value of your coin collection.
                </p>
              </div>
              <ul className="grid gap-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                    <p className="text-foreground/80 flex-1">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section id="checker" className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <CoinChecker />
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from fellow collectors who have discovered the value of their coins with our tool.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-left">
                <CardContent className="p-6">
                  <p className="mb-4 text-foreground/80">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Coin Worth Checker</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Coin Worth Checker is a revolutionary tool that uses artificial intelligence to provide you with accurate and up-to-date value estimations for your coin collection. Whether you're a seasoned numismatist or a new collector, our platform is designed to be your trusted companion in the world of coins.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
