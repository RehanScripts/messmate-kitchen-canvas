import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Coffee, Salad, Moon } from "lucide-react";
import { toast } from "sonner";

const mealOptions = [
  { id: "breakfast", name: "Breakfast", price: 50, icon: Coffee, time: "7:00 AM - 9:00 AM" },
  { id: "lunch", name: "Lunch", price: 80, icon: Salad, time: "12:00 PM - 2:00 PM" },
  { id: "dinner", name: "Dinner", price: 70, icon: Moon, time: "7:00 PM - 9:00 PM" },
];

const BookMeals = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const toggleMeal = (mealId: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]
    );
  };

  const calculateTotal = () => {
    return mealOptions
      .filter((meal) => selectedMeals.includes(meal.id))
      .reduce((sum, meal) => sum + meal.price, 0);
  };

  const handleConfirmBooking = () => {
    if (selectedMeals.length === 0) {
      toast.error("Please select at least one meal");
      return;
    }
    toast.success(`Booking confirmed for ${selectedMeals.length} meal(s)!`);
    setSelectedMeals([]);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Book Meals</h1>
        <p className="text-muted-foreground font-body">Select your preferred meals and dates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Select Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Select Meals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mealOptions.map((meal) => {
                const Icon = meal.icon;
                const isSelected = selectedMeals.includes(meal.id);
                return (
                  <div
                    key={meal.id}
                    onClick={() => toggleMeal(meal.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-body font-semibold text-foreground">{meal.name}</p>
                          <p className="text-sm text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      <span className="font-body font-bold text-foreground">₹{meal.price}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground font-body">Selected Meals</span>
                <span className="font-body font-semibold">{selectedMeals.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground font-body">Date</span>
                <span className="font-body font-semibold">
                  {date?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-body font-bold text-lg">Total</span>
                <span className="font-heading font-bold text-2xl text-primary">
                  ₹{calculateTotal()}
                </span>
              </div>
              <Button 
                onClick={handleConfirmBooking}
                className="w-full font-body font-semibold"
                size="lg"
              >
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookMeals;
