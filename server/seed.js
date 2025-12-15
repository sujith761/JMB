require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const Admin = require('./models/Admin');
const User = require('./models/User');

(async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB || 'jmb' });

    const products = [
      { name: 'Hydrogen Peroxide', description: 'Versatile, excellent white', ratePerMeter: 25, processType: 'bleaching' },
      { name: 'Sodium Hypochlorite', description: 'Low cost, damages some fibers', ratePerMeter: 15, processType: 'bleaching' },
      { name: 'Sodium Chlorite', description: 'Gentle, good for wool/silk', ratePerMeter: 30, processType: 'bleaching' },
      { name: 'Enzymatic / Ozone', description: 'Eco-friendly bleaching', ratePerMeter: 35, processType: 'bleaching' },
      { name: 'B-Max', description: 'Dyeing chemical B-Max', ratePerMeter: 28, processType: 'dyeing' },
      { name: 'Dye-Max', description: 'Dyeing chemical Dye-Max', ratePerMeter: 32, processType: 'dyeing' },
      { name: 'F-Max', description: 'Dyeing chemical F-Max', ratePerMeter: 26, processType: 'dyeing' },
      { name: 'Mini-Max', description: 'Dyeing chemical Mini-Max', ratePerMeter: 22, processType: 'dyeing' }
    ];

    await Product.deleteMany({});
    await Product.insertMany(products);

    const adminEmail = 'admin@jmb.com';
    const adminPass = await bcrypt.hash('Admin@123', 10);
    const adminExists = await Admin.findOne({ email: adminEmail });
    if (!adminExists) {
      await Admin.create({ name: 'JMB Admin', email: adminEmail, password: adminPass, role: 'admin' });
    }

    // Ensure a demo user exists for quick testing
    const demoEmail = 'demo@jmb.com';
    const demoExists = await User.findOne({ email: demoEmail });
    if (!demoExists) {
      const demoPass = await bcrypt.hash('Demo@123', 10);
      await User.create({ name: 'Demo User', email: demoEmail, password: demoPass, company: 'Demo Co', role: 'user' });
    }

    console.log('Seed complete');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
