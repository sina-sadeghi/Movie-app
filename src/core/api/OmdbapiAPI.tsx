import axios from "axios";
import config from '@/core/config'


export default async function OmdbapiAPI(title: string, page: number = 1) {


    const key = "850d5251"
    const url = config.baseUrl + '?' + title + "&apikey=" + key + "&page=" + page

    return await axios.get(url).then(res => res.data).catch(err => err.response);


}