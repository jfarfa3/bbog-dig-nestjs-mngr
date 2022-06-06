/**
 * module for managing relational databases with typeORM,
 * if you don't want to use it you can remove it from app.module.ts
 */

import { Module, Global } from '@nestjs/common';
import { ConfigType } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "../config";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) =>{
                const { user, host, database, password, port } = configService.DATABASE;
                return {
                    type: 'mysql',
                    host,
                    port,
                    username: user,
                    password,
                    database,
                    synchronize: true,
                    autoLoadEntities: true,
                };
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
