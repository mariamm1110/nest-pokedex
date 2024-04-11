import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule, Schema } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';



@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    }),
    //cosa static para subir el html
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    //conectar nest con mongo
    MongooseModule.forRoot(process.env.MONGODB,{
      dbName: 'pokemonsdb'
    }),

    

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
  
})
export class AppModule {}
