# MongoDB Atlas Setup Guide for AgriSure

## Step 1: MongoDB Atlas Connection Setup

### 1. Choose Connection Method
When MongoDB Atlas asks for connection mode, select: **"Connect your application"**

### 2. Get Your Connection String
1. In MongoDB Atlas dashboard, click **"Connect"**
2. Select **"Connect your application"**
3. Choose **"Node.js"** as driver
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 3. Update Environment Variables
Replace the placeholders in `.env` file:

```env
# Replace <username> and <password> with your actual credentials
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/agrisure?retryWrites=true&w=majority
MONGODB_DB_NAME=agrisure
```

### 4. Database Security Setup
1. **Create Database User:**
   - Go to "Database Access" in Atlas
   - Click "Add New Database User"
   - Username: `agrisure-user`
   - Password: Generate a secure password
   - Database User Privileges: "Read and write to any database"

2. **Network Access:**
   - Go to "Network Access" in Atlas
   - Click "Add IP Address"
   - For development: Add "0.0.0.0/0" (Allow access from anywhere)
   - For production: Add your specific IP addresses

## Step 2: Database Collections Structure

AgriSure will automatically create these collections:

### Collections:
- `users` - Farmer profiles and authentication
- `schemes` - Government schemes data
- `applications` - Scheme applications by users
- `corruption_reports` - Anonymous corruption reports
- `mandi_prices` - Market price data

## Step 3: Initialize Database

The app will automatically:
1. Connect to MongoDB on startup
2. Create default government schemes
3. Set up indexes for better performance

## Step 4: Test Connection

Run the development server to test:
```bash
npm run dev
```

Check console for:
- ✅ "Connected to MongoDB"
- ✅ "Default schemes initialized"

## Step 5: Production Deployment

For production deployment:
1. Use environment variables for connection string
2. Enable MongoDB Atlas IP whitelist for your hosting provider
3. Use connection pooling for better performance

## Troubleshooting

### Common Issues:
1. **Authentication Failed**: Check username/password in connection string
2. **Network Error**: Verify IP whitelist in Atlas Network Access
3. **Database Not Found**: The database will be created automatically on first write

### Connection String Format:
```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
```

### Example Working Connection:
```env
MONGODB_URI=mongodb+srv://agrisure-user:SecurePassword123@cluster0.abc123.mongodb.net/agrisure?retryWrites=true&w=majority
```

## Features Enabled with MongoDB:

✅ **User Registration & Authentication**
✅ **Scheme Application Tracking**
✅ **Anonymous Corruption Reporting**
✅ **Real-time Mandi Price Updates**
✅ **Application Status Management**
✅ **Data Persistence & Backup**

Your AgriSure platform is now ready with full database integration!
