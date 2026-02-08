const { Faker, en, ru, de, uk, uz_UZ, base } = require('@faker-js/faker');
const localization = require('../localization/localization');

const fakerLocales = {
    'en-US': [en, base],
    'ru-RU': [ru, en, base],
    'de-DE': [de, en, base],
    'uk-UA': [uk, en, base],
    'uz-UZ': [uz_UZ, en, base]
};

exports.generateSongs = ({ seed, lang, page, pageSize, likes }) => {
    const localeData = localization[lang] || localization['en-US'];
    const songs = [];

    for (let i = 0; i < pageSize; i++) {
        const itemIndex = (page - 1) * pageSize + i;
        const song = generateSong({ seed, index: itemIndex, lang, localeData });
        song.likes = calculateLikes(seed, itemIndex, likes);
        songs.push(song);
    }
    return songs;
};

function generateSong({ seed, index, lang, localeData }) {
    const contentFaker = new Faker({
        locale: fakerLocales[lang] || [en, base]
    });
    contentFaker.seed(`${seed}-${index}`);
    const title = contentFaker.helpers.arrayElements(localeData.words, 2).join(' ');

    return {
        id: contentFaker.string.uuid(),
        index: index + 1,
        title: title,
        artist: contentFaker.helpers.arrayElement(localeData.artists),
        genre: contentFaker.helpers.arrayElement(localeData.genres),
        album: contentFaker.datatype.boolean(0.7) ? contentFaker.music.album() : localeData.singleLabel,
        cover: contentFaker.image.urlLoremFlickr({ category: 'abstract', width: 200, height: 200 }),
        review: contentFaker.lorem.sentence()
    };
}

function calculateLikes(seed, index, avgLikes) {
    const likesFaker = new Faker({ locale: en });
    likesFaker.seed(`${seed}-${index}-likes`);
    const baseValue = Math.floor(avgLikes);
    const probability = avgLikes - baseValue;
    const random = likesFaker.number.float({ min: 0, max: 1 });
    return (random < probability) ? (baseValue + 1) : (baseValue + 0);
}
