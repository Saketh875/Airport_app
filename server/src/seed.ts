import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import User from './models/User';
import Issue from './models/Issue';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
	const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/airport_issue_portal';
	await mongoose.connect(mongoUri);
	console.log('Connected to MongoDB');

	// Clear existing data
	await User.deleteMany({});
	await Issue.deleteMany({});
	console.log('Cleared existing data');

	// Create users
	const staffPass = await bcrypt.hash('staff123', 10);
	const passengerPass = await bcrypt.hash('pass123', 10);

	const staff = await User.create({
		name: 'Airport Staff',
		email: 'staff@example.com',
		passwordHash: staffPass,
		role: 'staff'
	});

	const passenger = await User.create({
		name: 'John Passenger',
		email: 'passenger@example.com',
		passwordHash: passengerPass,
		role: 'passenger'
	});

	console.log('Created users:', staff.email, passenger.email);

	// Create comprehensive demo issues
	const demoIssues = [
		// Staff-reported issues (Red status)
		{
			sector: 'CabinCrew',
			category: 'Last-minute checks and delays',
			description: 'Life vest inspection incomplete for Flight AA123. Need immediate attention before departure.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'normal'
		},
		{
			sector: 'CabinCrew',
			category: 'Passenger Misconduct',
			description: 'Passenger in seat 12A causing disturbance to other passengers. Refusing to follow crew instructions.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'normal'
		},
		{
			sector: 'Sanitation',
			category: 'Restroom availability',
			description: 'Restroom near Gate 12 is out of order. No alternative facilities nearby.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'normal'
		},
		{
			sector: 'Sanitation',
			category: 'Cleaning staff shortage',
			description: 'Only 2 cleaning staff available for entire terminal. Need additional personnel.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'normal'
		},
		{
			sector: 'Security',
			category: 'CCTV system defects',
			description: 'CCTV camera at checkpoint 2 is flickering and showing distorted images.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'normal'
		},
		{
			sector: 'Security',
			category: 'Boarding-related issues',
			description: 'Boarding gate scanner malfunctioning. Manual verification required.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'normal'
		},

		// Passenger-reported issues (Red status)
		{
			sector: 'Boarding',
			category: 'Boarding pass issues',
			description: 'Mobile boarding pass not scanning properly. QR code appears corrupted.',
			status: 'red',
			flow: 'passenger',
			reporter: passenger._id,
			priority: 'normal'
		},
		{
			sector: 'Boarding',
			category: 'Lack of clear guidance',
			description: 'No clear signage for Gate 15. Passengers are confused and asking for directions.',
			status: 'red',
			flow: 'passenger',
			reporter: passenger._id,
			priority: 'normal'
		},
		{
			sector: 'Food',
			category: 'Unhygienic food conditions',
			description: 'Sandwich at kiosk B appears stale and has unusual smell. Concerned about food safety.',
			status: 'red',
			flow: 'passenger',
			reporter: passenger._id,
			priority: 'normal'
		},
		{
			sector: 'Food',
			category: 'Substandard beverages',
			description: 'Coffee machine dispensing cold coffee despite hot setting. Multiple complaints received.',
			status: 'red',
			flow: 'passenger',
			reporter: passenger._id,
			priority: 'normal'
		},
		{
			sector: 'Arrivals',
			category: 'Luggage misplacement',
			description: 'Luggage not found on carousel 3. Flight AA456 arrived 2 hours ago.',
			status: 'red',
			flow: 'passenger',
			reporter: passenger._id,
			priority: 'normal'
		},
		{
			sector: 'Arrivals',
			category: 'Excessive checkout waiting',
			description: 'Immigration queue extremely long. Only 2 officers working during peak hours.',
			status: 'red',
			flow: 'passenger',
			reporter: passenger._id,
			priority: 'normal'
		},

		// Issues in progress (Yellow status)
		{
			sector: 'CabinCrew',
			category: 'Pantry Availability',
			description: 'Running low on vegetarian meal options for Flight BB789.',
			status: 'yellow',
			flow: 'staff',
			reporter: staff._id,
			assignee: staff._id,
			priority: 'normal'
		},
		{
			sector: 'Boarding',
			category: 'Gate confusion',
			description: 'Gate change announcement not properly communicated to all passengers.',
			status: 'yellow',
			flow: 'passenger',
			reporter: passenger._id,
			assignee: staff._id,
			priority: 'normal'
		},

		// Resolved issues (Green status)
		{
			sector: 'Sanitation',
			category: 'Unhygienic conditions',
			description: 'Spilled drink in waiting area near Gate 8.',
			status: 'green',
			flow: 'staff',
			reporter: staff._id,
			assignee: staff._id,
			priority: 'normal'
		},
		{
			sector: 'Food',
			category: 'Overpriced items',
			description: 'Water bottle prices seem excessive compared to other airports.',
			status: 'green',
			flow: 'passenger',
			reporter: passenger._id,
			assignee: staff._id,
			priority: 'normal'
		},

		// SOS Priority issues
		{
			sector: 'CabinCrew',
			category: 'Emergency first-aid needed',
			description: 'Passenger experiencing severe allergic reaction. Need medical assistance immediately.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'sos'
		},
		{
			sector: 'Security',
			category: 'Security breach',
			description: 'Unauthorized person attempting to access restricted area near baggage handling.',
			status: 'red',
			flow: 'staff',
			reporter: staff._id,
			priority: 'sos'
		}
	];

	for (const issue of demoIssues) {
		await Issue.create(issue);
		console.log('Seeded issue:', issue.category);
	}

	console.log(`\n✅ Database seeded successfully!`);
	console.log(`📊 Created ${demoIssues.length} demo issues`);
	console.log(`👥 Created 2 demo users:`);
	console.log(`   Staff: staff@example.com / staff123`);
	console.log(`   Passenger: passenger@example.com / pass123`);
	console.log(`\n🚀 You can now start the application!`);

	await mongoose.disconnect();
	console.log('Disconnected from MongoDB');
}

run().catch((e) => {
	console.error('❌ Seeding failed:', e);
	process.exit(1);
});
