import { connectToDatabase } from './mongodb';
import { User, Scheme, Application, CorruptionReport, MandiPrice } from './models';

// User Operations
export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
  const { db } = await connectToDatabase();
  const user = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const result = await db.collection('users').insertOne(user);
  return { ...user, _id: result.insertedId.toString() };
}

export async function getUserByEmail(email: string) {
  const { db } = await connectToDatabase();
  return await db.collection('users').findOne({ email });
}

// Scheme Operations
export async function getAllSchemes() {
  const { db } = await connectToDatabase();
  return await db.collection('schemes').find({ isActive: true }).toArray();
}

export async function createScheme(schemeData: Omit<Scheme, '_id' | 'createdAt' | 'updatedAt'>) {
  const { db } = await connectToDatabase();
  const scheme = {
    ...schemeData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const result = await db.collection('schemes').insertOne(scheme);
  return { ...scheme, _id: result.insertedId.toString() };
}

// Application Operations
export async function createApplication(applicationData: Omit<Application, '_id' | 'updatedAt'>) {
  const { db } = await connectToDatabase();
  const application = {
    ...applicationData,
    updatedAt: new Date()
  };
  
  const result = await db.collection('applications').insertOne(application);
  return { ...application, _id: result.insertedId.toString() };
}

export async function getUserApplications(userId: string) {
  const { db } = await connectToDatabase();
  return await db.collection('applications').find({ userId }).toArray();
}

// Corruption Report Operations
export async function createCorruptionReport(reportData: Omit<CorruptionReport, '_id' | 'reportId' | 'updatedAt'>) {
  const { db } = await connectToDatabase();
  const reportId = `CR${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  
  const report = {
    ...reportData,
    reportId,
    updatedAt: new Date()
  };
  
  const result = await db.collection('corruption_reports').insertOne(report);
  return { ...report, _id: result.insertedId.toString() };
}

// Mandi Price Operations
export async function getMandiPrices(commodity?: string, state?: string) {
  const { db } = await connectToDatabase();
  const filter: any = {};
  
  if (commodity) filter.commodity = commodity;
  if (state) filter.state = state;
  
  return await db.collection('mandi_prices')
    .find(filter)
    .sort({ priceDate: -1 })
    .limit(50)
    .toArray();
}

export async function createMandiPrice(priceData: Omit<MandiPrice, '_id' | 'createdAt'>) {
  const { db } = await connectToDatabase();
  const price = {
    ...priceData,
    createdAt: new Date()
  };
  
  const result = await db.collection('mandi_prices').insertOne(price);
  return { ...price, _id: result.insertedId.toString() };
}

// Initialize default data with real government schemes
export async function initializeDefaultData() {
  const { db } = await connectToDatabase();
  
  // Check if schemes already exist
  const existingSchemes = await db.collection('schemes').countDocuments();
  
  if (existingSchemes === 0) {
    const realGovernmentSchemes: Omit<Scheme, '_id'>[] = [
      {
        schemeId: 'pm-kisan-2024',
        title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        description: 'Direct income support of ₹6,000 per year to small and marginal farmer families having combined land holding/ownership of up to 2 hectares',
        category: 'CENTRAL',
        benefitAmount: '₹6,000 annually (₹2,000 per installment)',
        eligibility: [
          'Small and marginal farmers with landholding up to 2 hectares',
          'Valid Aadhaar card linked to bank account',
          'Land ownership documents',
          'Active bank account'
        ],
        documents: ['Aadhaar Card', 'Land Records/Khatauni', 'Bank Account Details', 'Passport Size Photo'],
        applicationUrl: 'https://pmkisan.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'pmfby-2024',
        title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
        description: 'Comprehensive crop insurance scheme providing financial support to farmers suffering crop loss/damage arising out of unforeseen events',
        category: 'CENTRAL',
        benefitAmount: 'Sum Insured: ₹2,00,000 per hectare (varies by crop)',
        eligibility: [
          'All farmers (sharecroppers, tenant farmers included)',
          'Farmers growing notified crops in notified areas',
          'Compulsory for loanee farmers, voluntary for non-loanee farmers'
        ],
        documents: ['Aadhaar Card', 'Land Records', 'Sowing Certificate', 'Bank Account Details', 'Loan Sanction Letter (if applicable)'],
        applicationUrl: 'https://pmfby.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'soil-health-card-2024',
        title: 'Soil Health Card Scheme',
        description: 'Provides soil health cards to farmers which carry crop-wise recommendations of nutrients and fertilizers required for individual farms',
        category: 'CENTRAL',
        benefitAmount: 'Free soil testing + ₹1,500 incentive per card',
        eligibility: [
          'All farmers owning agricultural land',
          'Minimum 0.5 hectare land holding',
          'Valid land ownership documents'
        ],
        documents: ['Land Records', 'Aadhaar Card', 'Bank Account Details', 'Soil Sample'],
        applicationUrl: 'https://soilhealth.dac.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'kcc-2024',
        title: 'KCC (Kisan Credit Card)',
        description: 'Flexible and hassle-free credit facility for farmers to meet their production credit requirements in a timely manner',
        category: 'CENTRAL',
        benefitAmount: 'Credit limit up to ₹3,00,000 (4% interest rate)',
        eligibility: [
          'All farmers - individual/joint borrowers who are owner cultivators',
          'Tenant farmers, oral lessees & sharecroppers',
          'Self Help Group members or Joint Liability Group members'
        ],
        documents: ['Land Records', 'Aadhaar Card', 'PAN Card', 'Bank Statements', 'Income Certificate'],
        applicationUrl: 'https://www.nabard.org/content1.aspx?id=570&catid=23',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'pm-kusum-2024',
        title: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)',
        description: 'Aims to provide financial and water security to farmers through harnessing solar energy capabilities',
        category: 'CENTRAL',
        benefitAmount: '60% subsidy on solar pumps and power plants',
        eligibility: [
          'Individual farmers',
          'Farmer Producer Organizations (FPOs)',
          'Cooperatives',
          'Water User Associations'
        ],
        documents: ['Land Records', 'Electricity Connection Proof', 'Bank Account Details', 'Project Report', 'NOC from Electricity Board'],
        applicationUrl: 'https://pmkusum.mnre.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'pmksy-2024',
        title: 'PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)',
        description: 'Dedicated irrigation scheme to expand cultivated area with assured irrigation, improve water use efficiency and introduce sustainable water conservation practices',
        category: 'CENTRAL',
        benefitAmount: '75% subsidy on micro-irrigation systems',
        eligibility: [
          'All categories of farmers',
          'Self Help Groups, Cooperatives, FPOs',
          'Minimum 0.5 hectare land for individual farmers'
        ],
        documents: ['Land Records', 'Aadhaar Card', 'Bank Account Details', 'Water Source Certificate', 'Soil Test Report'],
        applicationUrl: 'https://pmksy.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'formation-fpo-2024',
        title: 'Formation and Promotion of FPOs',
        description: 'Central Sector Scheme for formation and promotion of 10,000 Farmer Producer Organizations (FPOs)',
        category: 'CENTRAL',
        benefitAmount: '₹18.00 lakh per FPO over 3 years',
        eligibility: [
          'Minimum 300 farmers in plains, 100 in hills/tribal areas',
          'Registered as Producer Company under Companies Act',
          'Engaged in agriculture and allied activities'
        ],
        documents: ['Registration Certificate', 'Member List', 'Business Plan', 'Bank Account Details', 'Audited Financial Statements'],
        applicationUrl: 'https://sfac.in/fpo/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'national-beekeeping-2024',
        title: 'National Beekeeping & Honey Mission (NBHM)',
        description: 'Promotes scientific beekeeping in the country to achieve the goal of Sweet Revolution',
        category: 'CENTRAL',
        benefitAmount: '40-80% subsidy on beekeeping equipment',
        eligibility: [
          'Individual farmers, Self Help Groups',
          'Cooperatives, FPOs',
          'Entrepreneurs in beekeeping'
        ],
        documents: ['Aadhaar Card', 'Bank Account Details', 'Training Certificate', 'Land/Space Availability Certificate'],
        applicationUrl: 'https://nbhm.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('schemes').insertMany(realGovernmentSchemes);
    console.log('✅ Real government schemes initialized in database');
  }
}
