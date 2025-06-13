import React, { useState } from 'react';
import { Search, Users, Download, AlertCircle, Plus, X } from 'lucide-react';
import { apiService } from '../services/api';
import StudentCard from '../components/StudentCard';
import LoadingSpinner from '../components/LoadingSpinner';

const BulkSearch = () => {
  const [sbdList, setSbdList] = useState(['']);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (index, value) => {
    const newList = [...sbdList];
    newList[index] = value;
    setSbdList(newList);
  };

  const addInput = () => {
    setSbdList([...sbdList, '']);
  };

  const removeInput = (index) => {
    if (sbdList.length > 1) {
      const newList = sbdList.filter((_, i) => i !== index);
      setSbdList(newList);
    }
  };

  const handleTextareaChange = (value) => {
    // Split by newlines, commas, or spaces and filter out empty values
    const sbds = value
      .split(/[\n,\s]+/)
      .map(sbd => sbd.trim())
      .filter(sbd => sbd);
    
    // Ensure at least one empty input
    setSbdList(sbds.length > 0 ? sbds : ['']);
  };

  const handleSearch = async () => {
    const validSbds = sbdList
      .map(sbd => sbd.trim())
      .filter(sbd => sbd);

    if (validSbds.length === 0) {
      setError('Vui lòng nhập ít nhất một số báo danh');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults(null);

      const response = await apiService.searchStudents(validSbds);
      
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.');
      console.error('Error bulk searching:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    if (!results || !results.found) return;

    const csvContent = [
      ['SBD', 'Họ tên', 'Toán', 'Văn', 'Anh', 'Tổng điểm', 'Mã hội đồng'],
      ...results.found.map(student => [
        student.sbd,
        student.ho_ten || '',
        student.diem_toan || '',
        student.diem_van || '',
        student.diem_nn || '',
        student.tong_diem || '',
        student.ma_hd || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ket-qua-tra-cuu-${new Date().toLocaleDateString('vi-VN')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tìm kiếm hàng loạt
        </h1>
        <p className="text-gray-600">
          Tra cứu điểm thi của nhiều thí sinh cùng lúc
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg card-shadow p-6 mb-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nhập danh sách số báo danh
          </h3>
          
          {/* Option 1: Individual inputs */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cách 1: Nhập từng số báo danh
            </label>
            <div className="space-y-2">
              {sbdList.map((sbd, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={sbd}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={`Số báo danh ${index + 1}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                  {sbdList.length > 1 && (
                    <button
                      onClick={() => removeInput(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addInput}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
              >
                <Plus className="h-4 w-4" />
                <span>Thêm số báo danh</span>
              </button>
            </div>
          </div>

          {/* Option 2: Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cách 2: Dán danh sách (mỗi số báo danh một dòng hoặc cách nhau bằng dấu phẩy)
            </label>
            <textarea
              rows={4}
              placeholder="0100001&#10;0100002&#10;0100003&#10;hoặc: 0100001, 0100002, 0100003"
              onChange={(e) => handleTextareaChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading || sbdList.every(sbd => !sbd.trim())}
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
              Tìm kiếm tất cả
            </>
          )}
        </button>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Lưu ý:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Có thể tìm kiếm tối đa 50 số báo danh cùng lúc</li>
            <li>• Mỗi số báo danh cần được nhập chính xác</li>
            <li>• Kết quả sẽ hiển thị cả số báo danh tìm thấy và không tìm thấy</li>
            <li>• Có thể xuất kết quả ra file CSV để lưu trữ</li>
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
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg card-shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Kết quả tìm kiếm
              </h2>
              {results.found && results.found.length > 0 && (
                <button
                  onClick={exportResults}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Xuất CSV</span>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {results.found?.length || 0}
                </div>
                <div className="text-gray-600">Tìm thấy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {results.notFound?.length || 0}
                </div>
                <div className="text-gray-600">Không tìm thấy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {results.total || 0}
                </div>
                <div className="text-gray-600">Tổng kết quả</div>
              </div>
            </div>
          </div>

          {/* Found Students */}
          {results.found && results.found.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600" />
                Thí sinh tìm thấy ({results.found.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.found.map((student, index) => (
                  <StudentCard key={index} student={student} />
                ))}
              </div>
            </div>
          )}

          {/* Not Found */}
          {results.notFound && results.notFound.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                Số báo danh không tìm thấy ({results.notFound.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {results.notFound.map((sbd, index) => (
                  <div key={index} className="bg-yellow-100 px-3 py-1 rounded text-yellow-800 text-sm">
                    {sbd}
                  </div>
                ))}
              </div>
              <p className="text-yellow-700 text-sm mt-4">
                Vui lòng kiểm tra lại các số báo danh trên và thử lại.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkSearch; 