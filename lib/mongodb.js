const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'MODE', value: 'private' },
    { key: 'OWNER_REACT', value: 'true' },
    { key: 'RECODING', value: 'true' },
    { key: 'AUTO_TIPPING', value: 'true' },
    { key: 'AUTO_READ_CMD', value: 'true' }, 
    { key: 'WELCOME', value: 'true' },
    { key: 'AUTO_VOICE', value: 'false' },
    { key: 'AUTO_STICKER', value: 'false' },
    { key: 'AUTO_REPLY', value: 'false' },
    { key: 'AUTO_AI', value: 'false' },
    { key: 'AUTO_REACT', value: 'true' },
    { key: 'LOGO', value: 'https://files.catbox.moe/liepk0.jpg' },
    { key: 'FOOTER', value: 'Zaynix-MD' },
];

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
