// Government Schemes API Service with MongoDB Integration
import { getAllSchemes, createApplication, createCorruptionReport, getMandiPrices } from './database';

export interface GovernmentScheme {
  _id?: string;
  schemeId: string;
  title: string;
  description: string;
  category: 'CENTRAL' | 'STATE';
  status?: 'Eligible' | 'Applied' | 'Receiving Benefits' | 'Verification Pending';
  benefitAmount: string;
  eligibility: string[];
  documents: string[];
  applicationUrl?: string;
  lastUpdated?: string;
  isActive?: boolean;
}

// Fetch schemes from MongoDB or fallback to mock data
export const fetchGovernmentSchemes = async (): Promise<GovernmentScheme[]> => {
  try {
    // Try to fetch from MongoDB first
    const schemes = await getAllSchemes();
    
    if (schemes && schemes.length > 0) {
      return schemes.map(scheme => ({
        ...scheme,
        _id: scheme._id?.toString(),
        status: 'Eligible', // Default status for display
        lastUpdated: new Date().toISOString().split('T')[0]
      }));
    }
  } catch (error) {
    console.warn('MongoDB not available, using mock data:', error);
  }
  
  // Fallback to mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      schemeId: "pm-kisan-2024",
      title: "PM-KISAN Samman Nidhi Yojana",
      description: "Direct income support of ₹6,000 per year to small and marginal farmers in three equal installments",
      category: "CENTRAL",
      status: "Eligible",
      benefitAmount: "₹6,000 annually",
      eligibility: ["Small and marginal farmers", "Land holding up to 2 hectares", "Valid Aadhaar card"],
      documents: ["Aadhaar Card", "Land Records", "Bank Account Details"],
      applicationUrl: "https://pmkisan.gov.in/",
      lastUpdated: "2024-09-24"
    },
    {
      schemeId: "pmfby-2024",
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Comprehensive crop insurance scheme providing financial support to farmers in case of crop loss",
      category: "CENTRAL", 
      status: "Verification Pending",
      benefitAmount: "Up to ₹2,00,000 per hectare",
      eligibility: ["All farmers", "Sharecroppers and tenant farmers", "Notified crops only"],
      documents: ["Aadhaar Card", "Land Records", "Sowing Certificate", "Bank Account"],
      applicationUrl: "https://pmfby.gov.in/",
      lastUpdated: "2024-09-24"
    },
    {
      schemeId: "soil-health-card",
      title: "Soil Health Card Scheme",
      description: "Free soil testing and nutrient management recommendations with ₹1,500 incentive",
      category: "CENTRAL",
      status: "Verification Pending",
      benefitAmount: "₹1,500 + Free soil testing",
      eligibility: ["All farmers", "Minimum 0.5 hectare land", "Valid land documents"],
      documents: ["Land Records", "Aadhaar Card", "Bank Account Details"],
      applicationUrl: "https://soilhealth.dac.gov.in/",
      lastUpdated: "2024-09-24"
    },
    {
      schemeId: "kcc-scheme",
      title: "Kisan Credit Card Scheme",
      description: "Flexible credit facility for farmers to meet agricultural and allied activities expenses",
      category: "CENTRAL",
      status: "Eligible",
      benefitAmount: "Up to ₹3,00,000 credit limit",
      eligibility: ["All farmers", "Tenant farmers", "Sharecroppers with valid documents"],
      documents: ["Land Records", "Aadhaar Card", "PAN Card", "Bank Statements"],
      applicationUrl: "https://www.nabard.org/",
      lastUpdated: "2024-09-24"
    },
    {
      schemeId: "pm-kusum",
      title: "PM-KUSUM Solar Scheme",
      description: "Solar pump and grid-connected solar power plants for farmers with 60% subsidy",
      category: "CENTRAL",
      status: "Applied",
      benefitAmount: "60% subsidy on solar equipment",
      eligibility: ["Individual farmers", "Farmer groups", "Cooperatives"],
      documents: ["Land Records", "Electricity Connection", "Bank Account", "Project Report"],
      applicationUrl: "https://pmkusum.mnre.gov.in/",
      lastUpdated: "2024-09-24"
    }
  ];
};

// Apply for scheme
export const applyForScheme = async (schemeId: string, userId: string) => {
  try {
    const application = await createApplication({
      userId,
      schemeId,
      status: 'Applied',
      applicationDate: new Date(),
      documents: []
    });
    return application;
  } catch (error) {
    console.error('Failed to apply for scheme:', error);
    throw error;
  }
};

// Submit corruption report
export const submitCorruptionReport = async (reportData: {
  officialName?: string;
  department: string;
  location: string;
  description: string;
  isAnonymous: boolean;
}) => {
  try {
    const report = await createCorruptionReport({
      ...reportData,
      status: 'Submitted',
      reportedAt: new Date()
    });
    return report;
  } catch (error) {
    console.error('Failed to submit corruption report:', error);
    throw error;
  }
};

// Get mandi prices
export const fetchMandiPrices = async (commodity?: string, state?: string) => {
  try {
    const prices = await getMandiPrices(commodity, state);
    return prices;
  } catch (error) {
    console.warn('MongoDB not available for mandi prices, using mock data:', error);
    
    // Fallback mock data
    return [
      {
        market: "Indore, MP",
        state: "Madhya Pradesh",
        district: "Indore",
        commodity: "Wheat",
        variety: "Dara",
        grade: "FAQ",
        minPrice: 2400,
        maxPrice: 2500,
        modalPrice: 2450,
        priceDate: new Date(),
        createdAt: new Date()
      }
    ];
  }
};

// Search and filter functions (unchanged)
export const searchSchemes = (schemes: GovernmentScheme[], query: string): GovernmentScheme[] => {
  if (!query.trim()) return schemes;
  
  const searchTerm = query.toLowerCase();
  return schemes.filter(scheme => 
    scheme.title.toLowerCase().includes(searchTerm) ||
    scheme.description.toLowerCase().includes(searchTerm) ||
    scheme.eligibility.some(criteria => criteria.toLowerCase().includes(searchTerm))
  );
};

export const filterSchemesByStatus = (schemes: GovernmentScheme[], status: string): GovernmentScheme[] => {
  if (status === 'all') return schemes;
  
  const statusMap: Record<string, string> = {
    'eligible': 'Eligible',
    'applied': 'Applied', 
    'receiving': 'Receiving Benefits',
    'pending': 'Verification Pending'
  };
  
  return schemes.filter(scheme => scheme.status === statusMap[status]);
};

export const filterSchemesByCategory = (schemes: GovernmentScheme[], category: string): GovernmentScheme[] => {
  if (category === 'all-types') return schemes;
  return schemes.filter(scheme => scheme.category === category.toUpperCase());
};
