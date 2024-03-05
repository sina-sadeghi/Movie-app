import en from "@/lang/_en";
import config from "@/core/config";

export default function Language(key: string ): string {

    if (config.lang === 'en' && key in en)
        return en[key];

    return key
}