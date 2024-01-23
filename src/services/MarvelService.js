import {useHttp} from '../hooks/useHttp';
const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apibase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=7e6349a9ac285dbdd6ac8a38ee173085';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apibase}characters?limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apibase}characters/${id}?${_apikey}`)
        return _transformCharacter(res.data.results[0]);
    }
    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apibase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apibase}comics/${id}?${_apikey}`);
        return _transformComics(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return {
                id: char.id,
                name: char.name,
                description: char.description ? `${char.description.slice(0,210)}...`: 'There is no description for this character',
                thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
        }
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
}
export default useMarvelService;