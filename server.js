const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');
const { seedProducts } = require('./data/products');
const { CATEGORY_TYPES } = require('./data/categories');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Cache static assets (images, css, js) with long expiry
app.use((req, res, next) => {
  if (req.path.match(/\.(webp|png|jpg|jpeg|css|js|svg)$/i)) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

app.use(express.static(path.join(__dirname, '.')));

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/api/config', (req, res) => {
  res.json({ port: PORT });
});
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Lỗi máy chủ nội bộ'
  });
});

const PORT = Number(process.env.PORT) || 3000;

if (process.env.VERCEL !== '1') {
  async function bootstrap() {
    await connectDB();

    const count = await Product.countDocuments();

    // Data cũ (category 'fresh'/'dried') làm các tab khô/rim/mắm rỗng,
    // nên tự nạp lại seed khi phát hiện category ngoài danh sách hợp lệ.
    const staleCount = await Product.countDocuments({
      category: { $nin: CATEGORY_TYPES }
    });

    if (count === 0 || staleCount > 0) {
      if (staleCount > 0) {
        console.log(`Phát hiện ${staleCount} sản phẩm dùng category cũ - đang nạp lại seed...`);
        await Product.deleteMany({});
      }

      // Dọn index mồ côi từ schema cũ trước khi insert, tránh lỗi E11000.
      await Product.syncIndexes();

      await Product.insertMany(seedProducts);
      console.log(`Đã tải sẵn ${seedProducts.length} sản phẩm mặc định`);
    }

    app.listen(PORT, () => {
      console.log(`Server chạy tại http://localhost:${PORT}`);
    });
  }

  bootstrap();
} else {
  connectDB().catch(err => console.error('DB connection error:', err));
}

module.exports = app;
