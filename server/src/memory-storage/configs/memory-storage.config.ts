import { registerAs } from '@nestjs/config';

export default registerAs('memoryStorage', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
}));
