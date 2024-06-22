
#include <array>
#include <vector>
#include <memory>
using namespace std;

struct TrieNode {

    static const int NUMBER_OF_DIGITS = 10;
    array<TrieNode*, NUMBER_OF_DIGITS> branches{};
};

class Trie {

    TrieNode* root = new TrieNode();

public:
    void addInteger(int value, int factor) {
        TrieNode* current = root;

        while (factor > 0) {
            int digit = value / factor;
            if (current->branches[digit] == nullptr) {
                current->branches[digit] = new TrieNode();
            }

            current = current->branches[digit];
            value %= factor;
            factor /= 10;
        }
    }

    int findLongestCommonPrefix(int value, int factor) {
        TrieNode* current = root;
        int longestCommonPrefix = 0;

        while (factor > 0) {
            int digit = value / factor;
            if (current->branches[digit] == nullptr) {
                break;
            }

            ++longestCommonPrefix;
            current = current->branches[digit];
            value %= factor;
            factor /= 10;
        }

        return longestCommonPrefix;
    }
};

class Solution {

   Trie* trie = new Trie();

public:
    int longestCommonPrefix(const vector<int>& firstInput, const vector<int>& secondInput) const{
        for (int value : firstInput) {
            trie->addInteger(value, getLargestFactorOfTen(value));
        }

        int longestCommonPrefix = 0;
        for (int value : secondInput) {
            longestCommonPrefix = max(longestCommonPrefix, trie->findLongestCommonPrefix(value, getLargestFactorOfTen(value)));
        }
        return longestCommonPrefix;
    }

private:
    int getLargestFactorOfTen(int value) const{
        int factor = 1;
        while (value / factor > 0) {
            factor *= 10;
        }
        return factor / 10;
    }
};
