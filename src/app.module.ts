import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { User } from './user/entities/user.model';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
