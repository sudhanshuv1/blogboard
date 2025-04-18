const { JSDOM } = require('jsdom');

/**
 * Extracts media elements (images and videos) from HTML content.
 * @param {string} content - The HTML content to parse.
 * @returns {Object} - An object containing the media elements and the parsed document.
 */
const extractMediaFromContent = (content) => {
    const dom = new JSDOM(content);
    const document = dom.window.document;

    // Select all <img> and <video> elements with a "src" attribute
    const mediaElements = [...document.querySelectorAll('img[src], video[src]')];
    const media = mediaElements.map((element) => ({
        tag: element.tagName.toLowerCase(),
        src: element.getAttribute('src'),
        element,
    }));

    return { media, document };
};

module.exports = { extractMediaFromContent };