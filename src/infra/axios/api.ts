import axios from "axios";

export const apiStarWars = axios.create({
    baseURL: "https://swapi.dev/api/"
})

export const limit = 10