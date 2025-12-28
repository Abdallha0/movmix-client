import { getToken } from "../utils/cookieUtils"

export const url = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.NEXT_PUBLIC_LOCALHOST_URL

export var headers = {
    "Content-Type": "application/json",
    Authorization: getToken() || ""
}

export const allGenres = {
    Action: {
        "id": 28,
        "name": "Action"
    },
    Abenteuer: {
        "id": 12,
        "name": "Abenteuer"
    },
    Animation: {
        "id": 16,
        "name": "Animation"
    },
    Comedy: {
        "id": 35,
        "name": "Komödie"
    },
    Krimi: {
        "id": 80,
        "name": "Krimi"
    },
    Dokumentarfilm: {
        "id": 99,
        "name": "Dokumentarfilm"
    },
    Drama: {
        "id": 18,
        "name": "Drama"
    },
    Fantasy: {
        "id": 14,
        "name": "Fantasy"
    },
    Historie: {
        "id": 36,
        "name": "Historie"
    },
    Horror: {
        "id": 27,
        "name": "Horror"
    },
    Musik: {
        "id": 10402,
        "name": "Musik"
    },
    Romance: {
        "id": 14,
        "name": "Fantasy"
    },
    Liebesfilm: {
        "id": 10749,
        "name": "Liebesfilm"
    },
    Science_Fiction: {
        "id": 878,
        "name": "Science Fiction"
    },
    TV_Film: {
        "id": 10770,
        "name": "TV-Film"
    },
    Thriller: {
        "id": 53,
        "name": "Thriller"
    },
    Kriegsfilm: {
        "id": 10752,
        "name": "Kriegsfilm"
    },
    Western: {
        "id": 37,
        "name": "Western"
    }
}

export const allGenresArray = [
    {
        id: 28,
        name: "Action"
    },
    {
        id: 12,
        name: "Abenteuer"
    },
    {
        id: 16,
        name: "Animation"
    },
    {
        id: 35,
        name: "Komödie"
    },
    {
        id: 80,
        name: "Krimi"
    },
    {
        id: 99,
        name: "Dokumentarfilm"
    },
    {
        id: 18,
        name: "Drama"
    },
    {
        id: 14,
        name: "Fantasy"
    },
    {
        id: 36,
        name: "Historie"
    },
    {
        id: 27,
        name: "Horror"
    },
    {
        id: 10402,
        name: "Musik"
    },
    {
        id: 14,
        name: "Fantasy"
    },
    {
        id: 10749,
        name: "Liebesfilm"
    },
    {
        id: 878,
        name: "Science Fiction"
    },
    {
        id: 10770,
        name: "TV-Film"
    },
    {
        id: 53,
        name: "Thriller"
    },
    {
        id: 10752,
        name: "Kriegsfilm"
    },
    {
        id: 37,
        name: "Western"
    }
]
