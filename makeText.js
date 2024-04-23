const fs = require("fs");
const axios = require("axios");
const MarkovMachine = require("./markov");

async function readInput(input) {
  try {
    if (input.startsWith("http")) {
      const response = await axios.get(input);
      return response.data;
    } else {
      return fs.promises.readFile(input, "utf8");
    }
  } catch (error) {
    throw new Error(`Error reading input: ${error.message}`);
  }
}

async function generateText(input) {
  const text = await readInput(input);
  const markovMachine = new MarkovMachine(text);
  return markovMachine.makeText();
}

const [,, method, path] = process.argv;

(async function() {
  try {
    const text = await generateText(path);
    console.log(text);
  } catch (error) {
    console.error(`Error generating text: ${error.message}`);
    process.exit(1);
  }
})();

