import { translateArrayText } from "./TextTranslateAPI";
import { v4 as uuidv4 } from 'uuid';

const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate';
const COHERE_API_DETECT_LANGUAGE_URL = 'https://api.cohere.ai/detect-language';
const COHERE_API_KEY = 'N4FP3pG6zEE14Jch9i7D5jb3drptoqChzKmPvdii';
const COHERE_API_VERSION = '2022-12-06';


async function generateListOfTitles( profile, preferences ){

    console.log('generating titles...');

    const data = {
        model: 'command-xlarge-nightly',
        prompt: 'Generar 5 ideas de contenido para un ' + profile + ' de ' + preferences,
        max_tokens: 300,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihood: "NONE"
    };

    const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
            'Cohere-Version': COHERE_API_VERSION
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

    const suggestions = response?.generations[0].text;
    // console.log(suggestions);

    return suggestions.split('\n').map((item) => 
        item.replaceAll('\'', '').replaceAll(/\d+./g,' ').trim().split('.')[0])
        .filter((item) => item.length > 6)
        .map((item) => item.split(':')[0])

}

async function generateDescription(title, profile, preferences){
    console.log('generating description...');
    const data = {
        model: 'command-xlarge-nightly',
        prompt: `Genere un parrafo para un ${profile} de ${preferences} que complemente este titulo: '${title}'`,
        max_tokens: 100,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihood: "NONE"
    };

    const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
            'Cohere-Version': COHERE_API_VERSION
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

    const description = response?.generations[0].text;

    return description;
}

async function generateHashTags(title, profile, preferences){
    console.log('generating hashtags...');
    const data = {
        model: 'command-xlarge-nightly',
        prompt: `Genere 5 hashtags para un ${profile} de ${preferences} que aporten a este titulo: '${title}'`,
        max_tokens: 300,
        temperature: 0.9,
        k: 0,
        p: 0.75,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: [],
        return_likelihood: "NONE"
    };

    const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
            'Cohere-Version': COHERE_API_VERSION
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

    const hashtags = response?.generations[0].text;

    return Array.from(new Set(hashtags
        .replaceAll(/\d/g,'').replaceAll('\n','').replaceAll('"','').replaceAll(`'`,'').replaceAll('.','').split('#')
        .map((item) => '#'+item.trim())
        .filter((item) => item.length > 2 && item !== ' ' && item.length < 20)))
}


async function detectLanguage(input){

    console.log('detecting language...');

    const data = {
        texts: ['Hello World' , input] 
    };

    const response = await fetch(COHERE_API_DETECT_LANGUAGE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

    return response?.results[1]?.language_code;

}

export async function createOneSuggestion(position, settings) {
    const { profile, preferences} = settings;
    console.log('creating one suggestion...');
    const suggestionsTitlesArray = await generateListOfTitles(profile, preferences);
    const randomIndex = Math.floor(Math.random() * suggestionsTitlesArray.length);
    console.log('randomIndex', randomIndex);
    const suggestion = suggestionsTitlesArray[randomIndex];
    const language = await detectLanguage(suggestion);

    const description = await generateDescription(suggestion, profile, preferences);
    const hashtags = await generateHashTags(suggestion, profile, preferences);

    const title = suggestion.matchAll(':')?
                  suggestion.replace(/\d+./g,'').split(':') : 
                  suggestion.replace(/\d+./g,'');

    const date = new Date().getTime();

    return {
        id: uuidv4(),
        title: title,
        type: 'Fashion profile',
        description,
        hashtags,
        position,
        isFavorite: false,
        isRead: false,
        date,
        originalLanguage: language
    } 
}


export async function createSuggestions({ profile, preferences}) {

    console.log('creating suggestions...');

    const suggestionsTitlesArray = await generateListOfTitles(profile, preferences);
    // console.log(suggestionsTitlesArray);
    const languageArray = await Promise.all(suggestionsTitlesArray.map(async (title) => {
        return await detectLanguage(title);
    }));
    const suggestionDescriptionsArray = await Promise.all(suggestionsTitlesArray.map(async (title) => {
        return await generateDescription(title, profile, preferences[0]);
    })); 
    const suggestionsHashTagsArray = await Promise.all(suggestionsTitlesArray.map(async (title) => {
        return await generateHashTags(title, profile, preferences[0]);
    }));

    // language === 'es' ? null : suggestionsTitlesArray = await translateArrayText(suggestionsTitlesArray).then(
    //     console.log(suggestionsTitlesArray, language)
    // );

    const suggestions = suggestionsTitlesArray.map((suggestion, index) => {
        
        const title = suggestion.matchAll(':')?
            suggestion.replace(/\d+./g,'').split(':') : 
            suggestion.replace(/\d+./g,'');
        
        const description = suggestionDescriptionsArray[index];
        const hashtags = suggestionsHashTagsArray[index] || [`#${profile}`, `#${preferences[0]}`];
        const language = languageArray[index];
        
        const date = new Date().getTime();

        return {
            id: uuidv4(),
            title: title[0],
            type: 'Fashion profile',
            description,
            hashtags,
            position: index + 1,
            isFavorite: false,
            isRead: false,
            date,
            originalLanguage: language
        }  
    });

    // console.log(suggestionsTitlesArray, language);
    console.log(suggestions);
    // console.log(typeof suggestions); 
    // console.log(suggestionsHashTagsArray);

    return suggestions;
}
