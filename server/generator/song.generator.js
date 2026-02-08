const { Faker, en, ru, de, uk, uz_UZ, base } = require('@faker-js/faker');
const locales = require('../data/locales.json');

const fakerLocales = {
    'en-US': [en, base],
    'ru-RU': [ru, en, base],
    'de-DE': [de, en, base],
    'uk-UA': [uk, en, base],
    'uz-UZ': [uz_UZ, en, base]
};

exports.generateSongs = ({ seed, lang, page, pageSize, likes }) => {
    const songs = [];

    for (let i = 0; i < pageSize; i++) {
        const itemIndex = (page - 1) * pageSize + i;
        const song = generateSong({ seed, index: itemIndex, lang });
        song.likes = calculateLikes(seed, itemIndex, likes);
        songs.push(song);
    }
    return songs;
};

function generateSong({ seed, index, lang }) {
    const localeData = locales[lang] || locales['en-US'];
    const faker = new Faker({ locale: fakerLocales[lang] || [en, base] });

    const combo = (suffix) => {
        faker.seed(`${seed}-${index}-${suffix}`);
        return `${faker.helpers.arrayElement(localeData.words)} ${faker.helpers.arrayElement(localeData.words)}`;
    };

    const title = combo('title');
    const albumName = combo('album');
    const isSingle = faker.datatype.boolean(0.3);
    faker.seed(`${seed}-${index}-meta`);

    return {
        id: faker.string.uuid(),
        index: index + 1,
        title: title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
        artist: faker.person.fullName(),
        genre: faker.music.genre(),
        album: isSingle ? localeData.single : albumName,
        cover: faker.image.url({ width: 200, height: 200, category: 'abstract' }),
        review: faker.lorem.sentence()
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
