
public class Solution {

    private final Trie trie = new Trie();

    public int longestCommonPrefix(int[] firstInput, int[] secondInput) {
        for (int value : firstInput) {
            trie.addInteger(value, getLargestFactorOfTen(value));
        }

        int longestCommonPrefix = 0;
        for (int value : secondInput) {
            longestCommonPrefix = Math.max(longestCommonPrefix, trie.findLongestCommonPrefix(value, getLargestFactorOfTen(value)));
        }
        return longestCommonPrefix;
    }

    private int getLargestFactorOfTen(int value) {
        int factor = 1;
        while (value / factor > 0) {
            factor *= 10;
        }
        return factor / 10;
    }
}

class TrieNode {

    private static final int NUMBER_OF_DIGITS = 10;
    TrieNode[] branches = new TrieNode[NUMBER_OF_DIGITS];
}

class Trie {

    private final TrieNode root = new TrieNode();

    void addInteger(int value, int factor) {
        TrieNode current = root;

        while (factor > 0) {
            int digit = value / factor;
            if (current.branches[digit] == null) {
                current.branches[digit] = new TrieNode();
            }

            current = current.branches[digit];
            value %= factor;
            factor /= 10;
        }
    }

    int findLongestCommonPrefix(int value, int factor) {
        TrieNode current = root;
        int longestCommonPrefix = 0;

        while (factor > 0) {
            int digit = value / factor;
            if (current.branches[digit] == null) {
                break;
            }

            ++longestCommonPrefix;
            current = current.branches[digit];
            value %= factor;
            factor /= 10;
        }

        return longestCommonPrefix;
    }
}
