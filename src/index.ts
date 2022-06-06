import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from "http";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as serverless from "aws-serverless-express-binary";
import express from "express";
import { ValidationPipe } from '@nestjs/common';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);
    app.setGlobalPrefix('api');
    app.enableCors({
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Refresh',
            'Resourse-Authorization',
            'Cttor-Request-Id',
            'X-App-Version',
        ],
        credentials: true,
        exposedHeaders: [
            'Content-Type',
            'Authorization',
            'Refresh',
            'Resourse-Authorization',
            'Cttor-Request-Id',
            'X-App-Version',
        ],
        origin: '*',
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    await app.init();

    return serverless.createServer(expressApp);
}

export const handler: Handler = (
    event: any,
    context: Context
) => {
    if(!cachedServer) {
        bootstrap().then(server =>{
            cachedServer = server;
            return serverless.proxy(server, event, context);
        });
    } else {
        return serverless.proxy(cachedServer, event, context);
    }
};