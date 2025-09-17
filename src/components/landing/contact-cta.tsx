
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function ContactCta() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    // Simulate form submission
    setTimeout(() => {
      setPending(false);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you shortly.",
      });
      (event.target as HTMLFormElement).reset();
    }, 1500);
  };


  return (
    <section id="contact" className="bg-muted/30">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info */}
        <div className="space-y-6">
           <h2 className="text-3xl font-bold font-headline leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions about a course? Want to discuss your career goals? Our expert counselors are here to guide you towards the perfect path, absolutely free. Fill out the form, and we'll get in touch.
          </p>
          <div className="space-y-4 text-base">
            <p><strong>Email:</strong> counselling@edvibe.com</p>
            <p><strong>Phone:</strong> +91-98765-43210</p>
            <p><strong>Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM (IST)</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Book a Free Counselling Session</CardTitle>
              <CardDescription>
                Submit your details and we'll contact you to schedule a session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input id="contact-name" name="name" placeholder="Rohan Mehra" required className="bg-background"/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input id="contact-email" name="email" type="email" placeholder="rohan@example.com" required className="bg-background"/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input id="contact-phone" name="phone" placeholder="+91-9876543210" required className="bg-background"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Your Question (Optional)</Label>
                  <Textarea id="contact-message" name="message" placeholder="e.g., 'I'm interested in the Web Development course but have no prior experience...'" rows={4} className="bg-background"/>
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                   {pending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : 'Request a Callback'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
