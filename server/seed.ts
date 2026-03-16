import pool from './config/db';
import bcrypt from 'bcryptjs';

const seed = async (): Promise<void> => {
    try {
        console.log('🌱 Seeding database...');

        // Create a demo user first (items need a user_id)
        const hashedPassword = await bcrypt.hash('password123', 10);

        await pool.query(
            `INSERT IGNORE INTO users (username, email, password) VALUES (?, ?, ?)`,
            ['demo_user', 'demo@itemmanager.com', hashedPassword]
        );

        const [rows] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            ['demo@itemmanager.com']
        ) as any;

        const userId = rows[0].id;
        console.log(`✓ Demo user ready (id: ${userId})`);

        // 18 sample items across different categories
        const items = [
            { name: 'Ergonomic Office Chair', description: 'High-back mesh chair with lumbar support and adjustable armrests. Great for long work sessions.' },
            { name: 'Standing Desk', description: 'Electric height-adjustable desk, 140x70cm surface. Switches between sitting and standing positions.' },
            { name: 'MacBook Pro 14"', description: 'Apple M3 chip, 16GB RAM, 512GB SSD. Excellent battery life and performance.' },
            { name: 'Dell 27" 4K Monitor', description: 'IPS panel with USB-C connectivity, 60Hz refresh rate and built-in colour calibration.' },
            { name: 'Mechanical Keyboard', description: 'Keychron K2 with brown switches. Compact tenkeyless layout, wireless and wired modes.' },
            { name: 'Logitech MX Master 3', description: 'Wireless ergonomic mouse with MagSpeed scroll wheel. Works across multiple devices.' },
            { name: 'Sony WH-1000XM5', description: 'Industry-leading noise cancelling headphones with 30-hour battery life and multipoint connection.' },
            { name: 'Webcam Logitech C920', description: 'Full HD 1080p webcam with stereo audio. Plug and play, compatible with all major platforms.' },
            { name: 'USB-C Hub 7-in-1', description: 'Expands a single USB-C port to HDMI, USB-A x3, SD card, MicroSD and 100W PD charging.' },
            { name: 'Desk Lamp LED', description: 'Adjustable colour temperature (2700K–6500K) and brightness. Built-in wireless charging pad on base.' },
            { name: 'External SSD 1TB', description: 'Samsung T7 portable SSD. Reads up to 1050MB/s, fits in a pocket, comes with USB-C cable.' },
            { name: 'iPad Pro 11"', description: 'M2 chip with Liquid Retina display. Paired with Apple Pencil for note-taking and sketching.' },
            { name: 'Adjustable Monitor Arm', description: 'Single arm mount for screens up to 32". Full range of motion, clamp or grommet mount options.' },
            { name: 'Cable Management Kit', description: '50-piece kit including velcro ties, cable clips, sleeves and a under-desk cable tray.' },
            { name: 'Whiteboard 90x60cm', description: 'Magnetic dry-erase board with aluminium frame. Includes marker tray, two markers and an eraser.' },
            { name: 'Laptop Stand', description: 'Aluminium foldable stand adjustable to 6 different heights. Compatible with 10–17" laptops.' },
            { name: 'Blue Yeti Microphone', description: 'USB condenser mic with four pickup patterns. Studio-quality audio for podcasts and video calls.' },
            { name: 'Desk Organiser Set', description: 'Bamboo 5-piece desk organiser with pen holder, phone slot, document tray and two small trays.' },
        ];

        // INSERT IGNORE skips any item that already exists (safe to re-run)
        for (const item of items) {
            await pool.query(
                `INSERT IGNORE INTO items (name, description, user_id) VALUES (?, ?, ?)`,
                [item.name, item.description, userId]
            );
        }

        console.log(`✓ ${items.length} items seeded successfully`);
        console.log('\n🎉 Done! You can log in with:');
        console.log('   Email:    demo@itemmanager.com');
        console.log('   Password: password123');

        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
};

seed();