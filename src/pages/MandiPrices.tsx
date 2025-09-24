import { useState } from "react";
import { MapPin, TrendingUp, TrendingDown, Truck, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";

const MandiPrices = () => {
  const [selectedLocation, setSelectedLocation] = useState("jaipur");
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [quantity, setQuantity] = useState("50");

  const priceData = [
    {
      location: "Indore, MP",
      type: "Recommended",
      isBest: true,
      price: "₹2,450",
      change: "+₹45 (2.2%)",
      changeType: "up",
      distance: "285 km",
      transportCost: "₹3,500",
      netProfit: "₹119,000",
      profitChange: "+₹5,000",
    },
    {
      location: "Ludhiana, PB", 
      type: "Regional market",
      isBest: false,
      price: "₹2,420",
      change: "+₹30 (1.5%)",
      changeType: "up", 
      distance: "410 km",
      transportCost: "₹4,800",
      netProfit: "₹116,200",
      profitChange: "+₹2,200",
    },
    {
      location: "Delhi",
      type: "Regional market", 
      isBest: false,
      price: "₹2,380",
      change: "-₹20 (-1.0%)",
      changeType: "down",
      distance: "280 km", 
      transportCost: "₹3,200",
      netProfit: "₹115,800",
      profitChange: "+₹1,800",
    },
    {
      location: "Jaipur, RJ",
      type: "Local mandi",
      isBest: false,
      price: "₹2,280", 
      change: "+₹15 (0.7%)",
      changeType: "up",
      distance: "0 km",
      transportCost: "₹0",
      netProfit: "₹114,000",
      profitChange: "Base price",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mandi Price Comparison</h1>
          <p className="text-muted-foreground">
            Compare crop prices across different mandis and get AI-powered selling recommendations
          </p>
        </div>

        {/* Selection Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Your Crop and Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jaipur">Jaipur, Rajasthan</SelectItem>
                    <SelectItem value="jodhpur">Jodhpur, Rajasthan</SelectItem>
                    <SelectItem value="kota">Kota, Rajasthan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Crop Type</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity (Quintals)</label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="50"
                />
              </div>
            </div>
            
            <Button className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Get AI Recommendation
            </Button>
          </CardContent>
        </Card>

        {/* Price Comparison Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Wheat Prices Comparison</CardTitle>
              <span className="text-sm text-muted-foreground">Updated: 2 hours ago</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="space-y-4">
                {priceData.map((item, index) => (
                  <Card key={index} className={`border-l-4 ${item.isBest ? 'border-l-success bg-success/5' : 'border-l-border'}`}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{item.location}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                          {item.isBest && (
                            <Badge className="bg-success text-success-foreground">Best Option</Badge>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-semibold">{item.price}</div>
                          <div className="text-xs text-muted-foreground">Per Quintal</div>
                        </div>
                        
                        <div className="text-center">
                          <div className={`flex items-center justify-center gap-1 text-sm ${
                            item.changeType === 'up' ? 'text-success' : 'text-destructive'
                          }`}>
                            {item.changeType === 'up' ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {item.change}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium">{item.distance}</div>
                          <div className="text-xs text-muted-foreground">Distance</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium">{item.transportCost}</div>
                          <div className="text-xs text-muted-foreground">Transport</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-semibold text-success">{item.netProfit}</div>
                          <div className="text-xs text-success">{item.profitChange}</div>
                        </div>
                        
                        <div className="text-center">
                          {item.isBest ? (
                            <div className="space-y-2">
                              <Button size="sm" className="w-full">
                                <Truck className="h-3 w-3 mr-1" />
                                Book Transport
                              </Button>
                            </div>
                          ) : item.location === "Jaipur, RJ" ? (
                            <Button variant="outline" size="sm" className="bg-warning text-warning-foreground hover:bg-warning/90">
                              Sell Here
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Truck className="h-3 w-3 mr-1" />
                              Book Transport
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Recommendation */}
            <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium text-success">Recommendation:</div>
                  <div className="text-sm">
                    Selling at <strong>Indore, MP</strong> will give you <strong>₹5,000 extra profit</strong> compared to your local mandi.
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Button size="sm" className="bg-success hover:bg-success/90">
                  Get Transport Quote
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MandiPrices;