import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const messOptions = [
  {
    id: 1,
    name: "Golden Harvest Mess",
    location: "Sector 15, Near College",
    rating: 4.5,
    reviews: 120,
    price: "₹3,500/month",
    cuisine: "North Indian",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Tasty Bites",
    location: "Market Road",
    rating: 4.2,
    reviews: 89,
    price: "₹3,200/month",
    cuisine: "Multi-Cuisine",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Homely Kitchen",
    location: "Hostel Area",
    rating: 4.8,
    reviews: 156,
    price: "₹3,800/month",
    cuisine: "Home Style",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Spice Paradise",
    location: "Central Plaza",
    rating: 4.0,
    reviews: 67,
    price: "₹3,000/month",
    cuisine: "South Indian",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
  },
];

const FindMess = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookNow = (messName: string) => {
    toast.success(`Booking request sent for ${messName}!`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Find Mess</h1>
        <p className="text-muted-foreground font-body">Discover the best mess options near you</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, location, or cuisine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-body"
          />
        </div>
        <Button variant="outline" className="font-body">Filters</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messOptions.map((mess) => (
          <Card key={mess.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img
                src={mess.image}
                alt={mess.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <Badge className="absolute top-3 right-3 bg-card text-foreground border border-border">
                {mess.cuisine}
              </Badge>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">{mess.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4" />
                  <span className="font-body">{mess.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-body font-semibold text-foreground">{mess.rating}</span>
                  <span className="text-sm text-muted-foreground">({mess.reviews})</span>
                </div>
                <span className="font-body font-bold text-primary">{mess.price}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => handleBookNow(mess.name)}
                className="w-full font-body font-semibold"
              >
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FindMess;
