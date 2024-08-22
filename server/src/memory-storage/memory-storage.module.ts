import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import memoryStorageConfig from './configs/memory-storage.config';
import { MemoryStorageService } from './memory-storage.service';
import { RedisService } from './redis.service';

const MemoryStorageServiceProvider = {
  provide: MemoryStorageService,
  useClass: RedisService,
};
@Module({
  imports: [ConfigModule.forFeature(memoryStorageConfig)],
  providers: [MemoryStorageServiceProvider],
  exports: [MemoryStorageServiceProvider],
})
export class MemoryStorageModule {}
