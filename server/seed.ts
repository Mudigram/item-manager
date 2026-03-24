import pool from './config/db';
import bcrypt from 'bcryptjs';

const seed = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding database...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING`,
      ['demo_user', 'demo@itemmanager.com', hashedPassword]
    );

    const result = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      ['demo@itemmanager.com']
    );
    const userId = result.rows[0].id;
    console.log(`✓ Demo user ready (id: ${userId})`);

    const items = [
      { name: 'Ergonomic Office Chair', description: 'High-back mesh chair with lumbar support and adjustable armrests.' },
      { name: 'Standing Desk', description: 'Electric height-adjustable desk, 140x70cm surface.' },
      { name: 'MacBook Pro 14"', description: 'Apple M3 chip, 16GB RAM, 512GB SSD.' },
      { name: 'Dell 27" 4K Monitor', description: 'IPS panel with USB-C connectivity and built-in colour calibration.' },
      { name: 'Mechanical Keyboard', description: 'Keychron K2 with brown switches, wireless and wired modes.' },
      { name: 'Logitech MX Master 3', description: 'Wireless ergonomic mouse with MagSpeed scroll wheel.' },
      { name: 'Sony WH-1000XM5', description: 'Noise cancelling headphones with 30-hour battery life.' },
      { name: 'Webcam Logitech C920', description: 'Full HD 1080p webcam with stereo audio.' },
      { name: 'USB-C Hub 7-in-1', description: 'Expands to HDMI, USB-A x3, SD card and 100W PD charging.' },
      { name: 'Desk Lamp LED', description: 'Adjustable colour temperature with built-in wireless charging pad.' },
      { name: 'External SSD 1TB', description: 'Samsung T7 portable SSD, reads up to 1050MB/s.' },
      { name: 'iPad Pro 11"', description: 'M2 chip with Liquid Retina display and Apple Pencil support.' },
      { name: 'Adjustable Monitor Arm', description: 'Single arm mount for screens up to 32", full range of motion.' },
      { name: 'Cable Management Kit', description: '50-piece kit with velcro ties, clips, sleeves and cable tray.' },
      { name: 'Whiteboard 90x60cm', description: 'Magnetic dry-erase board with aluminium frame.' },
      { name: 'Laptop Stand', description: 'Aluminium foldable stand, adjustable to 6 heights.' },
      { name: 'Blue Yeti Microphone', description: 'USB condenser mic with four pickup patterns.' },
      { name: 'Desk Organiser Set', description: 'Bamboo 5-piece organiser with pen holder and document tray.' },
    ];

    for (const item of items) {
      await pool.query(
        `INSERT INTO items (name, description, user_id)
         VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING`,
        [item.name, item.description, userId]
      );
    }

    console.log(`✓ ${items.length} items seeded`);
    console.log('\n🎉 Done! Login with:');
    console.log('   Email:    demo@itemmanager.com');
    console.log('   Password: password123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seed();