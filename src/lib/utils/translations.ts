import { Languages } from '../types';

type TranslationSet = {
    cs: string;
    de: string;
    en: string;
    fi: string;
    pl: string;
    sk: string;
};

type Translations = Record<string, TranslationSet>;

const TRANSLATIONS: Translations = {
    'label_poi-bus': {
        cs: 'Zastávka autobusu',
        de: 'Bushaltestelle',
        en: 'Bus stop',
        fi: 'Bussipysäkki',
        pl: 'Przystanek autobusowy',
        sk: 'Zastávka autobusu'
    },
    'label_poi-subway': {
        cs: 'Stanice metra',
        de: 'U-Bahnstation',
        en: 'Subway station',
        fi: 'Metroasema',
        pl: 'Stacja metra',
        sk: 'Stanica metra'
    },
    'label_poi-tram-stop': {
        cs: 'Zastávka tramvaje',
        de: 'Straßenbahnhaltestelle',
        en: 'Tram stop',
        fi: 'Raitiovaunupysäkki',
        pl: 'Przystanek tramwajowy',
        sk: 'Zastávka električky'
    },
    'label_poi-railway-station': {
        cs: 'Vlaková zastávka',
        de: 'Bahnhof',
        en: 'Train station',
        fi: 'Juna-asema',
        pl: 'Przystanek kolejowy',
        sk: 'Vlaková zastávka'
    }
};

export const getTranslation = (lang: Languages, message: string): string => {
    if (!(message in TRANSLATIONS)) {
        return message;
    }

    let langForTranslation = lang;
    if (lang === null) {
        langForTranslation = 'cs';
    }

    return TRANSLATIONS[message][langForTranslation];
};
