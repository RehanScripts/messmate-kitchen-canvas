import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

const faqs = [
  {
    question: "How do I book meals for multiple days?",
    answer: "You can use the calendar in the Book Meals section to select multiple dates. Select your desired meals for each date and confirm all bookings at once.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Meals can be cancelled up to 2 hours before the scheduled time for a full refund. Cancellations made within 2 hours will not be refunded.",
  },
  {
    question: "How do I add a new payment method?",
    answer: "Go to the Payment section and click on 'Add Payment Method'. You can add credit/debit cards, UPI, or digital wallets.",
  },
  {
    question: "Can I change my mess subscription?",
    answer: "Yes, you can explore different mess options in the Find Mess section and switch your subscription at any time. Changes will take effect from the next billing cycle.",
  },
];

const Help = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted! We'll get back to you soon.");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground font-body">Find answers or get in touch with us</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-body font-medium text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-body">Subject</Label>
                <Input id="subject" placeholder="Brief description" className="font-body" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-body">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue..."
                  rows={5}
                  className="font-body resize-none"
                />
              </div>
              <Button type="submit" className="w-full font-body font-semibold">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
