
import kotlin.math.max

class Solution {

    private val trie = Trie()

    fun longestCommonPrefix(firstInput: IntArray, secondInput: IntArray): Int {
        for (value in firstInput) {
            trie.addInteger(value, getLargestFactorOfTen(value))
        }

        var longestCommonPrefix = 0
        for (value in secondInput) {
            longestCommonPrefix =
                max(longestCommonPrefix, trie.findLongestCommonPrefix(value, getLargestFactorOfTen(value)))
        }
        return longestCommonPrefix
    }

    private fun getLargestFactorOfTen(value: Int): Int {
        var factor = 1
        while (value / factor > 0) {
            factor *= 10
        }
        return factor / 10
    }
}

class TrieNode {

    companion object {
        const val NUMBER_OF_DIGITS = 10
    }

    val branches = arrayOfNulls<TrieNode>(NUMBER_OF_DIGITS)
}

class Trie {

    private val root = TrieNode()

    fun addInteger(value: Int, factor: Int) {
        var current = root
        // as of June 2024, in Kotlin, primitive parameters can not be changed,
        // therefore the reassignment of 'value' and 'factor'
        var value = value
        var factor = factor

        while (factor > 0) {
            val digit = value / factor
            if (current.branches[digit] == null) {
                current.branches[digit] = TrieNode()
            }

            current = current.branches[digit]!!
            value %= factor
            factor /= 10
        }
    }

    fun findLongestCommonPrefix(value: Int, factor: Int): Int {
        var current = root
        var longestCommonPrefix = 0
        // as of June 2024, in Kotlin, primitive parameters can not be changed,
        // therefore the reassignment of 'value' and 'factor'
        var value = value
        var factor = factor

        while (factor > 0) {
            val digit = value / factor
            if (current.branches[digit] == null) {
                break
            }

            ++longestCommonPrefix
            current = current.branches[digit]!!
            value %= factor
            factor /= 10
        }

        return longestCommonPrefix
    }
}
