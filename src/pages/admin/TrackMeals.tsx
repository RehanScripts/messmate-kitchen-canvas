import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Utensils, Search, Filter } from "lucide-react";
import { format } from "date-fns";

interface MealRecord {
  id: number;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner";
  userName: string;
  userEmail: string;
  quantity: number;
  totalCost: number;
  status: "served" | "pending" | "cancelled";
  servingTime: string;
}

const TrackMeals = () => {
  const [meals, setMeals] = useState<MealRecord[]>([
    { id: 1, date: "2024-12-30", mealType: "breakfast", userName: "John Doe", userEmail: "john@example.com", quantity: 1, totalCost: 50, status: "served", servingTime: "08:30" },
    { id: 2, date: "2024-12-30", mealType: "lunch", userName: "Jane Smith", userEmail: "jane@example.com", quantity: 2, totalCost: 160, status: "served", servingTime: "13:15" },
    { id: 3, date: "2024-12-30", mealType: "dinner", userName: "Bob Johnson", userEmail: "bob@example.com", quantity: 1, totalCost: 70, status: "pending", servingTime: "19:00" },
    { id: 4, date: "2024-12-29", mealType: "breakfast", userName: "Alice Brown", userEmail: "alice@example.com", quantity: 1, totalCost: 50, status: "served", servingTime: "08:45" },
    { id: 5, date: "2024-12-29", mealType: "lunch", userName: "Mike Wilson", userEmail: "mike@example.com", quantity: 1, totalCost: 80, status: "served", servingTime: "12:30" },
    { id: 6, date: "2024-12-29", mealType: "dinner", userName: "Sarah Davis", userEmail: "sarah@example.com", quantity: 3, totalCost: 210, status: "cancelled", servingTime: "20:00" },
    { id: 7, date: "2024-12-28", mealType: "breakfast", userName: "Tom Anderson", userEmail: "tom@example.com", quantity: 1, totalCost: 50, status: "served", servingTime: "09:00" },
    { id: 8, date: "2024-12-28", mealType: "lunch", userName: "Lisa Garcia", userEmail: "lisa@example.com", quantity: 2, totalCost: 160, status: "served", servingTime: "13:30" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterMealType, setFilterMealType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter meals based on search and filters
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || meal.date === format(filterDate, "yyyy-MM-dd");
    const matchesMealType = filterMealType === "all" || meal.mealType === filterMealType;
    const matchesStatus = filterStatus === "all" || meal.status === filterStatus;
    
    return matchesSearch && matchesDate && matchesMealType && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    totalMeals: filteredMeals.length,
    totalRevenue: filteredMeals.reduce((sum, meal) => sum + meal.totalCost, 0),
    served: filteredMeals.filter(meal => meal.status === "served").length,
    pending: filteredMeals.filter(meal => meal.status === "pending").length,
    cancelled: filteredMeals.filter(meal => meal.status === "cancelled").length,
  };

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case "breakfast": return "bg-yellow-100 text-yellow-800";
      case "lunch": return "bg-blue-100 text-blue-800";
      case "dinner": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "served": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterDate(undefined);
    setFilterMealType("all");
    setFilterStatus("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Track Meals</h1>
          <p className="text-gray-600 mt-1">Monitor meal servings and user activity</p>
        </div>
        <Button onClick={clearFilters} variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Utensils className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Meals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Served</p>
                <p className="text-2xl font-bold text-gray-900">{stats.served}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">₹</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by user name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Filter by Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filterDate ? format(filterDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filterDate}
                    onSelect={setFilterDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Filter by Meal Type</Label>
              <Select value={filterMealType} onValueChange={setFilterMealType}>
                <SelectTrigger>
                  <SelectValue placeholder="All meal types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Meal Types</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Filter by Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="served">Served</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Meal Records</CardTitle>
          <CardDescription>
            Showing {filteredMeals.length} of {meals.length} meal records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Meal Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Serving Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeals.map((meal) => (
                <TableRow key={meal.id}>
                  <TableCell className="font-medium">{meal.date}</TableCell>
                  <TableCell>
                    <Badge className={getMealTypeColor(meal.mealType)}>
                      {meal.mealType}
                    </Badge>
                  </TableCell>
                  <TableCell>{meal.userName}</TableCell>
                  <TableCell>{meal.userEmail}</TableCell>
                  <TableCell>{meal.quantity}</TableCell>
                  <TableCell>₹{meal.totalCost}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(meal.status)}>
                      {meal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{meal.servingTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredMeals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No meal records found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackMeals;