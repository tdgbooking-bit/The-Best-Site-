// Example integration of OpenAI Codex for autocomplete
// Requires your OpenAI API key

const { Codex } = require('@openai/codex');

const codex = new Codex({
  apiKey: process.env.OPENAI_API_KEY // Set your API key in environment variables
});

async function getAutocomplete(prompt) {
  try {
    const result = await codex.complete({
      prompt,
      maxTokens: 50,
      stop: ['\n']
    });
    console.log('Autocomplete result:', result.choices[0].text);
    return result.choices[0].text;
  } catch (error) {
    console.error('Codex error:', error);
    return '';
  }
}

// Example usage:
getAutocomplete('function add(a, b) {');
