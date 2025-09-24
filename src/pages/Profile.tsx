import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Phone, Mail, Calendar, Tractor, Wheat, Award } from "lucide-react";

const Profile = () => {
  const farmerData = {
    name: "राम कुमार शर्मा",
    farmerId: "MH/2024/001234",
    phone: "+91 9876543210",
    email: "ram.sharma@email.com",
    village: "सोनपुर, जिला नासिक, महाराष्ट्र",
    landSize: "5.2 हेक्टेयर",
    crops: ["धान", "गेहूं", "सोयाबीन", "कपास"],
    registrationDate: "15 जनवरी, 2023"
  };

  const recentBenefits = [
    { scheme: "PM-KISAN", amount: "₹6,000", date: "मार्च 2024", status: "प्राप्त" },
    { scheme: "फसल बीमा", amount: "₹25,000", date: "फरवरी 2024", status: "प्रसंस्करण में" },
    { scheme: "सोयाबीन अनुदान", amount: "₹8,500", date: "जनवरी 2024", status: "प्राप्त" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-primary">किसान प्रोफाइल</h1>
            <p className="text-muted-foreground">अपनी व्यक्तिगत जानकारी और लाभ देखें</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Personal Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  व्यक्तिगत जानकारी
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">नाम</label>
                    <p className="text-lg font-semibold">{farmerData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">किसान आईडी</label>
                    <p className="text-lg font-mono">{farmerData.farmerId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      फोन नंबर
                    </label>
                    <p className="text-lg">{farmerData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      ईमेल
                    </label>
                    <p className="text-lg">{farmerData.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    पता
                  </label>
                  <p className="text-lg">{farmerData.village}</p>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">प्रोफाइल संपादित करें</Button>
                </div>
              </CardContent>
            </Card>

            {/* Farm Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tractor className="h-5 w-5" />
                  खेत की जानकारी
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">भूमि का आकार</label>
                  <p className="text-2xl font-bold text-primary">{farmerData.landSize}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Wheat className="h-4 w-4" />
                    मुख्य फसलें
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {farmerData.crops.map((crop, index) => (
                      <Badge key={index} variant="secondary">{crop}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    पंजीकरण तिथि
                  </label>
                  <p className="text-lg">{farmerData.registrationDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                हाल के लाभ
              </CardTitle>
              <CardDescription>
                आपके द्वारा प्राप्त हाल की योजनाओं के लाभ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{benefit.scheme}</p>
                      <p className="text-sm text-muted-foreground">{benefit.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-lg text-primary">{benefit.amount}</p>
                      <Badge variant={benefit.status === "प्राप्त" ? "default" : "secondary"}>
                        {benefit.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button>सभी लाभ देखें</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;