import { CoinChecker } from '@/components/coin-checker';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Star } from 'lucide-react';

export default function Home() {
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

  const faqs = [
    {
      question: 'How accurate are the AI estimations?',
      answer:
        'Our AI uses a vast database of real-time market data and historical sales to provide highly accurate value estimations. However, for exceptionally rare or high-value coins, we always recommend a final appraisal by a certified numismatist.',
    },
    {
      question: 'Is Coin Worth Checker free to use?',
      answer:
        'Yes! Our core features are completely free. We believe everyone should have access to information about their coin collections. We may introduce premium features in the future, but the coin value checker will remain free.',
    },
    {
      question: 'What types of coins can I check?',
      answer:
        'Currently, our database is focused on United States coins, including pennies, nickels, dimes, quarters, half-dollars, and dollars. We are constantly expanding our database to include more coins from around the world.',
    },
    {
      question: "Do I need to create an account to check my coin's value?",
      answer:
        'No account is necessary. You can start checking the value of your coins immediately. Just enter the coin type and year to get your free AI-powered estimation.',
    },
  ];


  return (
    <div className="flex-1">
      <section className="w-full py-20 md:py-28 lg:py-32 xl:py-40 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24 items-center">
            <div className="flex flex-col justify-center space-y-4 text-left">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                  Instantly Check Your Coin's Worth
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  Use our free, AI-powered tool to get an accurate estimate of your coin's value. <span className="text-primary">Fast, simple, and reliable.</span>
                </p>
              </div>
            </div>
            <div id="checker" className="w-full max-w-2xl mx-auto">
                 <CoinChecker />
                 <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <Star className="h-5 w-5 fill-accent text-accent" />
                    </div>
                    <p className="text-sm text-foreground/80">
                      Trusted by over <span className="font-semibold text-foreground">10 Million+</span> collectors worldwide.
                    </p>
                  </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24 bg-background">
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
              <Card key={index} className="text-left bg-secondary/30">
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
      
      <section id="faq" className="w-full py-12 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions? We've got answers. Here are some of the most common questions we get.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-left text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-12 md:py-24 bg-background">
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
