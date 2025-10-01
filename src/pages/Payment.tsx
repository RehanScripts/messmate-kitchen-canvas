import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const paymentHistory = [
  { id: 1, date: "Dec 25, 2024", amount: "₹3,500", method: "UPI", status: "completed" },
  { id: 2, date: "Nov 25, 2024", amount: "₹3,500", method: "Card", status: "completed" },
  { id: 3, date: "Oct 25, 2024", amount: "₹3,500", method: "Wallet", status: "completed" },
];

const Payment = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Payment</h1>
        <p className="text-muted-foreground font-body">Manage your payments and billing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-foreground">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground font-body">{payment.method}</span>
                    <Badge className="bg-success text-white hover:bg-success/90">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Current Balance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground font-body">Outstanding Amount</p>
                <p className="text-3xl font-heading font-bold text-destructive">₹1,240</p>
              </div>
              <Button className="w-full font-body font-semibold" size="lg">
                Pay Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="font-body text-foreground">Card ending in 4242</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <span className="font-body text-foreground">UPI: user@paytm</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                  <span className="font-body text-foreground">Wallet: ₹500</span>
                </div>
              </div>
              <Button variant="outline" className="w-full font-body">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
