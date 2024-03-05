import Image from 'next/image'
import React from "react";
import widthWindow from "../core/constans/WidthWindow";
import {setSavesStorage} from "@/core/services/Storage";
import Language from "@/core/services/Language";


export interface selfCardInterface {
    Title: string,
    Year: number,
    imdbID: string,
    Poster: string,
}

export interface CardInterface {
    alert: (type: number, text: string) => void,
    setSaves: (a: string[]) => void,
    saves: string[],
    movie: selfCardInterface,
    key: number,
    widthSize: string,
    click: (input: string) => void
}

export default function Card({alert, setSaves, saves, movie, key, widthSize, click}: CardInterface) {

    const saveMovie = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        let newSaves: string[] = []

        if (saves.length < 31 || saves.includes(movie.imdbID)) {
            if (saves.includes(movie.imdbID))
                newSaves = saves.filter(item => item !== movie.imdbID);
            else
                newSaves = saves.concat(movie.imdbID);

            setSaves(newSaves)
            setSavesStorage(newSaves)
        } else
            alert(1, Language('save-limit-wrong'))
    }

    let src = movie.Poster
    if (movie.Poster === "N/A")
        src = "/images/no-image.jpg"

    return <div
        className="border border-slate-500 rounded p-1 py-2 flex flex-col bg-slate-600 w-44 md:w-auto items-center justify-between cursor-pointer"
        key={key} onClick={() => click(movie.imdbID)}>
        <Image alt={movie.Title} src={src} className={'object-cover rounded w-40 h-56 md:w-52 md:h-72'}
               width={widthSize === widthWindow[1] ? 160 : 220} height={widthSize === widthWindow[1] ? 50 : 100}/>
        <div className="flex items-center justify-between w-full py-2 px-2 mx-3">
            <div className="truncate w-32 md:w-44" title={movie.Title + ' (' + movie.Year + ')'}>
                <span className={'text-slate-100'}>{movie.Title}</span>
                <span className={'text-slate-400'}> ({movie.Year})</span>
            </div>
            <i className={`fa-${saves.includes(movie.imdbID) ? 'solid' : 'light'} fa-bookmark text-lg text-yellow-400 hover:text-yellow-200`}
               onClick={saveMovie}/>
        </div>
    </div>
}