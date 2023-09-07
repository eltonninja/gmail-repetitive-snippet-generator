const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

function tokenizeText(text) {
  return tokenizer.tokenize(text);
}

function generateNgrams(tokens, n) {
  return natural.NGrams.ngrams(tokens, n);
}

function computeFrequency(ngrams) {
  const frequencyMap = {};
  for (const ngram of ngrams) {
    const key = ngram.join(" ");
    frequencyMap[key] = (frequencyMap[key] || 0) + 1;
  }
  return frequencyMap;
}

function getTopSnippets(frequencyMap, topN) {
  const sorted = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, topN);
}

function extractSnippets(messages) {
  let allTokens = [];
  for (const message of messages) {
    const tokens = tokenizeText(message);
    allTokens = allTokens.concat(tokens);
  }

  const result = [];
  for (let i = 3; i < 10; i++) {
    const ngrams = generateNgrams(allTokens, i); // Example: 5-word combinations.
    const frequencyMap = computeFrequency(ngrams);
    const topSnippets = getTopSnippets(frequencyMap, 10); // Example: Top 10 snippets.
    result.push(...topSnippets.map(([snippet]) => snippet));
  }

  return result;
}

module.exports = {
  extractSnippets,
};
