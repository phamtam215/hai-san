// Đối chiếu giá gõ tay trong frontend/slides.js với giá thật trong data/products.js.
// Giá lệch nhau giữa slider và thẻ sản phẩm là lỗi khách nhìn thấy ngay,
// nên chạy script này mỗi lần đổi giá:  npm run check-prices
const fs = require('fs');
const path = require('path');
const { seedProducts } = require('../data/products');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'frontend/slides.js'), 'utf8');

// Tách các cặp title + price trong slides.js (không import được vì là ES module).
const slides = [];
for (const block of src.split(/\n\s*\{/)) {
  const title = block.match(/title:\s*'([^']+)'/);
  const price = block.match(/price:\s*'([^']+)'/);
  if (title && price) slides.push({ title: title[1], price: price[1] });
}

if (slides.length === 0) {
  console.log('Không có slide nào ghi giá - không cần đối chiếu.');
  process.exit(0);
}

// '800.000đ / 0.5kg' -> { amount: 800000, unit: '0.5kg' }
function parsePrice(text) {
  const [left, right] = text.split('/').map(s => s.trim());
  return {
    amount: Number(left.replace(/[^\d]/g, '')),
    unit: (right || '').toLowerCase().replace(/\s+/g, '')
  };
}

// So khớp slide với sản phẩm theo tên (bỏ dấu cách thừa, không phân biệt hoa thường).
function normalize(name) {
  return name.toLowerCase().replace(/\s+/g, ' ').trim();
}

let problems = 0;

console.log(`Đối chiếu ${slides.length} slide có ghi giá:\n`);

for (const slide of slides) {
  const product = seedProducts.find(p => normalize(p.name) === normalize(slide.title));

  if (!product) {
    console.log(`  ⚠ "${slide.title}" - không tìm thấy sản phẩm cùng tên trong data/products.js`);
    console.log(`      (bỏ qua được nếu đây là slide giới thiệu, không phải sản phẩm)\n`);
    continue;
  }

  const shown = parsePrice(slide.price);
  const realUnit = product.unit.toLowerCase().replace(/\s+/g, '');

  if (shown.amount !== product.price || shown.unit !== realUnit) {
    problems++;
    console.log(`  ✗ ${slide.title}`);
    console.log(`      slider  : ${slide.price}`);
    console.log(`      database: ${product.price.toLocaleString('vi-VN')}đ / ${product.unit}\n`);
  } else {
    console.log(`  ✓ ${slide.title.padEnd(22)} ${slide.price}`);
  }
}

console.log('');
if (problems > 0) {
  console.log(`❌ ${problems} slide ghi giá lệch với data/products.js - sửa lại cho khớp.`);
  process.exit(1);
}
console.log('✓ Giá trên slider khớp với data/products.js.');
