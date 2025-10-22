// Test MongoDB Atlas connection
const mongoose = require('mongoose');

// Replace with your actual connection string
const mongoUri = 'mongodb+srv://airportuser:YOUR_PASSWORD@airportuser.cbajak4.mongodb.net/airport_issue_portal?retryWrites=true&w=majority&appName=airportuser';

async function testConnection() {
  try {
    console.log('Testing connection to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check your MongoDB Atlas username/password');
    console.log('2. Make sure Network Access allows your IP');
    console.log('3. Verify the connection string format');
  }
}

testConnection();
