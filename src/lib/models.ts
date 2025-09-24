// MongoDB Models for AgriSure

export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  aadhaar: string;
  landSize: number;
  location: {
    state: string;
    district: string;
    village: string;
  };
  schemes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Scheme {
  _id?: string;
  schemeId: string;
  title: string;
  description: string;
  category: 'CENTRAL' | 'STATE';
  benefitAmount: string;
  eligibility: string[];
  documents: string[];
  applicationUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  _id?: string;
  userId: string;
  schemeId: string;
  status: 'Applied' | 'Approved' | 'Rejected' | 'Pending';
  applicationDate: Date;
  documents: {
    name: string;
    url: string;
  }[];
  remarks?: string;
  updatedAt: Date;
}

export interface CorruptionReport {
  _id?: string;
  reportId: string;
  officialName?: string;
  department: string;
  location: string;
  description: string;
  evidence?: {
    type: 'image' | 'document' | 'audio';
    url: string;
  }[];
  status: 'Submitted' | 'Under Investigation' | 'Resolved' | 'Closed';
  isAnonymous: boolean;
  reportedAt: Date;
  updatedAt: Date;
}

export interface MandiPrice {
  _id?: string;
  market: string;
  state: string;
  district: string;
  commodity: string;
  variety: string;
  grade: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceDate: Date;
  createdAt: Date;
}
