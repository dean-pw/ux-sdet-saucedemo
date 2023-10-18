const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Utilities {

    async navigateTo(url) {
        return browser.url(url);
    }

    async pause(ms) {
        return browser.pause(ms);
    }

    async maximizeWindow() {
        return browser.maximizeWindow();
    }

    // arrayList: array list
    // orderBy: accepts string "asc", "desc"
    async sortArray(arrayList, orderBy) {
        if (typeof orderBy !== 'string') {
            throw new Error('Incorrect method type, only accepts a string.');
        }

        let sortedList = null;
        let unsortedList = arrayList;

        switch (orderBy.toLowerCase()) {
            case "asc":
                sortedList = unsortedList.slice().sort((a, b) => {
                    if (typeof a === "number" && typeof b === "number") {
                        return a - b; // Sort numbers in ascending order.
                    } else {
                        return a.localeCompare(b); // Sort strings in ascending order.
                    }
                });
                break;
            case "desc":
                sortedList = unsortedList.slice().sort((a, b) => {
                    if (typeof a === "number" && typeof b === "number") {
                        return b - a; // Sort numbers in descending order.
                    } else {
                        return b.localeCompare(a); // Sort strings in descending order.
                    }
                });
                break;
            default:
                throw new Error('Invalid argument. orderBy only accepts "asc" or "desc".');
        }

        return sortedList;
    }
}