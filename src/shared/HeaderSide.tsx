import Head from "next/head";
import React from "react";
import Language from "@/core/services/Language";

interface HeaderSideInterface {
    title: string
}

export default function HeaderSide({title}: HeaderSideInterface) {
    return <Head>
        <title>{title}</title>
        <meta name="keywords" content={Language('meta_keywords')}/>
        <meta name="description" content={Language('meta_description')}/>
        <meta name="author" content="Sina Sadeghi"/>
    </Head>
}