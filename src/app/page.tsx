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

      <section id="about" className="w-full py-12 md:py-24">
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

      <section id="checker" className="w-full py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <CoinChecker />
        </div>
      </section>
    </div>
  );
}
