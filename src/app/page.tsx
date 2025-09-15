import Image from 'next/image';
import { CoinChecker } from '@/components/coin-checker';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');

  return (
    <div className="flex-1">
      <section className="w-full py-20 md:py-28 lg:py-32 xl:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl xl:text-7xl">
                  Unlock the Hidden Value of Your Coins
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  Our AI-powered tool provides instant, free, and accurate value
                  estimations for your coins. Just enter the details and
                  discover your treasure's worth.
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

      <section id="checker" className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <CoinChecker />
        </div>
      </section>
    </div>
  );
}
