import React from 'react';
import { User, MapPin, Award, Calendar } from 'lucide-react';

const StudentCard = ({ student, showDetails = true }) => {
  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 25) return 'text-green-600 bg-green-50';
    if (numScore >= 17) return 'text-blue-600 bg-blue-50';
    if (numScore >= 11) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getGradeLevel = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 25) return 'Giỏi';
    if (numScore >= 17) return 'Khá';
    if (numScore >= 11) return 'Trung bình';
    return 'Yếu';
  };

  return (
    <div className="bg-white rounded-lg card-shadow p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-2 rounded-full">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              SBD: {student.sbd}
            </h3>
            {student.ho_ten && (
              <p className="text-gray-600">{student.ho_ten}</p>
            )}
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(student.tong_diem)}`}>
          {student.tong_diem} điểm
        </div>
      </div>

      {showDetails && (
        <>
          {/* Score breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Toán</p>
              <p className="text-lg font-semibold text-gray-900">{student.diem_toan || 'N/A'}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Văn</p>
              <p className="text-lg font-semibold text-gray-900">{student.diem_van || 'N/A'}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Ngoại Ngữ</p>
              <p className="text-lg font-semibold text-gray-900">{student.diem_nn || 'N/A'}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Tổng</p>
              <p className="text-xl font-bold text-primary-600">{student.tong_diem}</p>
            </div>
          </div>

          {/* Grade level */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Xếp loại: <span className="text-primary-600">{getGradeLevel(student.tong_diem)}</span>
              </span>
            </div>
          </div>

          {/* Additional info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            {student.ma_hd && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Hội đồng: <span className="font-medium">{student.ma_hd}</span>
                </span>
              </div>
            )}
            {student.ngay_sinh && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Ngày sinh: <span className="font-medium">{student.ngay_sinh}</span>
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentCard; 