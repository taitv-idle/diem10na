import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import StudentCard from '../components/StudentCard';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentLookup = () => {
  const [sbd, setSbd] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!sbd.trim()) {
      setError('Vui lòng nhập số báo danh');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setStudent(null);
      setHasSearched(true);

      const response = await apiService.getStudentByID(sbd.trim());
      
      if (response.success) {
        setStudent(response.data);
      } else {
        setError(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Không tìm thấy thí sinh với số báo danh này');
      } else {
        setError('Có lỗi xảy ra khi tra cứu. Vui lòng thử lại.');
      }
      console.error('Error searching student:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSbd(e.target.value);
    if (error && !hasSearched) {
      setError(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tra cứu điểm thi
        </h1>
        <p className="text-gray-600">
          Nhập số báo danh để xem kết quả thi của bạn
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg card-shadow p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="sbd" className="block text-sm font-medium text-gray-700 mb-2">
              Số báo danh
            </label>
            <div className="relative">
              <input
                type="text"
                id="sbd"
                value={sbd}
                onChange={handleInputChange}
                placeholder="Nhập số báo danh (VD: 0100001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !sbd.trim()}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Đang tìm kiếm...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Tra cứu
              </>
            )}
          </button>
        </form>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Hướng dẫn:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Nhập chính xác số báo danh như trên giấy báo dự thi</li>
            <li>• Số báo danh thường có 7 chữ số (VD: 0100001)</li>
            <li>• Không có khoảng trắng hoặc ký tự đặc biệt</li>
          </ul>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <LoadingSpinner text="Đang tìm kiếm thông tin thí sinh..." />
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {student && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Kết quả tra cứu
          </h2>
          <StudentCard student={student} />
          
          {/* Success message */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-1 rounded-full mr-3">
                <Search className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-green-700 font-medium">Tìm thấy thông tin thí sinh!</p>
                <p className="text-green-600 text-sm">
                  Dữ liệu được cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No results */}
      {hasSearched && !loading && !student && !error && (
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy kết quả
          </h3>
          <p className="text-gray-600">
            Vui lòng kiểm tra lại số báo danh và thử lại
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentLookup; 