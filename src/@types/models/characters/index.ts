import type { EnumGender } from "@/@types/enums/characters";
import type { Films } from "../films";

export type Character = {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: EnumGender;
    films: Films[];
}

export interface ICharacterToShow extends Omit<Character, 'films'> {
    films: string[]
  }