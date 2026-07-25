// ============================================================
//  DANH SÁCH SLIDE QUẢNG CÁO ĐẦU TRANG
// ============================================================
//
//  CÁCH THÊM SLIDE MỚI:
//    1. Copy file ảnh vào thư mục  images/
//    2. Thêm một khối { ... } vào mảng SLIDES bên dưới
//    3. Lưu file - không cần build lại, chỉ cần F5 trình duyệt
//
//  Thứ tự trong mảng = thứ tự chạy slide.
//
//  ---------- CÁC Ô CÓ THỂ ĐIỀN ----------
//
//    image  (bắt buộc) Đường dẫn ảnh, bắt đầu bằng /images/
//    alt    (bắt buộc) Mô tả ảnh - quan trọng cho SEO + người khiếm thị
//
//    badge  (tuỳ chọn) Nhãn nhỏ phía trên tiêu đề, vd: 'BÁN CHẠY'
//    title  (tuỳ chọn) TIÊU ĐỀ quảng cáo, hiện to bên cạnh ảnh
//    price  (tuỳ chọn) GIÁ, hiện nổi bật ngay dưới tiêu đề
//    text   (tuỳ chọn) NỘI DUNG NGẮN, nên 1-2 câu cho gọn
//    cta    (tuỳ chọn) Nút bấm: { label: 'chữ trên nút', href: 'liên kết' }
//
//  >> Slide CÓ title/text  -> ảnh nằm bên trái, chữ nằm bên phải
//  >> Slide KHÔNG có chữ   -> ảnh hiện to chính giữa (hợp với ảnh bảng giá)
//
//  ⚠ LƯU Ý VỀ GIÁ: giá ở đây được gõ tay, KHÔNG tự lấy từ database.
//    Khi đổi giá thì phải sửa cả 2 chỗ:  file này  +  data/products.js
//    Chạy `npm run check-prices` để kiểm tra 2 nơi có khớp nhau không.
//
export const SLIDES = [
  // ---------- Bảng giá tổng ----------
  {
    // Cố ý KHÔNG có title/text để ảnh bảng giá hiện to nhất.
    image: '/images/pata-menu-goc-2000.png',
    alt: 'Bảng giá tổng hợp đặc sản khô và rim PATA Đà Nẵng - mực khô, cá bò khô, cá chỉ vàng, cá cơm rim, mắm ruốc',
    isMenu: true
  },

  // ---------- Các món bán chạy ----------
  {
    image: '/images/muc-kho.jpg',
    alt: 'Mực khô loại 1 Đà Nẵng - đặc sản khô PATA',
    badge: 'BÁN CHẠY',
    title: 'Mực Khô Loại 1',
    price: '800.000đ / 0.5kg',
    text: 'Mực câu tươi phơi đủ nắng, thịt dày ngọt tự nhiên. Nướng lên thơm lừng, không chất bảo quản.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },
  {
    image: '/images/muc-rim.jpg',
    alt: 'Mực rim me cay ngọt - đặc sản rim Đà Nẵng PATA',
    badge: 'BÁN CHẠY',
    title: 'Mực Rim',
    price: '268.000đ / 0.5kg',
    text: 'Mực rim thấm vị, dai ngọt cay nhẹ. Ăn vặt hay nhắm đều bắt miệng.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },
  {
    image: '/images/ca-bo-kho.jpg',
    alt: 'Cá bò khô tẩm vị - đặc sản khô Đà Nẵng PATA',
    badge: 'BÁN CHẠY',
    title: 'Cá Bò Khô',
    price: '160.000đ / 0.5kg',
    text: 'Đậm đà cay nhẹ, xé sợi ăn liền. Món nhậu và quà biếu được chuộng nhất tại Đà Nẵng.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },
  {
    image: '/images/ca-chi-vang-kho.jpg',
    alt: 'Cá chỉ vàng khô Đà Nẵng - đặc sản khô PATA',
    badge: 'BÁN CHẠY',
    title: 'Cá Chỉ Vàng Khô',
    price: '135.000đ / 0.5kg',
    text: 'Thịt ngọt dai, nướng than dậy mùi. Xé nhỏ chấm tương ớt là chuẩn bài.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },
  {
    image: '/images/ca-com-rim.jpg',
    alt: 'Cá cơm rim mè mặn ngọt - đặc sản rim Đà Nẵng PATA',
    badge: 'BÁN CHẠY',
    title: 'Cá Cơm Rim',
    price: '135.000đ / 0.5kg',
    text: 'Rim mặn ngọt chuẩn vị nhà làm, rắc mè rang thơm. Ăn với cơm nóng là hết veo.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },
  {
    image: '/images/mam-ca-com-do.jpg',
    alt: 'Mắm cá cơm đỏ nguyên chất Đà Nẵng - PATA',
    badge: 'BÁN CHẠY',
    title: 'Mắm Cá Cơm Đỏ',
    price: '95.000đ / 1 lít',
    text: 'Ủ chượp truyền thống, mặn dịu hậu ngọt. Chấm gì cũng ngon, không pha phẩm màu.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },

  // ---------- Quy cách đóng gói ----------
  {
    image: '/images/ca-bo-dong-hop.jpg',
    alt: 'Đặc sản PATA đóng hộp nhựa 500g có tem nhãn đầy đủ',
    badge: 'QUY CÁCH ĐÓNG GÓI',
    title: 'Đóng Hộp 500g',
    text: 'Hộp nhựa kín, có tem nhãn ghi rõ thành phần và hạn dùng. Sạch sẽ, chắc chắn - rất hợp làm quà biếu.',
    cta: { label: 'Tư vấn đặt quà', href: 'tel:0764933884' }
  },
  {
    image: '/images/hut-chan-khong.jpg',
    alt: 'Mực khô PATA hút chân không kèm gói hút ẩm, giao hàng toàn quốc',
    badge: 'QUY CÁCH ĐÓNG GÓI',
    title: 'Hút Chân Không',
    text: 'Ép kín kèm gói hút ẩm, giữ được lâu và không ám mùi. Yên tâm gửi đi xa khắp cả nước.',
    cta: { label: 'Hỏi cách gửi hàng', href: 'tel:0764933884' }
  },

  // ---------- Còn nhiều loại khác ----------
  {
    image: '/images/nhieu-loai.jpg',
    alt: 'Kho hàng đặc sản khô PATA Đà Nẵng với nhiều loại cá khô, mực khô, tép khô',
    badge: 'CÒN NHIỀU LOẠI KHÁC',
    title: 'Không Thấy Món Bạn Cần?',
    text: 'Kho nhà còn nhiều loại khô và rim theo mùa chưa kịp lên web. Gọi cho Tâm để hỏi món bạn muốn nhé.',
    cta: { label: 'Gọi Tâm: 0764.933.884', href: 'tel:0764933884' }
  }
];

// Thời gian mỗi slide đứng yên trước khi chuyển (mili giây).
export const SLIDE_INTERVAL = 2000;
