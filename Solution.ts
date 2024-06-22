
function longestCommonPrefix(firstInput: number[], secondInput: number[]): number {
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

function getLargestFactorOfTen(value: number): number {
    let factor = 1;
    while (Math.floor(value / factor) > 0) {
        factor *= 10;
    }
    return factor / 10;
}

class TrieNode {

    static NUMBER_OF_DIGITS = 10;
    branches: TrieNode[] = new Array(TrieNode.NUMBER_OF_DIGITS).fill(null);
}

class Trie {

    root = new TrieNode();

    addInteger(value: number, factor: number): void {
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


    findLongestCommonPrefix(value: number, factor: number): number {
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
