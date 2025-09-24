import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { UserPlus, MapPin, Loader2 } from "lucide-react";
import { fetchPincodeData, getStateSchemes, getMandiPricesByState } from "@/lib/pincode-api";
import { createUser } from "@/lib/database";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
  aadhaar: z.string().min(12, "Aadhaar must be 12 digits").max(12, "Aadhaar must be 12 digits"),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6, "Pincode must be 6 digits"),
  landSize: z.string().min(1, "Land size is required"),
  cropType: z.string().min(1, "Primary crop is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [locationData, setLocationData] = useState<any>(null);
  const [availableSchemes, setAvailableSchemes] = useState<string[]>([]);
  const [mandiPrices, setMandiPrices] = useState<any[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      aadhaar: "",
      pincode: "",
      landSize: "",
      cropType: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handlePincodeChange = async (pincode: string) => {
    if (pincode.length === 6) {
      setPincodeLoading(true);
      try {
        const data = await fetchPincodeData(pincode);
        if (data) {
          setLocationData(data);
          const schemes = getStateSchemes(data.state);
          const prices = getMandiPricesByState(data.state);
          setAvailableSchemes(schemes);
          setMandiPrices(prices);
          
          toast({
            title: "Location Detected",
            description: `${data.city}, ${data.district}, ${data.state}`,
          });
        } else {
          toast({
            title: "Invalid Pincode",
            description: "Please enter a valid pincode",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch location data",
          variant: "destructive",
        });
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    
    try {
      // Create user in database
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        aadhaar: data.aadhaar,
        landSize: parseFloat(data.landSize),
        location: {
          state: locationData?.state || "Unknown",
          district: locationData?.district || "Unknown",
          village: locationData?.city || "Unknown",
        },
        schemes: availableSchemes,
      };

      await createUser(userData);
      
      // Store user session
      localStorage.setItem("agrisure_user", JSON.stringify({
        email: data.email,
        name: data.name,
        isAuthenticated: true,
        location: locationData,
        schemes: availableSchemes,
        mandiPrices: mandiPrices,
      }));
      
      toast({
        title: "Registration Successful",
        description: `Welcome to AgriSure, ${data.name}! ${availableSchemes.length} schemes available in your area.`,
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-700">
            <UserPlus className="h-8 w-8 mx-auto mb-2" />
            Join AgriSure
          </CardTitle>
          <p className="text-muted-foreground">
            Create your farmer account and access government schemes
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="farmer@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" maxLength={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="aadhaar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Number</FormLabel>
                      <FormControl>
                        <Input placeholder="123456789012" maxLength={12} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Pincode (Auto-detects location)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter 6-digit pincode"
                          maxLength={6}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handlePincodeChange(e.target.value);
                          }}
                        />
                        {pincodeLoading && (
                          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                    {locationData && (
                      <div className="text-sm text-green-600 mt-1">
                        📍 {locationData.city}, {locationData.district}, {locationData.state}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Size (in acres)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2.5" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Crop</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary crop" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="maize">Maize</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="sugarcane">Sugarcane</SelectItem>
                          <SelectItem value="soybean">Soybean</SelectItem>
                          <SelectItem value="mustard">Mustard</SelectItem>
                          <SelectItem value="potato">Potato</SelectItem>
                          <SelectItem value="onion">Onion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {availableSchemes.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    🎯 Available Schemes in {locationData?.state}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSchemes.map((scheme, index) => (
                      <span key={index} className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                        {scheme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mandiPrices.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    📊 Current Mandi Prices in {locationData?.state}:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    {mandiPrices.slice(0, 3).map((price, index) => (
                      <div key={index} className="bg-white p-2 rounded">
                        <div className="font-medium">{price.commodity}</div>
                        <div className="text-blue-600">₹{price.price}/quintal</div>
                        <div className={`text-xs ${price.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {price.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
