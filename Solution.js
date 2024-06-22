
/**
 * @param {number[]} firstInput
 * @param {number[]} secondInput
 * @return {number}
 */
var longestCommonPrefix = function (firstInput, secondInput) {
    const trie = new Trie();
    for (let value of firstInput) {
        trie.addInteger(value, getLargestFactorOfTen(value));
    }

    let longestCommonPrefix = 0;
    for (let value of secondInput) {
        longestCommonPrefix = Math.max(longestCommonPrefix, trie.findLongestCommonPrefix(value, getLargestFactorOfTen(value)));
    }
    return longestCommonPrefix;
};

/**
 * @param {number} value
 * @return {number}
 */
function getLargestFactorOfTen(value) {
    let factor = 1;
    while (Math.floor(value / factor) > 0) {
        factor *= 10;
    }
    return factor / 10;
}

class TrieNode {

    static NUMBER_OF_DIGITS = 10;
    branches = new Array(TrieNode.NUMBER_OF_DIGITS).fill(null);
}

class Trie {

    root = new TrieNode();

    /**
     * @param {number} value
     * @param {number} factor
     * @return {void}
     */
    addInteger(value, factor) {
        let current = this.root;

        while (factor > 0) {
            const digit = Math.floor(value / factor);
            if (current.branches[digit] === null) {
                current.branches[digit] = new TrieNode();
            }

            current = current.branches[digit];
            value %= factor;
            factor = Math.floor(factor / 10);
        }
    }

    /**
     * @param {number} value
     * @param {number} factor
     * @return {number}
     */
    findLongestCommonPrefix(value, factor) {
        let current = this.root;
        let longestCommonPrefix = 0;

        while (factor > 0) {
            const digit = Math.floor(value / factor);
            if (current.branches[digit] === null) {
                break;
            }

            ++longestCommonPrefix;
            current = current.branches[digit];
            value %= factor;
            factor = Math.floor(factor / 10);
        }

        return longestCommonPrefix;
    }
}
