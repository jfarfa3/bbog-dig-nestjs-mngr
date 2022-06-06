import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        DATABASE: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT, 10),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB,
        },
    };
});