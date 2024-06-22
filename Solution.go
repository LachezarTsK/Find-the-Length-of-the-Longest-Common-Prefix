
package main

import "fmt"

const NUMBER_OF_DIGITS = 10

func longestCommonPrefix(firstInput []int, secondInput []int) int {
    trie := Trie{createTrieNode(), 0}
    for _, value := range firstInput {
        trie.addInteger(value, getLargestFactorOfTen(value))
    }

    longestCommonPrefix := 0
    for _, value := range secondInput {
        longestCommonPrefix = max(longestCommonPrefix, trie.findLongestCommonPrefix(value, getLargestFactorOfTen(value)))
    }
    return longestCommonPrefix
}

func getLargestFactorOfTen(value int) int {
    var factor = 1
    for value/factor > 0 {
        factor *= 10
    }
    return factor / 10
}

type TrieNode struct {
    branches [NUMBER_OF_DIGITS]*TrieNode
}

type Trie struct {
    root                   *TrieNode
    countPrefixSuffixPairs int
}

func createTrieNode() *TrieNode {
    trieNode := &TrieNode{
        branches: [NUMBER_OF_DIGITS]*TrieNode{},
    }
    return trieNode
}

func (trie *Trie) addInteger(value int, factor int) {
    var current = trie.root

    for factor > 0 {
        var digit = value / factor
        if current.branches[digit] == nil {
            current.branches[digit] = createTrieNode()
        }

        current = current.branches[digit]
        value %= factor
        factor /= 10
    }
}

func (trie *Trie) findLongestCommonPrefix(value int, factor int) int {
    var current = trie.root
    var longestCommonPrefix = 0

    for factor > 0 {
        var digit = value / factor
        if current.branches[digit] == nil {
            break
        }

        longestCommonPrefix++
        current = current.branches[digit]
        value %= factor
        factor /= 10
    }

    return longestCommonPrefix
}
