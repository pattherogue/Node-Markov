class MarkovMachine {
    constructor(text) {
      this.words = text.split(/[ \r\n]+/).filter(Boolean);
      this.makeChains();
    }
  
    makeChains() {
      this.chains = this.words.reduce((chains, word, i, words) => {
        let nextWord = words[i + 1] || null;
        let bigram = `${word} ${nextWord || ""}`;
        let followingWord = words[i + 2] || null;
        chains[bigram] = chains[bigram] || [];
        chains[bigram].push(followingWord);
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
  
      while (out.length <= numWords && key !== null) {
        let [w1, w2] = key.split(" ");
        out.push(w1);
        key = `${w2} ${MarkovMachine.choice(this.chains[key])}`;
      }
  
      return out.join(" ");
    }
  }
  
  module.exports = MarkovMachine;
  