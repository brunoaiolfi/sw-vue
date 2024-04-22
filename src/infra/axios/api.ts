import axios from "axios";

export const apiStarWars = axios.create({
    baseURL: "https://swapi.py4e.com/api/"
})

export const limit = 10