import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Settings = () => {
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground font-body">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body">Full Name</Label>
              <Input id="name" defaultValue="John Doe" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-body">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="font-body">Address</Label>
              <Input id="address" defaultValue="Hostel Block A, Room 201" className="font-body" />
            </div>
            <Button onClick={handleSaveProfile} className="font-body font-semibold">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive booking updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium text-foreground">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Get payment reminders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Daily meal reminders</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full font-body">
                Change Password
              </Button>
              <Button variant="destructive" className="w-full font-body">
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
