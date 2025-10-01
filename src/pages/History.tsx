import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const bookingHistory = [
  { id: 1, meal: "Breakfast", date: "Dec 29, 2024, 8:00 AM", price: "₹50", status: "completed", mess: "Golden Harvest" },
  { id: 2, meal: "Lunch", date: "Dec 28, 2024, 1:00 PM", price: "₹80", status: "completed", mess: "Golden Harvest" },
  { id: 3, meal: "Dinner", date: "Dec 27, 2024, 8:00 PM", price: "₹70", status: "completed", mess: "Tasty Bites" },
  { id: 4, meal: "Breakfast", date: "Dec 27, 2024, 8:00 AM", price: "₹50", status: "completed", mess: "Golden Harvest" },
  { id: 5, meal: "Lunch", date: "Dec 26, 2024, 1:00 PM", price: "₹80", status: "cancelled", mess: "Homely Kitchen" },
  { id: 6, meal: "Dinner", date: "Dec 25, 2024, 8:00 PM", price: "₹70", status: "completed", mess: "Golden Harvest" },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">View History</h1>
        <p className="text-muted-foreground font-body">Track all your past meal bookings</p>
      </div>

      <Input
        placeholder="Search by meal, date, or mess name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md font-body"
      />

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookingHistory.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground">{booking.meal}</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                    <p className="text-xs text-muted-foreground mt-1">{booking.mess}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body font-semibold text-foreground">{booking.price}</span>
                  <Badge
                    className={
                      booking.status === "completed"
                        ? "bg-muted text-muted-foreground"
                        : "bg-destructive text-white"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
