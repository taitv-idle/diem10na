import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Star, Crown } from 'lucide-react';
import { apiService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const TopScores = () => {
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getTopScores(limit);
        
        if (response.success) {
          setTopStudents(response.data.students);
        } else {
          setError(response.message || 'Có lỗi xảy ra');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.');
        console.error('Error fetching top scores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScores();
  }, [limit]);

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-5 w-5 text-blue-500" />;
    }
  };

  const getRankStyle = (index) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 1:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 28) return 'text-purple-600';
    if (numScore >= 25) return 'text-green-600';
    if (numScore >= 20) return 'text-blue-600';
    return 'text-gray-600';
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Đang tải bảng xếp hạng..." />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-full">
            <Trophy className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Bảng xếp hạng điểm cao
        </h1>
        <p className="text-gray-600">
          Danh sách thí sinh có điểm thi cao nhất
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg card-shadow p-6 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Số lượng hiển thị
          </h3>
          <div className="flex space-x-2">
            {[10, 25, 50, 100].map((value) => (
              <button
                key={value}
                onClick={() => setLimit(value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  limit === value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Top {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Top 3 Podium */}
      {topStudents.length >= 3 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🏆 Bục vinh danh 🏆
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2nd Place */}
            <div className="order-1 md:order-1">
              <div className="bg-white rounded-lg card-shadow p-6 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-gray-300 to-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="pt-4">
                  <Medal className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-gray-900">SBD: {topStudents[1].sbd}</h3>
                  {topStudents[1].ho_ten && (
                    <p className="text-gray-600 mb-2">{topStudents[1].ho_ten}</p>
                  )}
                  <div className="text-2xl font-bold text-gray-600 mb-2">
                    {topStudents[1].tong_diem} điểm
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Toán:</span>
                      <div className="font-semibold">{topStudents[1].diem_toan || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Văn:</span>
                      <div className="font-semibold">{topStudents[1].diem_van || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Anh:</span>
                      <div className="font-semibold">{topStudents[1].diem_nn || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="order-2 md:order-2">
              <div className="bg-white rounded-lg card-shadow p-6 text-center relative transform md:scale-110">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="pt-6">
                  <Crown className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-gray-900">SBD: {topStudents[0].sbd}</h3>
                  {topStudents[0].ho_ten && (
                    <p className="text-gray-600 mb-3">{topStudents[0].ho_ten}</p>
                  )}
                  <div className="text-3xl font-bold text-yellow-600 mb-3">
                    {topStudents[0].tong_diem} điểm
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Toán:</span>
                        <div className="font-semibold text-yellow-700">{topStudents[0].diem_toan || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Văn:</span>
                        <div className="font-semibold text-yellow-700">{topStudents[0].diem_van || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Anh:</span>
                        <div className="font-semibold text-yellow-700">{topStudents[0].diem_nn || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3">
              <div className="bg-white rounded-lg card-shadow p-6 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div className="pt-4">
                  <Award className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-gray-900">SBD: {topStudents[2].sbd}</h3>
                  {topStudents[2].ho_ten && (
                    <p className="text-gray-600 mb-2">{topStudents[2].ho_ten}</p>
                  )}
                  <div className="text-2xl font-bold text-amber-600 mb-2">
                    {topStudents[2].tong_diem} điểm
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Toán:</span>
                      <div className="font-semibold">{topStudents[2].diem_toan || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Văn:</span>
                      <div className="font-semibold">{topStudents[2].diem_van || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Anh:</span>
                      <div className="font-semibold">{topStudents[2].diem_nn || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Rankings */}
      {topStudents.length > 0 && (
        <div className="bg-white rounded-lg card-shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Bảng xếp hạng top {limit}
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {topStudents.map((student, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankStyle(index)}`}>
                    {index < 3 ? (
                      getRankIcon(index)
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>

                  {/* Student Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          SBD: {student.sbd}
                        </h3>
                        {student.ho_ten && (
                          <p className="text-gray-600">{student.ho_ten}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(student.tong_diem)}`}>
                          {student.tong_diem}
                        </div>
                        <div className="text-sm text-gray-500">điểm</div>
                      </div>
                    </div>

                    {/* Scores Breakdown */}
                    <div className="mt-3 grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Toán</div>
                        <div className="font-semibold">{student.diem_toan || 'N/A'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Văn</div>
                        <div className="font-semibold">{student.diem_van || 'N/A'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Anh</div>
                        <div className="font-semibold">{student.diem_nn || 'N/A'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Hội đồng</div>
                        <div className="font-semibold text-blue-600">{student.ma_hd || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      {topStudents.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Thống kê top {limit}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {topStudents[0]?.tong_diem || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Điểm cao nhất</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {topStudents.length > 0 ? 
                  (topStudents.reduce((sum, s) => sum + parseFloat(s.tong_diem), 0) / topStudents.length).toFixed(2) : 
                  'N/A'
                }
              </div>
              <div className="text-sm text-gray-600">Điểm trung bình</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {topStudents.filter(s => parseFloat(s.tong_diem) >= 25).length}
              </div>
              <div className="text-sm text-gray-600">Xuất sắc (≥25)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {topStudents.filter(s => parseFloat(s.tong_diem) >= 20).length}
              </div>
              <div className="text-sm text-gray-600">Giỏi (≥20)</div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && topStudents.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Chưa có dữ liệu
          </h3>
          <p className="text-gray-600">
            Hiện tại chưa có thông tin về bảng xếp hạng điểm cao.
          </p>
        </div>
      )}
    </div>
  );
};

export default TopScores; 