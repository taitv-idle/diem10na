import React, { useState } from 'react';
import { BarChart3, Users, MapPin, Search } from 'lucide-react';
import { apiService } from '../services/api';
import StudentCard from '../components/StudentCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('score-range');
  const [scoreRange, setScoreRange] = useState({ min: 0, max: 30 });
  const [councilCode, setCouncilCode] = useState('');
  const [rangeResults, setRangeResults] = useState(null);
  const [councilResults, setCouncilResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScoreRangeSearch = async () => {
    if (scoreRange.min < 0 || scoreRange.max > 30 || scoreRange.min > scoreRange.max) {
      setError('Khoảng điểm không hợp lệ. Vui lòng nhập từ 0-30 và min <= max');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setRangeResults(null);

      const response = await apiService.getScoreRangeStats(scoreRange.min, scoreRange.max);
      
      if (response.success) {
        setRangeResults(response.data);
      } else {
        setError(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi thống kê. Vui lòng thử lại.');
      console.error('Error getting score range stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCouncilSearch = async () => {
    if (!councilCode.trim()) {
      setError('Vui lòng nhập mã hội đồng');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setCouncilResults(null);

      const response = await apiService.getCouncilStats(councilCode.trim());
      
      if (response.success) {
        setCouncilResults(response.data);
      } else {
        setError(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Không tìm thấy hội đồng với mã này');
      } else {
        setError('Có lỗi xảy ra khi thống kê. Vui lòng thử lại.');
      }
      console.error('Error getting council stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistribution = (students) => {
    const distribution = {
      'Giỏi (25-30)': 0,
      'Khá (17-24)': 0,
      'Trung bình (11-16)': 0,
      'Yếu (<11)': 0,
    };

    students.forEach(student => {
      const score = student.tong_diem;
      if (score >= 25) distribution['Giỏi (25-30)']++;
      else if (score >= 17) distribution['Khá (17-24)']++;
      else if (score >= 11) distribution['Trung bình (11-16)']++;
      else distribution['Yếu (<11)']++;
    });

    return distribution;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thống kê điểm thi
        </h1>
        <p className="text-gray-600">
          Xem thống kê chi tiết theo khoảng điểm và hội đồng thi
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg card-shadow mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('score-range')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'score-range'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Thống kê theo điểm</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('council')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'council'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Thống kê theo hội đồng</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'score-range' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thống kê theo khoảng điểm
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điểm tối thiểu
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={scoreRange.min}
                    onChange={(e) => setScoreRange({ ...scoreRange, min: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điểm tối đa
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={scoreRange.max}
                    onChange={(e) => setScoreRange({ ...scoreRange, max: parseFloat(e.target.value) || 30 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleScoreRangeSearch}
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="loading-spinner mr-2"></div>
                    ) : (
                      <Search className="mr-2 h-4 w-4" />
                    )}
                    Thống kê
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'council' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thống kê theo hội đồng thi
              </h3>
              
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã hội đồng
                  </label>
                  <input
                    type="text"
                    value={councilCode}
                    onChange={(e) => setCouncilCode(e.target.value)}
                    placeholder="Nhập mã hội đồng (VD: 18)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleCouncilSearch}
                    disabled={loading || !councilCode.trim()}
                    className="bg-primary-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center"
                  >
                    {loading ? (
                      <div className="loading-spinner mr-2"></div>
                    ) : (
                      <Search className="mr-2 h-4 w-4" />
                    )}
                    Thống kê
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <LoadingSpinner text="Đang tính toán thống kê..." />
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Score Range Results */}
      {rangeResults && activeTab === 'score-range' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg card-shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Kết quả thống kê: {rangeResults.range}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {rangeResults.count || 0}
                </div>
                <div className="text-gray-600">Số thí sinh</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {rangeResults.students && rangeResults.students.length > 0 ? 
                    (rangeResults.students.reduce((sum, s) => sum + parseFloat(s.tong_diem), 0) / rangeResults.students.length).toFixed(2) : 
                    'N/A'
                  }
                </div>
                <div className="text-gray-600">Điểm trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {rangeResults.students && rangeResults.students.length > 0 ? 
                    Math.max(...rangeResults.students.map(s => parseFloat(s.tong_diem))).toFixed(1) : 
                    'N/A'
                  }
                </div>
                <div className="text-gray-600">Điểm cao nhất</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {rangeResults.students && rangeResults.students.length > 0 ? 
                    Math.min(...rangeResults.students.map(s => parseFloat(s.tong_diem))).toFixed(1) : 
                    'N/A'
                  }
                </div>
                <div className="text-gray-600">Điểm thấp nhất</div>
              </div>
            </div>

            {/* Distribution */}
            {rangeResults.students && rangeResults.students.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố xếp loại</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(calculateDistribution(rangeResults.students)).map(([grade, count]) => (
                    <div key={grade} className="text-center">
                      <div className="text-xl font-bold text-gray-900">{count}</div>
                      <div className="text-sm text-gray-600">{grade}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Students List */}
          {rangeResults.students && rangeResults.students.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Danh sách thí sinh ({rangeResults.count || 0})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rangeResults.students.slice(0, 12).map((student, index) => (
                  <StudentCard key={index} student={student} showDetails={false} />
                ))}
              </div>
              {rangeResults.students.length > 12 && (
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Và {rangeResults.students.length - 12} thí sinh khác...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Council Results */}
      {councilResults && activeTab === 'council' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg card-shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Thống kê hội đồng: {councilResults.ma_hd}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {councilResults.total_students || 0}
                </div>
                <div className="text-gray-600">Tổng thí sinh</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {councilResults.avg_score || 'N/A'}
                </div>
                <div className="text-gray-600">Điểm trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {councilResults.max_score || 'N/A'}
                </div>
                <div className="text-gray-600">Điểm cao nhất</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {councilResults.min_score || 'N/A'}
                </div>
                <div className="text-gray-600">Điểm thấp nhất</div>
              </div>
            </div>

            {/* Distribution */}
            {councilResults.students && councilResults.students.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố xếp loại</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(calculateDistribution(councilResults.students)).map(([grade, count]) => (
                    <div key={grade} className="text-center">
                      <div className="text-xl font-bold text-gray-900">{count}</div>
                      <div className="text-sm text-gray-600">{grade}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Students List */}
          {councilResults.students && councilResults.students.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Thí sinh trong hội đồng ({councilResults.total_students || 0})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {councilResults.students.slice(0, 12).map((student, index) => (
                  <StudentCard key={index} student={student} showDetails={false} />
                ))}
              </div>
              {councilResults.students.length > 12 && (
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Và {councilResults.students.length - 12} thí sinh khác...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Statistics; 