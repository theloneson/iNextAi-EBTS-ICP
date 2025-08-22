import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Settings, Upload, Bold, Italic, Link, List, AlignLeft } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");

  const tabs = [
    { id: "details", label: "My details" },
    { id: "password", label: "Password" },
    { id: "notifications", label: "Notifications" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="text-primary" size={20} />
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        {activeTab === "details" && (
          <Card className="bg-card border border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Personal info</h2>
                  <p className="text-sm text-muted-foreground">Update your photo and personal details here.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="px-4">Cancel</Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4">Save</Button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-foreground">Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-background border-border"
                      placeholder=""
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-transparent">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-background border-border"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background border-border pl-10"
                      placeholder=""
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      @
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Your photo</Label>
                    <p className="text-xs text-muted-foreground">This will be displayed on your profile.</p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">JD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-transparent">Upload</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-background/50 hover:bg-background/70 transition-colors cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-primary font-medium">Click to upload</p>
                      <p className="text-xs text-muted-foreground">or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-foreground">Role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-background border-border"
                    placeholder=""
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-foreground">Bio</Label>
                  <p className="text-xs text-muted-foreground">Write a short introduction.</p>
                  
                  {/* Rich Text Editor Toolbar */}
                  <div className="flex items-center gap-1 p-2 border border-border rounded-t-lg bg-background/50">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-background border-border rounded-t-none min-h-[120px] resize-none"
                    placeholder=""
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    275 characters left
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" className="px-4">Cancel</Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4">Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other tabs would go here */}
        {activeTab === "password" && (
          <Card className="bg-card border border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Password Settings</h2>
              <p className="text-muted-foreground">Password settings coming soon...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "notifications" && (
          <Card className="bg-card border border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h2>
              <p className="text-muted-foreground">Notification settings coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
