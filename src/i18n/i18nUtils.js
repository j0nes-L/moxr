import allKeyGroups from './translations.json';

// Helper function to recursively get translations for a given locale.
function getTranslatedObject(obj, lang) {
    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                if (Object.prototype.hasOwnProperty.call(value, lang) || Object.prototype.hasOwnProperty.call(value, 'de')) {
                    newObj[key] = value[lang] || value['de']; //fallback language
                } else {
                    newObj[key] = getTranslatedObject(value, lang);
                }
            }
        }
    }
    return newObj;
}


// We create a single object to hold all our i18n utility methods.
export const i18nUtils = {
    /**
     * Builds a nested dictionary of translated strings for a specific language.
     * @param {string} locale - The language code (e.g., 'en' or 'de').
     * @returns {Object} A nested dictionary of translated strings.
     */
    getTranslations(locale) {
        const lang = locale || 'de'; //fallback language
        return getTranslatedObject(allKeyGroups, lang);
    }
};