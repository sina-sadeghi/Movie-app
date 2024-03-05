import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form"
import OmdbapiAPI from '@/core/api/OmdbapiAPI'
import Card, {selfCardInterface} from "@/shared/Card";
import Modal, {modelInterface} from "@/shared/Modal";
import {disablePageScroll, enablePageScroll} from 'scroll-lock';
import widthWindow from "@/core/constans/WidthWindow";
import {getSavesStorage} from "@/core/services/Storage";
import Language from "@/core/services/Language";
import HeaderSide from "../shared/HeaderSide";
import {connect} from "react-redux";
import {MenuPopup} from "@/actions/popup-action";


type Inputs = {
    title: string
}

interface HomeInterface {
    widthSize: string,
    alert: (type: number, text: string) => void,
    loading: (value: boolean) => void,
    menuPopupState: { menuPopupState?: boolean },
    OnMenuPopup: (state: boolean) => void
}

function Home({widthSize, alert, loading, menuPopupState, OnMenuPopup}: HomeInterface) {

    const [result, setResult] = useState<selfCardInterface[]>([]);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(-1)
    const [showModal, setShowModal] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<modelInterface | null>(null)
    const [saves, setSaves] = useState<string[]>([])
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        if (menuPopupState?.menuPopupState !== showMenu)
            setShowMenu(menuPopupState?.menuPopupState || false)
    }, [showMenu, menuPopupState])


    const changePage = async () => {
        if (page * 10 < total) {
            setPage(page + 1)
            return await getMovies('s=' + getValues('title'), page + 1).then(r => {
                if (r.Response === "True" && r.Search.length > 0) {
                    setResult([...result, ...r.Search])
                }
            })
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollY = window.scrollY;
            const distanceToBottom = scrollHeight - scrollY - clientHeight;

            if (distanceToBottom <= 50) {
                console.log('Approaching the bottom of the scroll!');
                changePage()
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [changePage, total, page, result]);


    const getMovies = async (title: string, page: number = 1) => {
        loading(true)
        return await OmdbapiAPI(title, page).then(r => {
            console.log(r)
            loading(false)
            if (r?.Response) {
                if (r.Response === "False")
                    alert(1, r.Error)

                return r
            }
            alert(1, Language('something-wrong'))
            return {Response: "False"}
        })
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        return await getMovies('s=' + data.title, 1).then(r => {
            if (r.Response === "True" && r.Search.length > 0) {
                setTotal(r.totalResults)
                setResult(r.Search)

                if (getSavesStorage() && getSavesStorage().length > 0)
                    setSaves(getSavesStorage())
            }
        })

    }


    const handleSelectMovie = async (id: string) => {
        return await getMovies('i=' + id).then(r => {
            if (r.Response === "True") {
                setSelectedMovie(r)
                setShowModal(true)
                disablePageScroll()
            }
        })
    }

    const closeModal = () => {
        setShowModal(false)
        enablePageScroll()
    }

    const handleClickMenu = () => {
        OnMenuPopup(!showMenu)
    }


    return <div onScroll={e => console.log(e)}>


        <HeaderSide title={Language('home-header-title')}/>

        <div onScroll={e => console.log(e)}>

            <div className="fixed left-4 cursor-pointer hover:bg-slate-600 px-1 rounded"
                 onClick={() => handleClickMenu()}>
                <i className={`fa-light fa-${showMenu ? 'xmark px-1' : 'bars'}`}/>
            </div>

            {showModal && <Modal selectedMovie={selectedMovie} widthSize={widthSize} closeModal={closeModal}/>}

            {<form onSubmit={handleSubmit(onSubmit)} className={'my-4 text-center'}>
                {widthSize === widthWindow[0] && <span
                    className={' block md:inline md:mr-4 text-slate-200 text-lg'}>{Language('home_search_label')}</span>}
                <input {...register("title", {required: true})} placeholder={Language('home_search_placeholder')}
                       className={'outline-0 rounded text-slate-700 p-1 m-1 w-56 md:w-64 border bg-slate-200 border-slate-600'}/>
                <input type="submit" value={Language('home_search_button')} tabIndex={0}
                       className={'rounded bg-blue-500 text-slate-100 px-2 py-1 cursor-pointer border border-blue-800 outline-0 focus:border-slate-100'}/>
            </form>}

            {!!result && result.length > 0 && <div
                className="p-2 md:p-6 flex flex-wrap justify-around md:grid gap-2 md:gap-6 border border-slate-700 mx-2 rounded-sm"
                style={{gridTemplateColumns: widthSize === widthWindow[0] ? 'repeat(auto-fill, minmax(216px, 1fr))' : ''}}>
                {result.map((movie, key) => <Card alert={alert} setSaves={setSaves} saves={saves} movie={movie}
                                                  key={key} widthSize={widthSize} click={handleSelectMovie}/>)}
            </div>}
        </div>
    </div>
}


const mapStateToProps = (state: { PopupReducer: object }) => {
    return {
        menuPopupState: state.PopupReducer,
    };
};

const mapDispatchToProps = (dispatch: (a: { type: string, payload: { state: any } }) => void) => ({
    OnMenuPopup: (state: boolean) => dispatch(MenuPopup(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
