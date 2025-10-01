import { Calendar, IndianRupee, Utensils } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentBookings = [
  { id: 1, meal: "Breakfast", date: "Today, 8:00 AM", price: "₹50", status: "confirmed" },
  { id: 2, meal: "Lunch", date: "Today, 1:00 PM", price: "₹80", status: "confirmed" },
  { id: 3, meal: "Dinner", date: "Yesterday, 8:00 PM", price: "₹70", status: "completed" },
  { id: 4, meal: "Lunch", date: "Dec 28, 1:00 PM", price: "₹80", status: "completed" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground font-body">Welcome back! Here's your mess activity overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="This Month's Bookings"
          value={42}
          change="+12% from last month"
          changeType="positive"
          icon={Calendar}
        />
        <StatCard
          title="Total Spent"
          value="₹3,240"
          change="+8% from last month"
          changeType="positive"
          icon={IndianRupee}
        />
        <StatCard
          title="Upcoming Meals"
          value={8}
          change="Today"
          changeType="neutral"
          icon={Utensils}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
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
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body font-semibold text-foreground">{booking.price}</span>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                    className={
                      booking.status === "confirmed"
                        ? "bg-success text-white hover:bg-success/90"
                        : "bg-muted text-muted-foreground"
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

export default Dashboard;
