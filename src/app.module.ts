import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';


import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module'; // module for managing relational databases with typeORM, you can remove it from app.module.ts

import config from './config'; // file with configuration, you can remove it if you don't want to use it
import { enviroments } from './enviroments' // file with enviroments, you can remove it if you don't want to use it




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || ".env",
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
      }),
    }), // module to manage configuration files and validation of environment variables, you can remove it if you don't want to use it
    DatabaseModule // module for managing relational databases with typeORM, you can remove it if you don't want to use it
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
