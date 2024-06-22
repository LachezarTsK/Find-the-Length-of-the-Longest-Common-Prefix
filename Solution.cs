
using System;

public class Solution
{
    private readonly Trie trie = new Trie();

    public int LongestCommonPrefix(int[] firstInput, int[] secondInput)
    {
        foreach (int value in firstInput)
        {
            trie.AddInteger(value, GetLargestFactorOfTen(value));
        }

        int longestCommonPrefix = 0;
        foreach (int value in secondInput)
        {
            longestCommonPrefix = Math.Max(longestCommonPrefix, trie.FindLongestCommonPrefix(value, GetLargestFactorOfTen(value)));
        }
        return longestCommonPrefix;
    }

    private int GetLargestFactorOfTen(int value)
    {
        int factor = 1;
        while (value / factor > 0)
        {
            factor *= 10;
        }
        return factor / 10;
    }
}

class TrieNode
{
    private static readonly int NUMBER_OF_DIGITS = 10;
    public TrieNode[] branches = new TrieNode[NUMBER_OF_DIGITS];
}

class Trie
{
    private readonly TrieNode root = new TrieNode();

    public void AddInteger(int value, int factor)
    {
        TrieNode current = root;

        while (factor > 0)
        {
            int digit = value / factor;
            if (current.branches[digit] == null)
            {
                current.branches[digit] = new TrieNode();
            }

            current = current.branches[digit];
            value %= factor;
            factor /= 10;
        }
    }

    public int FindLongestCommonPrefix(int value, int factor)
    {
        TrieNode current = root;
        int longestCommonPrefix = 0;

        while (factor > 0)
        {
            int digit = value / factor;
            if (current.branches[digit] == null)
            {
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
