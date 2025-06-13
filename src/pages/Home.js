import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, BarChart3, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response = await apiService.getMetadata();
        if (response.success) {
          setMetadata(response.data);
        }
      } catch (err) {
        setError('Không thể tải thông tin tổng quan');
        console.error('Error fetching metadata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  const features = [
    {
      icon: Search,
      title: 'Tra cứu điểm thi',
      description: 'Tra cứu điểm thi nhanh chóng bằng số báo danh',
      href: '/lookup',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Tìm kiếm nhóm',
      description: 'Tìm kiếm điểm của nhiều thí sinh cùng lúc',
      href: '/bulk-search',
      color: 'bg-green-500'
    },
    {
      icon: BarChart3,
      title: 'Thống kê',
      description: 'Xem thống kê điểm theo khoảng điểm và hội đồng',
      href: '/statistics',
      color: 'bg-purple-500'
    },
    {
      icon: Trophy,
      title: 'Top điểm cao',
      description: 'Xem danh sách thí sinh có điểm cao nhất',
      href: '/top-scores',
      color: 'bg-yellow-500'
    }
  ];

  const highlights = [
    'Tra cứu điểm thi nhanh chóng và chính xác',
    'Giao diện thân thiện, dễ sử dụng',
    'Thống kê chi tiết theo nhiều tiêu chí',
    'Hiển thị top điểm cao nhất',
    'Hỗ trợ tìm kiếm hàng loạt'
  ];

  if (loading) {
    return <LoadingSpinner size="lg" text="Đang tải thông tin..." />;
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Tra cứu điểm thi lớp 10 tỉnh
            <span className="text-primary-600"> Nghệ An</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hệ thống tra cứu điểm thi vào lớp 10 nhanh chóng, chính xác và tiện lợi. 
            Tìm kiếm điểm thi của bạn chỉ với vài cú click.
          </p>
          <Link
            to="/lookup"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Bắt đầu tra cứu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      {metadata && (
        <section className="bg-white rounded-lg card-shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Thông tin tổng quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {metadata.total_students?.toLocaleString() || 'N/A'}
              </div>
              <div className="text-gray-600">Tổng số thí sinh</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {metadata.avg_score?.toFixed(2) || 'N/A'}
              </div>
              <div className="text-gray-600">Điểm trung bình</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {metadata.max_score || 'N/A'}
              </div>
              <div className="text-gray-600">Điểm cao nhất</div>
            </div>
          </div>
        </section>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Tính năng chính
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.href}
                className="bg-white rounded-lg card-shadow p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className={`${feature.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                  Khám phá
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Tại sao chọn hệ thống của chúng tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Sẵn sàng tra cứu điểm thi?
        </h2>
        <p className="text-gray-600 mb-8">
          Nhập số báo danh để xem kết quả thi của bạn ngay bây giờ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/lookup"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Search className="mr-2 h-5 w-5" />
            Tra cứu ngay
          </Link>
          <Link
            to="/top-scores"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg border border-primary-600 hover:bg-primary-50 transition-colors"
          >
            <Trophy className="mr-2 h-5 w-5" />
            Xem top điểm cao
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 