import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toast, ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Edit, Plus, Save, Clock, Users } from "lucide-react";

interface MealPlan {
  id: number;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner";
  menuItems: string[];
  price: number;
  description: string;
  availableQuantity: number;
  bookedQuantity: number;
  status: "active" | "inactive" | "completed";
  lastUpdated: string;
}

interface UserMealUpdate {
  id: number;
  userId: number;
  userName: string;
  mealPlanId: number;
  date: string;
  mealType: string;
  currentQuantity: number;
  newQuantity: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const UpdateMeals = () => {
  const { toast } = useToast();
  
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: 1,
      date: "2024-12-31",
      mealType: "breakfast",
      menuItems: ["Poha", "Tea", "Banana"],
      price: 50,
      description: "Light breakfast with traditional poha",
      availableQuantity: 100,
      bookedQuantity: 35,
      status: "active",
      lastUpdated: "2024-12-30 10:30"
    },
    {
      id: 2,
      date: "2024-12-31",
      mealType: "lunch",
      menuItems: ["Dal Rice", "Sabzi", "Roti", "Pickle"],
      price: 80,
      description: "Complete lunch thali",
      availableQuantity: 150,
      bookedQuantity: 78,
      status: "active",
      lastUpdated: "2024-12-30 11:15"
    },
    {
      id: 3,
      date: "2024-12-31",
      mealType: "dinner",
      menuItems: ["Rajma Rice", "Salad", "Papad"],
      price: 70,
      description: "Protein-rich dinner",
      availableQuantity: 120,
      bookedQuantity: 45,
      status: "active",
      lastUpdated: "2024-12-30 12:00"
    }
  ]);

  const [userUpdates, setUserUpdates] = useState<UserMealUpdate[]>([
    {
      id: 1,
      userId: 101,
      userName: "John Doe",
      mealPlanId: 1,
      date: "2024-12-31",
      mealType: "breakfast",
      currentQuantity: 1,
      newQuantity: 2,
      reason: "Guest coming for breakfast",
      status: "pending"
    },
    {
      id: 2,
      userId: 102,
      userName: "Jane Smith",
      mealPlanId: 2,
      date: "2024-12-31",
      mealType: "lunch",
      currentQuantity: 2,
      newQuantity: 0,
      reason: "Going out for lunch",
      status: "pending"
    }
  ]);

  const [editingMeal, setEditingMeal] = useState<MealPlan | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMeal, setNewMeal] = useState<Partial<MealPlan>>({
    date: "",
    mealType: "breakfast",
    menuItems: [],
    price: 0,
    description: "",
    availableQuantity: 0,
    status: "active"
  });

  const handleAddMeal = () => {
    if (newMeal.date && newMeal.menuItems && newMeal.price) {
      const meal: MealPlan = {
        id: Math.max(...mealPlans.map(m => m.id)) + 1,
        date: newMeal.date!,
        mealType: newMeal.mealType as "breakfast" | "lunch" | "dinner",
        menuItems: newMeal.menuItems,
        price: newMeal.price,
        description: newMeal.description || "",
        availableQuantity: newMeal.availableQuantity || 0,
        bookedQuantity: 0,
        status: newMeal.status as "active" | "inactive" | "completed",
        lastUpdated: new Date().toLocaleString()
      };
      setMealPlans([...mealPlans, meal]);
      setNewMeal({
        date: "",
        mealType: "breakfast",
        menuItems: [],
        price: 0,
        description: "",
        availableQuantity: 0,
        status: "active"
      });
      setIsAddDialogOpen(false);
      toast({
        title: "Meal Plan Added",
        description: "New meal plan has been created successfully.",
      });
    }
  };

  const handleUpdateMeal = () => {
    if (editingMeal) {
      setMealPlans(mealPlans.map(m => 
        m.id === editingMeal.id 
          ? { ...editingMeal, lastUpdated: new Date().toLocaleString() }
          : m
      ));
      setEditingMeal(null);
      toast({
        title: "Meal Plan Updated",
        description: "Meal plan has been updated successfully.",
      });
    }
  };

  const handleUserUpdateAction = (updateId: number, action: "approved" | "rejected") => {
    setUserUpdates(userUpdates.map(update => 
      update.id === updateId 
        ? { ...update, status: action }
        : update
    ));
    
    if (action === "approved") {
      const update = userUpdates.find(u => u.id === updateId);
      if (update) {
        // Update the meal plan booking quantity
        setMealPlans(mealPlans.map(meal => 
          meal.id === update.mealPlanId
            ? { 
                ...meal, 
                bookedQuantity: meal.bookedQuantity - update.currentQuantity + update.newQuantity 
              }
            : meal
        ));
      }
    }

    toast({
      title: `Update ${action}`,
      description: `User meal update has been ${action}.`,
    });
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
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ToastProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Update Meals</h1>
            <p className="text-gray-600 mt-1">Manage meal plans and user meal updates</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Meal Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Meal Plan</DialogTitle>
                <DialogDescription>
                  Create a new meal plan for users
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeal.date || ""}
                    onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="mealType">Meal Type</Label>
                  <Select value={newMeal.mealType} onValueChange={(value) => setNewMeal({ ...newMeal, mealType: value as "breakfast" | "lunch" | "dinner" })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="menuItems">Menu Items (comma separated)</Label>
                  <Input
                    id="menuItems"
                    placeholder="Dal, Rice, Roti, Sabzi"
                    onChange={(e) => setNewMeal({ ...newMeal, menuItems: e.target.value.split(',').map(item => item.trim()) })}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newMeal.price || ""}
                    onChange={(e) => setNewMeal({ ...newMeal, price: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMeal.description || ""}
                    onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                    placeholder="Brief description of the meal"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Available Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newMeal.availableQuantity || ""}
                    onChange={(e) => setNewMeal({ ...newMeal, availableQuantity: parseInt(e.target.value) })}
                  />
                </div>
                <Button onClick={handleAddMeal} className="w-full">
                  Add Meal Plan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Plans</p>
                  <p className="text-2xl font-bold text-gray-900">{mealPlans.filter(m => m.status === "active").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{mealPlans.reduce((sum, m) => sum + m.bookedQuantity, 0)}</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending Updates</p>
                  <p className="text-2xl font-bold text-gray-900">{userUpdates.filter(u => u.status === "pending").length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{mealPlans.reduce((sum, m) => sum + (m.bookedQuantity * m.price), 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle>Meal Plans</CardTitle>
            <CardDescription>
              Manage and update meal plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Meal Type</TableHead>
                  <TableHead>Menu Items</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Booked</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealPlans.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell className="font-medium">{meal.date}</TableCell>
                    <TableCell>
                      <Badge className={getMealTypeColor(meal.mealType)}>
                        {meal.mealType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {meal.menuItems.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>₹{meal.price}</TableCell>
                    <TableCell>{meal.availableQuantity}</TableCell>
                    <TableCell>{meal.bookedQuantity}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(meal.status)}>
                        {meal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingMeal(meal)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit Meal Plan</DialogTitle>
                            <DialogDescription>
                              Update meal plan details
                            </DialogDescription>
                          </DialogHeader>
                          {editingMeal && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-date">Date</Label>
                                <Input
                                  id="edit-date"
                                  type="date"
                                  value={editingMeal.date}
                                  onChange={(e) => setEditingMeal({ ...editingMeal, date: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-menuItems">Menu Items (comma separated)</Label>
                                <Input
                                  id="edit-menuItems"
                                  value={editingMeal.menuItems.join(", ")}
                                  onChange={(e) => setEditingMeal({ ...editingMeal, menuItems: e.target.value.split(',').map(item => item.trim()) })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-price">Price (₹)</Label>
                                <Input
                                  id="edit-price"
                                  type="number"
                                  value={editingMeal.price}
                                  onChange={(e) => setEditingMeal({ ...editingMeal, price: parseInt(e.target.value) })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingMeal.description}
                                  onChange={(e) => setEditingMeal({ ...editingMeal, description: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-quantity">Available Quantity</Label>
                                <Input
                                  id="edit-quantity"
                                  type="number"
                                  value={editingMeal.availableQuantity}
                                  onChange={(e) => setEditingMeal({ ...editingMeal, availableQuantity: parseInt(e.target.value) })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-status">Status</Label>
                                <Select value={editingMeal.status} onValueChange={(value) => setEditingMeal({ ...editingMeal, status: value as "active" | "inactive" | "completed" })}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleUpdateMeal} className="w-full">
                                <Save className="h-4 w-4 mr-2" />
                                Update Meal Plan
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* User Meal Updates */}
        <Card>
          <CardHeader>
            <CardTitle>User Meal Updates</CardTitle>
            <CardDescription>
              Approve or reject user meal quantity updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Meal Type</TableHead>
                  <TableHead>Current Qty</TableHead>
                  <TableHead>New Qty</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userUpdates.map((update) => (
                  <TableRow key={update.id}>
                    <TableCell className="font-medium">{update.userName}</TableCell>
                    <TableCell>{update.date}</TableCell>
                    <TableCell>
                      <Badge className={getMealTypeColor(update.mealType)}>
                        {update.mealType}
                      </Badge>
                    </TableCell>
                    <TableCell>{update.currentQuantity}</TableCell>
                    <TableCell>{update.newQuantity}</TableCell>
                    <TableCell className="max-w-xs">{update.reason}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(update.status)}>
                        {update.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {update.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserUpdateAction(update.id, "approved")}
                            className="text-green-600 hover:text-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserUpdateAction(update.id, "rejected")}
                            className="text-red-600 hover:text-red-700"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {userUpdates.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending meal updates.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToastProvider>
  );
};

export default UpdateMeals;