
const TEXT_TRANSLATE_API_URL = 'https://text-translator2.p.rapidapi.com/translate';
const TEXT_TRANSLATE_API_KEY = '58e5c7ca89mshd0be811acc8f951p13ae1bjsn1b618f7db903';

const encodedParams = new URLSearchParams();
encodedParams.append("source_language", "en");
encodedParams.append("target_language", "es");

export async function translateText(input) {

    encodedParams.append("text", input);

    const response = await fetch(TEXT_TRANSLATE_API_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': TEXT_TRANSLATE_API_KEY,
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    })
    .then(res => res.json());

    return response?.data.translatedText;
}

export async function translateArrayText(inputArray) {

    console.log('translating...');

    const translatedArray = inputArray.map(async input => {
        const translatedText = await translateText(input);
        return translatedText;
    });

    return translatedArray;
}