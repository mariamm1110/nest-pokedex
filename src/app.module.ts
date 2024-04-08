import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';



@Module({
  imports: [
    //cosa static para subir el html
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    //conectar nest con mongo
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,

    CommonModule,
  ],
  
})
export class AppModule {}