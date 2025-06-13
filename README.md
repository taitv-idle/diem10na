# 🎓 Ứng dụng Tra cứu Điểm thi Lớp 10

Ứng dụng web hiện đại để tra cứu điểm thi vào lớp 10, được xây dựng với React và Tailwind CSS.

## ✨ Tính năng

- 🔍 **Tra cứu điểm thi** - Tìm kiếm điểm thi bằng số báo danh
- 👥 **Tìm kiếm hàng loạt** - Tra cứu nhiều thí sinh cùng lúc
- 📊 **Thống kê chi tiết** - Phân tích theo khoảng điểm và hội đồng thi
- 🏆 **Bảng xếp hạng** - Top điểm cao nhất
- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **Giao diện hiện đại** - Thiết kế đẹp và thân thiện

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 14.0.0
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone <repository-url>
cd diem-thi-client
```

### Bước 2: Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Bước 3: Cấu hình API
Tạo file `.env` trong thư mục gốc:
```env
REACT_APP_API_URL=http://localhost:3000
```

### Bước 4: Chạy ứng dụng
```bash
npm start
# hoặc
yarn start
```

Ứng dụng sẽ chạy tại `http://localhost:3001`

## 🏗️ Build cho production

```bash
npm run build
# hoặc
yarn build
```

## 📖 API Documentation

Ứng dụng sử dụng các API endpoints sau:

### 1. Metadata
- **GET** `/api/metadata` - Lấy thông tin tổng quan

### 2. Tra cứu điểm
- **GET** `/api/student/:sbd` - Tra cứu theo số báo danh
- **POST** `/api/students/search` - Tìm kiếm nhiều thí sinh

### 3. Thống kê
- **GET** `/api/statistics/score-range` - Thống kê theo khoảng điểm  
- **GET** `/api/statistics/by-council/:ma_hd` - Thống kê theo hội đồng

### 4. Top điểm cao
- **GET** `/api/top-scores` - Lấy danh sách điểm cao nhất

## 🎯 Cách sử dụng

### Tra cứu điểm thi
1. Vào trang "Tra cứu điểm"
2. Nhập số báo danh (7 chữ số)
3. Nhấn "Tra cứu" để xem kết quả

### Tìm kiếm hàng loạt
1. Vào trang "Tìm kiếm nhóm"
2. Nhập danh sách số báo danh (từng dòng hoặc phân cách bằng dấu phẩy)
3. Nhấn "Tìm kiếm tất cả"
4. Xuất kết quả ra file CSV nếu cần

### Xem thống kê
1. Vào trang "Thống kê"
2. Chọn tab "Thống kê theo điểm" hoặc "Thống kê theo hội đồng"
3. Nhập thông tin cần thiết và nhấn "Thống kê"

### Xem top điểm cao
1. Vào trang "Top điểm cao"
2. Chọn số lượng hiển thị (10, 25, 50, 100)
3. Xem bảng xếp hạng và thống kê

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router Dom

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── Header.js       # Header navigation
│   ├── StudentCard.js  # Card hiển thị thông tin thí sinh
│   └── LoadingSpinner.js # Component loading
├── pages/              # Các trang chính
│   ├── Home.js         # Trang chủ
│   ├── StudentLookup.js # Tra cứu điểm
│   ├── BulkSearch.js   # Tìm kiếm hàng loạt
│   ├── Statistics.js   # Thống kê
│   └── TopScores.js    # Top điểm cao
├── services/           # API services
│   └── api.js          # Axios configuration và API calls
├── App.js              # Main App component
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🎨 Thiết kế & UX

- **Color Scheme**: Blue primary với accents màu đa dạng
- **Typography**: Inter font family
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions và micro-interactions
- **Accessibility**: ARIA labels và keyboard navigation

## 🔧 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa file `tailwind.config.js` để thay đổi color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Thay đổi màu chính tại đây
      }
    }
  }
}
```

### Thêm tính năng mới
1. Tạo component trong thư mục `components/`
2. Thêm route mới trong `App.js`
3. Cập nhật navigation trong `Header.js`

## 🐛 Troubleshooting

### Lỗi kết nối API
- Kiểm tra URL API trong file `.env`
- Đảm bảo backend server đang chạy
- Kiểm tra CORS configuration

### Lỗi build
- Xóa `node_modules` và chạy `npm install` lại
- Kiểm tra version Node.js
- Clear cache: `npm start -- --reset-cache`

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📞 Liên hệ

- Email: support@example.com
- Website: https://example.com

---

**Được phát triển với ❤️ cho việc tra cứu điểm thi lớp 10** 