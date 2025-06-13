const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🔍 Testing API...\n');

  try {
    // Test metadata
    console.log('1. Testing metadata...');
    const metadata = await axios.get(`${API_BASE_URL}/api/metadata`);
    console.log('✅ Metadata:', metadata.data);
    console.log('');

    // Test council stats với hội đồng "14"
    console.log('2. Testing council stats (HD: 14)...');
    const councilStats = await axios.get(`${API_BASE_URL}/api/statistics/by-council/14`);
    console.log('✅ Council Stats Response:');
    console.log('- Success:', councilStats.data.success);
    console.log('- Data keys:', Object.keys(councilStats.data.data));
    console.log('- Council Code:', councilStats.data.data.ma_hd);
    console.log('- Total Students:', councilStats.data.data.total_students);
    console.log('- Avg Score:', councilStats.data.data.avg_score);
    console.log('- Max Score:', councilStats.data.data.max_score);
    console.log('- Min Score:', councilStats.data.data.min_score);
    console.log('- Students Length:', councilStats.data.data.students?.length);
    console.log('');

    // Test score range stats
    console.log('3. Testing score range stats (25-30)...');
    const rangeStats = await axios.get(`${API_BASE_URL}/api/statistics/score-range?min_score=25&max_score=30`);
    console.log('✅ Range Stats Response:');
    console.log('- Success:', rangeStats.data.success);
    console.log('- Data keys:', Object.keys(rangeStats.data.data));
    console.log('- Range:', rangeStats.data.data.range);
    console.log('- Count:', rangeStats.data.data.count);
    console.log('- Students Length:', rangeStats.data.data.students?.length);
    console.log('');

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI(); 