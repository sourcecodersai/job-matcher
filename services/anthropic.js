const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function analyzeJobDescription(description) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Analyze this job description and extract key requirements with importance weights (1-5):
        ${description}`
      }]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw new Error('Failed to analyze job description');
  }
}

async function matchCandidate(criteria, resume) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Compare this resume against these job criteria and provide a match score and analysis:
        Criteria: ${JSON.stringify(criteria)}
        Resume: ${resume}`
      }]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Anthropic API error:', error);
    throw new Error('Failed to analyze resume');
  }
}

module.exports = {
  analyzeJobDescription,
  matchCandidate
};