import { useState, useEffect } from "react";
import { Filter, Search, ExternalLink, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import { fetchGovernmentSchemes, searchSchemes, filterSchemesByStatus, filterSchemesByCategory, type GovernmentScheme } from "@/lib/api";

const Schemes = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-types");
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);

  // Load schemes on component mount
  useEffect(() => {
    const loadSchemes = async () => {
      try {
        setLoading(true);
        const data = await fetchGovernmentSchemes();
        setSchemes(data);
        setFilteredSchemes(data);
        toast({
          title: "Schemes Loaded",
          description: `${data.length} government schemes loaded successfully`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load government schemes",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSchemes();
  }, []);

  // Filter schemes based on search, tab, and category
  useEffect(() => {
    let filtered = schemes;
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchSchemes(filtered, searchQuery);
    }
    
    // Apply status filter
    filtered = filterSchemesByStatus(filtered, selectedTab);
    
    // Apply category filter
    filtered = filterSchemesByCategory(filtered, selectedCategory);
    
    setFilteredSchemes(filtered);
  }, [schemes, searchQuery, selectedTab, selectedCategory]);

  const getStatusCounts = () => {
    return {
      all: schemes.length,
      eligible: schemes.filter(s => s.status === 'Eligible').length,
      applied: schemes.filter(s => s.status === 'Applied').length,
      receiving: schemes.filter(s => s.status === 'Receiving Benefits').length,
      pending: schemes.filter(s => s.status === 'Verification Pending').length,
    };
  };

  const statusCounts = getStatusCounts();

  const tabs = [
    { id: "all", label: `All (${statusCounts.all})`, count: statusCounts.all },
    { id: "eligible", label: `Eligible (${statusCounts.eligible})`, count: statusCounts.eligible },
    { id: "applied", label: `Applied (${statusCounts.applied})`, count: statusCounts.applied },
    { id: "receiving", label: `Receiving Benefits (${statusCounts.receiving})`, count: statusCounts.receiving },
    { id: "pending", label: `Pending (${statusCounts.pending})`, count: statusCounts.pending },
  ];

  const handleApplyScheme = (scheme: GovernmentScheme) => {
    if (scheme.applicationUrl) {
      window.open(scheme.applicationUrl, '_blank');
      toast({
        title: "Redirecting to Application",
        description: `Opening ${scheme.title} application portal`,
      });
    } else {
      toast({
        title: "Application Info",
        description: "Please visit your nearest agriculture office for application",
      });
    }
  };

  const handleViewDetails = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Eligible':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Applied':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Receiving Benefits':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Verification Pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Eligible':
        return "bg-green-100 text-green-800 border-green-200";
      case 'Applied':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'Receiving Benefits':
        return "bg-green-100 text-green-800 border-green-200";
      case 'Verification Pending':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading government schemes...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Government Schemes</h1>
          <p className="text-muted-foreground">
            Live database of Central and State government agricultural schemes from data.gov.in
          </p>
        </div>

        {/* Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Filter Schemes</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search schemes by name, description, or eligibility..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Scheme Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="CENTRAL">Central Schemes</SelectItem>
                  <SelectItem value="STATE">State Schemes</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-states">
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-states">All States</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="haryana">Haryana</SelectItem>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                  <SelectItem value="west-bengal">West Bengal</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all-types");
                  setSelectedTab("all");
                  toast({
                    title: "Filters Cleared",
                    description: "All filters have been reset",
                  });
                }}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Clear Filters
              </Button>

              <Button 
                onClick={async () => {
                  setLoading(true);
                  const data = await fetchGovernmentSchemes();
                  setSchemes(data);
                  toast({
                    title: "Schemes Refreshed",
                    description: "Latest schemes data loaded",
                  });
                  setLoading(false);
                }}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
            
            {/* Status Tabs */}
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedTab(tab.id);
                    toast({
                      title: "Filter Applied",
                      description: `Showing ${tab.label.toLowerCase()}`,
                    });
                  }}
                  className={selectedTab === tab.id ? "bg-primary" : ""}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSchemes.length} of {schemes.length} schemes
          </p>
        </div>

        {/* Schemes List */}
        <div className="grid gap-6">
          {filteredSchemes.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No schemes found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all-types");
                    setSelectedTab("all");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredSchemes.map((scheme) => (
              <Card key={scheme.schemeId || scheme._id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-info border-info">
                          {scheme.category}
                        </Badge>
                        <Badge className={getStatusColor(scheme.status || 'Eligible')}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(scheme.status || 'Eligible')}
                            {scheme.status || 'Eligible'}
                          </div>
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{scheme.title}</h3>
                      <p className="text-muted-foreground mb-2">{scheme.description}</p>
                      <p className="text-sm font-medium text-green-600">{scheme.benefitAmount}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline"
                            onClick={() => handleViewDetails(scheme)}
                            className="flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{scheme.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{scheme.description}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Benefit Amount</h4>
                              <p className="text-sm font-medium text-green-600">{scheme.benefitAmount}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                {scheme.eligibility.map((criteria, index) => (
                                  <li key={index}>{criteria}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Required Documents</h4>
                              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                {scheme.documents.map((doc, index) => (
                                  <li key={index}>{doc}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex gap-2 pt-4">
                              <Button 
                                onClick={() => handleApplyScheme(scheme)}
                                className="flex items-center gap-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        onClick={() => handleApplyScheme(scheme)}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Schemes;