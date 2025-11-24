require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

// Import initial data
const { products, users, orders } = require('./data.cjs');

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

        // Seed Users (passwords will be hashed automatically by pre-save hook)
        console.log('👥 Seeding users...');
        const usersToSeed = users.map(user => ({
            ...user,
            // For testing, keeping simple passwords but they'll be hashed
        }));
        await User.insertMany(usersToSeed);
        console.log(`✅ ${users.length} users seeded`);

        // Seed Orders with proper structure
        console.log('📋 Seeding orders...');
        const ordersToSeed = orders.map(order => {
            // Convert order items to include product details
            const items = order.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                    productId: item.productId,
                    productName: product ? product.name : 'Unknown',
                    price: product ? product.price : 0,
                    quantity: item.quantity
                };
            });

            return {
                orderId: order.id,
                userId: order.userId,
                items,
                total: order.total,
                status: order.status,
                createdAt: new Date(order.date)
            };
        });

        await Order.insertMany(ordersToSeed);
        console.log(`✅ ${orders.length} orders seeded`);

        // Display summary
        console.log('\n📊 Database Seeding Summary:');
        console.log(`   Products: ${await Product.countDocuments()}`);
        console.log(`   Users: ${await User.countDocuments()}`);
        console.log(`   Orders: ${await Order.countDocuments()}`);

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📝 Default Login Credentials:');
        console.log('   Admin: adminlumina / lumina12');
        console.log('   User: userlumina / lumina123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
