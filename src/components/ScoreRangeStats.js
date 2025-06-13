import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const ScoreRangeStats = ({ stats }) => {
  const calculateDistribution = (students) => {
    const distribution = {
      'Giỏi (25-30)': 0,
      'Khá (17-24)': 0,
      'Trung bình (11-16)': 0,
      'Yếu (<11)': 0,
    };

    students.forEach(student => {
      const score = parseFloat(student.tong_diem);
      if (score >= 25) distribution['Giỏi (25-30)']++;
      else if (score >= 17) distribution['Khá (17-24)']++;
      else if (score >= 11) distribution['Trung bình (11-16)']++;
      else distribution['Yếu (<11)']++;
    });

    return distribution;
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* Summary */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Kết quả thống kê: {stats.range}
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" gutterBottom>
                {stats.count || 0}
              </Typography>
              <Typography color="text.secondary">Số thí sinh</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" gutterBottom>
                {stats.students && stats.students.length > 0 ? 
                  (stats.students.reduce((sum, s) => sum + parseFloat(s.tong_diem), 0) / stats.students.length).toFixed(2) : 
                  'N/A'
                }
              </Typography>
              <Typography color="text.secondary">Điểm trung bình</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" gutterBottom>
                {stats.max_score || 'N/A'}
              </Typography>
              <Typography color="text.secondary">Điểm cao nhất</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main" gutterBottom>
                {stats.min_score || 'N/A'}
              </Typography>
              <Typography color="text.secondary">Điểm thấp nhất</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Distribution */}
        {stats.students && stats.students.length > 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Phân bố xếp loại
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(calculateDistribution(stats.students)).map(([grade, count]) => (
                <Grid item xs={6} md={3} key={grade}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      {count}
                    </Typography>
                    <Typography color="text.secondary">{grade}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ScoreRangeStats; 