export function setSavesStorage(saves: string[]) {
    if (window !== undefined) {
        const stringSaves = JSON.stringify(saves)
        localStorage.setItem('saves',  stringSaves);
    }

}
export function getSavesStorage() {
    if(window !== undefined) {
        const stringSaves = localStorage.getItem('saves');
        if(stringSaves)
            return JSON.parse(stringSaves)
    }
}