require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

// Import initial data
const { products } = require('./data.cjs');

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Product.deleteMany({});
        await User.deleteMany({});
        await Order.deleteMany({});
        console.log('✅ Existing data cleared');

        // Seed Products
        console.log('📦 Seeding products...');
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products seeded`);

        // Seed Users
        console.log('👥 Seeding users...');

        // We use create() instead of insertMany() to trigger the pre-save hook for password hashing
        await User.create([
            {
                id: 1,
                name: 'Admin User',
                email: 'admin@lumina.com',
                password: 'lumina12', // Plain text, will be hashed
                role: 'admin'
            },
            {
                id: 2,
                name: 'Demo User',
                email: 'user@lumina.com',
                password: 'lumina123', // Plain text, will be hashed
                role: 'customer'
            }
        ]);
        console.log('✅ 2 users seeded');

        // Seed Orders (Optional, skipping for now to keep it clean)
        console.log('📋 Seeding orders...');
        // ... (skipping order seeding for simplicity, or we can add it back if needed)

        // Display summary
        console.log('\n📊 Database Seeding Summary:');
        console.log(`   Products: ${await Product.countDocuments()}`);
        console.log(`   Users: ${await User.countDocuments()}`);

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📝 Default Login Credentials:');
        console.log('   Admin: admin@lumina.com / lumina12');
        console.log('   User:  user@lumina.com  / lumina123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
