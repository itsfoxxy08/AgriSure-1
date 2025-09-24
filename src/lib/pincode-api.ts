// Pincode API Service for auto-detection
export interface PincodeData {
  pincode: string;
  state: string;
  district: string;
  city: string;
  area: string;
}

// Mock pincode database - In production, use actual API
const pincodeDatabase: Record<string, PincodeData> = {
  "110001": { pincode: "110001", state: "Delhi", district: "Central Delhi", city: "New Delhi", area: "Connaught Place" },
  "400001": { pincode: "400001", state: "Maharashtra", district: "Mumbai", city: "Mumbai", area: "Fort" },
  "560001": { pincode: "560001", state: "Karnataka", district: "Bangalore", city: "Bangalore", area: "Chickpet" },
  "600001": { pincode: "600001", state: "Tamil Nadu", district: "Chennai", city: "Chennai", area: "George Town" },
  "700001": { pincode: "700001", state: "West Bengal", district: "Kolkata", city: "Kolkata", area: "BBD Bagh" },
  "302001": { pincode: "302001", state: "Rajasthan", district: "Jaipur", city: "Jaipur", area: "Jaipur City" },
  "141001": { pincode: "141001", state: "Punjab", district: "Ludhiana", city: "Ludhiana", area: "Ludhiana City" },
  "160001": { pincode: "160001", state: "Punjab", district: "Chandigarh", city: "Chandigarh", area: "Sector 1" },
  "201001": { pincode: "201001", state: "Uttar Pradesh", district: "Ghaziabad", city: "Ghaziabad", area: "Ghaziabad City" },
  "500001": { pincode: "500001", state: "Telangana", district: "Hyderabad", city: "Hyderabad", area: "Abids" },
  "380001": { pincode: "380001", state: "Gujarat", district: "Ahmedabad", city: "Ahmedabad", area: "Ellis Bridge" },
  "411001": { pincode: "411001", state: "Maharashtra", district: "Pune", city: "Pune", area: "Pune City" },
  "452001": { pincode: "452001", state: "Madhya Pradesh", district: "Indore", city: "Indore", area: "Indore City" },
  "462001": { pincode: "462001", state: "Madhya Pradesh", district: "Bhopal", city: "Bhopal", area: "Bhopal City" },
  "226001": { pincode: "226001", state: "Uttar Pradesh", district: "Lucknow", city: "Lucknow", area: "Hazratganj" },
};

export const fetchPincodeData = async (pincode: string): Promise<PincodeData | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Try mock database first
  if (pincodeDatabase[pincode]) {
    return pincodeDatabase[pincode];
  }
  
  // Fallback to actual API (commented for demo)
  /*
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    
    if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
      const postOffice = data[0].PostOffice[0];
      return {
        pincode,
        state: postOffice.State,
        district: postOffice.District,
        city: postOffice.Block,
        area: postOffice.Name
      };
    }
  } catch (error) {
    console.error('Pincode API error:', error);
  }
  */
  
  return null;
};

// State-wise scheme mapping
export const getStateSchemes = (state: string) => {
  const stateSchemes: Record<string, string[]> = {
    "Punjab": ["PM-KISAN", "PMFBY", "Punjab Crop Loan Waiver", "Soil Health Card"],
    "Haryana": ["PM-KISAN", "PMFBY", "Haryana Solar Power Policy", "Soil Health Card"],
    "Uttar Pradesh": ["PM-KISAN", "PMFBY", "UP Kisan Karj Rahat Yojana", "Soil Health Card"],
    "Maharashtra": ["PM-KISAN", "PMFBY", "Maharashtra Crop Insurance", "Soil Health Card"],
    "Rajasthan": ["PM-KISAN", "PMFBY", "Rajasthan Solar Pump Scheme", "Soil Health Card"],
    "Madhya Pradesh": ["PM-KISAN", "PMFBY", "MP Mukhyamantri Kisan Kalyan Yojana", "Soil Health Card"],
    "Gujarat": ["PM-KISAN", "PMFBY", "Gujarat Solar Power Policy", "Soil Health Card"],
    "Karnataka": ["PM-KISAN", "PMFBY", "Karnataka Raitha Bandhu", "Soil Health Card"],
    "Tamil Nadu": ["PM-KISAN", "PMFBY", "Tamil Nadu Farmers Insurance", "Soil Health Card"],
    "Telangana": ["PM-KISAN", "PMFBY", "Rythu Bandhu Scheme", "Soil Health Card"],
    "West Bengal": ["PM-KISAN", "PMFBY", "Krishak Bandhu Scheme", "Soil Health Card"],
    "Delhi": ["PM-KISAN", "PMFBY", "Delhi Solar Policy", "Soil Health Card"],
  };
  
  return stateSchemes[state] || ["PM-KISAN", "PMFBY", "Soil Health Card"];
};

// Get mandi prices by state
export const getMandiPricesByState = (state: string) => {
  const stateMandis: Record<string, any[]> = {
    "Punjab": [
      { market: "Ludhiana", commodity: "Wheat", price: 2480, change: "+2.1%" },
      { market: "Amritsar", commodity: "Rice", price: 3200, change: "+1.8%" },
      { market: "Jalandhar", commodity: "Maize", price: 1850, change: "-0.5%" },
    ],
    "Haryana": [
      { market: "Karnal", commodity: "Wheat", price: 2460, change: "+1.9%" },
      { market: "Hisar", commodity: "Mustard", price: 5200, change: "+3.2%" },
      { market: "Rohtak", commodity: "Barley", price: 1650, change: "+0.8%" },
    ],
    "Uttar Pradesh": [
      { market: "Meerut", commodity: "Wheat", price: 2440, change: "+1.5%" },
      { market: "Agra", commodity: "Potato", price: 1200, change: "-2.1%" },
      { market: "Lucknow", commodity: "Rice", price: 3100, change: "+1.2%" },
    ],
    "Maharashtra": [
      { market: "Pune", commodity: "Onion", price: 2800, change: "+5.2%" },
      { market: "Nashik", commodity: "Grapes", price: 4500, change: "+2.8%" },
      { market: "Nagpur", commodity: "Cotton", price: 6200, change: "+1.9%" },
    ],
    "Rajasthan": [
      { market: "Jaipur", commodity: "Wheat", price: 2420, change: "+1.3%" },
      { market: "Jodhpur", commodity: "Mustard", price: 5100, change: "+2.9%" },
      { market: "Kota", commodity: "Soybean", price: 4200, change: "+1.7%" },
    ]
  };
  
  return stateMandis[state] || [
    { market: "Local Market", commodity: "Wheat", price: 2450, change: "+1.8%" }
  ];
};
