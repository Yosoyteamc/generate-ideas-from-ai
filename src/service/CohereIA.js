import { translateArrayText } from "./TextTranslateAPI";
import { v4 as uuidv4 } from 'uuid';
import { Idea } from "../models/idea.class";

const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate';
const COHERE_API_DETECT_LANGUAGE_URL = 'https://api.cohere.ai/detect-language';
const COHERE_API_KEY = 'N4FP3pG6zEE14Jch9i7D5jb3drptoqChzKmPvdii';
const COHERE_API_VERSION = '2022-12-06';


async function generateListOfTitles( profile, preferences ){

    // console.log('generating titles...');

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
    // console.log('generating description...');
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
    // console.log('generating hashtags...');
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

    const hashtags = response?.generations[0]?.text;

    return Array.from(new Set(hashtags
        .replaceAll(/\d/g,'').replaceAll('\n','').replaceAll('"','').replaceAll(`'`,'').replaceAll('.','').split('#')
        .map((item) => '#'+item.trim())
        .filter((item) => item.length > 2 && item !== ' ' && item.length < 20)))
}


async function detectLanguage(input){

    // console.log('detecting language...');

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

export async function createOneIdea(position, {profile, preferences}) {
    // console.log(profile, preferences)
    const randomPreference = preferences.length === 1 ? preferences[0] : preferences[Math.floor(Math.random() * preferences.length)];
    // console.log('creating one idea...');
    const suggestionsTitlesArray = await generateListOfTitles(profile, randomPreference);
    const randomIndex = Math.floor(Math.random() * suggestionsTitlesArray.length);
    // console.log('randomIndex', randomIndex);
    const suggestion = suggestionsTitlesArray[randomIndex];
    const language = await detectLanguage(suggestion);

    const description = await generateDescription(suggestion, profile, randomPreference);
    const hashtags = await generateHashTags(suggestion, profile, randomPreference);

    const title = suggestion.matchAll(':')?
                  suggestion.replace(/\d+./g,'').split(':') : 
                  suggestion.replace(/\d+./g,'');

    return new Idea(
        uuidv4(),
        title,
        `${profile} de ${randomPreference}`,
        description,
        hashtags,
        position,
        language
    ) 
}


export async function createIdeas({ profile, preferences}) {

    // console.log(profile, preferences)
    // console.log('creating ideas...');

    const randomIndex = preferences.length === 1? 0 : Math.floor(Math.random() * preferences.length);
    // console.log('randomIndex', randomIndex, preferences[randomIndex]);
    const suggestionsTitlesArray = await generateListOfTitles(profile, preferences[randomIndex]);
    // console.log(suggestionsTitlesArray);
    const languageArray = await Promise.all(suggestionsTitlesArray.map(async (title) => {
        return await detectLanguage(title);
    }));
    const suggestionDescriptionsArray = await Promise.all(suggestionsTitlesArray.map(async (title) => {
        return await generateDescription(title, profile, preferences[randomIndex]);
    })); 
    const suggestionsHashTagsArray = await Promise.all(suggestionsTitlesArray.map(async (title) => {
        return await generateHashTags(title, profile, preferences[randomIndex]);
    }));

    // language === 'es' ? null : suggestionsTitlesArray = await translateArrayText(suggestionsTitlesArray).then(
    //     console.log(suggestionsTitlesArray, language)
    // );

    const ideas = suggestionsTitlesArray.map((idea, index) => {
        
        const title = idea.matchAll(':')?
            idea.replace(/\d+./g,'').split(':') : 
            idea.replace(/\d+./g,'');
        
        const description = suggestionDescriptionsArray[index];
        const hashtags = suggestionsHashTagsArray[index] || [`#${profile}`, `#${preferences[randomIndex]}`];
        const language = languageArray[index];

        return new Idea(
            uuidv4(),
            title[0],
            `${profile} de ${preferences[randomIndex]}`,
            description,
            hashtags,
            index + 1,
            language
        )
    });

    // console.log(suggestionsTitlesArray, language);
    // console.log(typeof suggestions); 
    // console.log(suggestionsHashTagsArray);
    // console.log(suggestions);

    return ideas;
}
