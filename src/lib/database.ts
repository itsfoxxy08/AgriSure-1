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

// Initialize default data
export async function initializeDefaultData() {
  const { db } = await connectToDatabase();
  
  // Check if schemes already exist
  const existingSchemes = await db.collection('schemes').countDocuments();
  
  if (existingSchemes === 0) {
    const defaultSchemes: Omit<Scheme, '_id'>[] = [
      {
        schemeId: 'pm-kisan-2024',
        title: 'PM-KISAN Samman Nidhi Yojana',
        description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
        category: 'CENTRAL',
        benefitAmount: '₹6,000 annually',
        eligibility: ['Small and marginal farmers', 'Land holding up to 2 hectares'],
        documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details'],
        applicationUrl: 'https://pmkisan.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schemeId: 'pmfby-2024',
        title: 'Pradhan Mantri Fasal Bima Yojana',
        description: 'Comprehensive crop insurance scheme',
        category: 'CENTRAL',
        benefitAmount: 'Up to ₹2,00,000 per hectare',
        eligibility: ['All farmers', 'Notified crops only'],
        documents: ['Aadhaar Card', 'Land Records', 'Sowing Certificate'],
        applicationUrl: 'https://pmfby.gov.in/',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('schemes').insertMany(defaultSchemes);
    console.log('Default schemes initialized');
  }
}
