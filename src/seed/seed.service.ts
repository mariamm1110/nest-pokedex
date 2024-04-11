import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

 

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    
    private readonly http: AxiosAdapter,

  ){}
  
  

  async executeSeed(){

    await this.pokemonModel.deleteMany({}) //delete * from pokemons;

    const data=await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: {name:string, no:number} []=[];
    //realizar funciones http

    //poner async en el 4each
    data.results.forEach(async({name, url})=>{

      const segments= url.split('/');
      const no:number = +segments[segments.length - 2]

      //llenar la bd
      // const pokemon= await this.pokemonModel.create({name, no})
      pokemonToInsert.push({name, no}); //[name" bb, no:1]
      // console.log({name, no})
    });

    this.pokemonModel.insertMany(pokemonToInsert);
    //hace todas las inserciones de manera simultanea
    //insert ito pokemons (name, no)
    
    return 'Seed Executed';
  }
}
