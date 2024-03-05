import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import '@/assets/icons/style.css'
import '@/assets/icons/fontawesome/all.min.css'
import {Provider} from "react-redux";
import store from "../store";
import React, {useEffect, useState} from 'react';
import widthWindow from '@/core/constans/WidthWindow';
import Alert from "@/shared/Alert";
import Loading from "@/shared/Loading";

export default function App({Component, pageProps}: AppProps) {

    const [widthSize, setWidthSize] = useState(widthWindow[0])
    const [showAlert, setShowAlert] = useState(false)
    const [propsAlert, setPropsAlert] = useState({type: 0, text: ''})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 720)
                setWidthSize(widthWindow[0])
            else
                setWidthSize(widthWindow[1])
        }
    }, [])

    const initAlert = (type: number, text: string) => {
        setPropsAlert({type: type, text: text})
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000);
    }

    const props = {...pageProps, widthSize: widthSize, alert: initAlert, loading: setLoading}

    return (
        <>
            <Provider store={store}>
                {showAlert && <Alert {...propsAlert}/>}
                {loading && <Loading/>}
                <Component {...props}/>
            </Provider>
        </>
    )
}
