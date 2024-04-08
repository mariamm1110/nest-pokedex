import { Document } from 'mongoose';
import {Schema, SchemaFactory, Prop} from '@nestjs/mongoose';


//PARA LA BASE DE DATOS esquema
@Schema()
export class Pokemon extends Document {

    //id: string // Mongo me lo da

    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
