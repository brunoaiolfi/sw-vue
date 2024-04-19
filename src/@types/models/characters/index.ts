import type { EnumEyeColor, EnumGender } from "@/@types/enums/characters";

export type Character = {
    name: string;
    birth_year: string;
    eye_color: EnumEyeColor | string;
    gender: EnumGender;
    films: string[];
}