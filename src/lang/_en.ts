interface LanguageInterface {
    meta_description: string;
    meta_keywords: string;
    'home-header-title': string;
    home_search_label: string;
    home_search_placeholder: string;
    home_search_button: string;
    'saves-title': string;
    'something-wrong': string;
    'save-limit-wrong': string;

    [key: string]: string;
}

const en: LanguageInterface = {
    'meta_description': 'Dive into the world of cinema with our movie database. Explore a diverse collection of films, effortlessly discovering details such as cast information, plot summaries, and release dates. Our user-friendly search feature allows you to find your favorite movies quickly, making the cinematic experience accessible and enjoyable. Whether you\'re planning a movie night or simply curious, our database is your go-to resource for all things film.',
    'meta_keywords': 'movie, serial',

    'home-header-title': 'movie',
    'home_search_label': 'Title',
    'home_search_placeholder': 'Title of movie...',
    'home_search_button': 'search',

    'saves-title': 'Saves',

    'something-wrong' : 'Something went wrong',
    'save-limit-wrong' : 'You can save up to 30 videos',
}

export default en;