import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MONGODB_URI } from './common/config/secrets';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const logger = new Logger('MongoDB');

        logger.log(`Initializing MongoDB connection.`);

        return {
          uri: MONGODB_URI,
          retryAttempts: 5,
          retryDelay: 3000,
        };
      },
      inject: [],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}