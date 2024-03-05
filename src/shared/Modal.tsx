import widthWindow from "@/core/constans/WidthWindow";
import Image from "next/image";


export interface modelInterface {
    Poster: string,
    Title: string,
    Director: string,
    Actors: string,
    Runtime: string,
    Released: string,
    Plot: string,
    imdbRating: string,
    Response: string
}

interface modelInterfaceFull {
    selectedMovie: modelInterface | null
    closeModal: () => void,
    widthSize: string,
}

export default function Modal({closeModal, selectedMovie, widthSize}: modelInterfaceFull) {

    if (selectedMovie) {
        var src = selectedMovie.Poster
        if (selectedMovie.Poster === "N/A")
            src = "/images/no-image.jpg"

        return <>
            <div className={'fixed top-0 w-full h-screen bg-slate-800 opacity-50 z-20'} onClick={closeModal}/>
            <div
                className={'fixed bottom-1/2 z-30 bg-slate-700 border border-slate-500 right-1/2 translate-y-1/2 translate-x-1/2 text-center inline-block max-w-8/12 w-8/12 md:w-3/4 rounded p-3 md:p-6 '}>
                <i className={'float-right fa-light fa-xmark -ml-2 -mt-2 hover:bg-slate-600 py-1 px-1.5 rounded-full cursor-pointer'}
                   onClick={closeModal}/>

                <div className="flex flex-wrap flex-col md:flex-row gap-4 items-start w-full">

                    <Image src={src} alt={selectedMovie.Title} className={'rounded w-full md:w-4/12'} width={150}
                           height={200}/>
                    <div className={'text-left md:w-7/12'}>
                        <div
                            className="text-lg pb-4md:text-3xl pb-2 md:pt-4 md:pb-12 text-slate-100 w-8/12 truncate">{selectedMovie.Title}</div>

                        <div className="flex justify-between flex-col text-sm md:text-base md:flex-row w-full">
                            <div className="flex flex-col gap-1.5">
                                <div title={'Director'} className={'w-8/12 truncate pt-1'}><i
                                    className="fa-light fa-person text-yellow-400 text-lg"/> {selectedMovie.Director}
                                </div>
                                <div title={'Actors'} className={'w-8/12 truncate'}><i
                                    className="fa-light fa-people text-yellow-400"/> {selectedMovie.Actors}
                                </div>
                            </div>

                            <div className="flex gap-8 mt-2 md:mt-0 md:gap-2 md:flex-col">
                                <div title={'Runtime'}><i
                                    className="fa-light fa-play text-yellow-400 mr-1"/>{selectedMovie.Runtime}</div>
                                <div title={'Released'}><i
                                    className="fa-light fa-calendar-days text-yellow-400 mr-1"/>{selectedMovie.Released}
                                </div>
                            </div>
                        </div>


                        {widthSize === widthWindow[0] &&
                            <div className={'text-slate-300 my-16'}>{selectedMovie.Plot}</div>}


                        <div className={'flex items-center gap-6 mt-4 md:block md:mt-0'}>
                            <b className={'block text-yellow-500 my-1'}>IMDB</b>
                            <div className="flex gap-3 text-yellow-600">
                            <span><i
                                className="fa-light fa-trophy text-yellow-400 mr-1"/>{selectedMovie.imdbRating}</span>
                                <span><i
                                    className="fa-light fa-people text-yellow-400 mr-1 align-middle"/>{selectedMovie.imdbRating}</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    }

    return null
}