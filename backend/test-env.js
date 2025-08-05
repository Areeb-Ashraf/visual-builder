// Simple test script to check environment variable loading
require('dotenv').config();

console.log('🧪 Testing Environment Variables...\n');

console.log('📂 Current working directory:', process.cwd());
console.log('📄 .env file exists:', require('fs').existsSync('.env'));

console.log('\n🔍 Environment Variables:');
console.log('  OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Found (' + process.env.OPENAI_API_KEY.length + ' chars)' : '❌ Not found');
console.log('  ELEVENLABS_API_KEY:', process.env.ELEVENLABS_API_KEY ? '✅ Found (' + process.env.ELEVENLABS_API_KEY.length + ' chars)' : '❌ Not found');
console.log('  PORT:', process.env.PORT ? '✅ Found (' + process.env.PORT + ')' : '❌ Not found');

console.log('\n🔑 Raw Values (first/last 4 chars):');
if (process.env.OPENAI_API_KEY) {
  const openaiKey = process.env.OPENAI_API_KEY;
  console.log('  OPENAI_API_KEY:', openaiKey.substring(0, 4) + '...' + openaiKey.substring(openaiKey.length - 4));
}
if (process.env.ELEVENLABS_API_KEY) {
  const elevenKey = process.env.ELEVENLABS_API_KEY;
  console.log('  ELEVENLABS_API_KEY:', elevenKey.substring(0, 4) + '...' + elevenKey.substring(elevenKey.length - 4));
}

console.log('\n🔍 .env file contents:');
try {
  const envContent = require('fs').readFileSync('.env', 'utf8');
  console.log(envContent);
} catch (err) {
  console.log('❌ Error reading .env file:', err.message);
}