import type { EnumGender } from "@/@types/enums/characters";

export type Character = {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: EnumGender;
    films: string[];
}