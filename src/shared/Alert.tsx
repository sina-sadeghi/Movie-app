interface alertInterface {
    type: number,
    text: string
}

export default function Alert({type, text}: alertInterface) {

    const icon: { [key: number]: string } = {
        0: 'circle-check',
        1: 'circle-xmark',
    }

    return <div className={'block m-auto w-80'}>
        <div className={'fixed top-10 w-80 z-30'}>
            <div id="alert-border-1" role="alert"
                 className={`animate-pulse p-4 mb-4 border-b-4`}>
                <div className="text-center inline-block w-5/6">{text}</div>
                <i className={`fa-light fa-${icon[type]} ml-4`}/>
            </div>
        </div>
    </div>
}