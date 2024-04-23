class MarkovMachine {
    constructor(text) {
      this.words = text.split(/[ \r\n]+/).filter(Boolean);
      this.makeChains();
    }
  
    makeChains() {
      this.chains = this.words.reduce((chains, word, i, words) => {
        let nextWord = words[i + 1] || null;
        chains[word] = chains[word] || [];
        chains[word].push(nextWord);
        return chains;
      }, {});
    }
  
    static choice(ar) {
      return ar[Math.floor(Math.random() * ar.length)];
    }
  
    makeText(numWords = 100) {
      let keys = Object.keys(this.chains);
      let key = MarkovMachine.choice(keys);
      let out = [];
  
      while (out.length < numWords && key !== null) {
        out.push(key);
        key = MarkovMachine.choice(this.chains[key]);
      }
  
      return out.join(" ");
    }
  }
  
  module.exports = MarkovMachine;
  