import { Lightbox } from './Lightbox.js';

const CATEGORY_LABELS = {
  kho: 'ĐẶC SẢN KHÔ',
  rim: 'ĐẶC SẢN RIM',
  mam: 'MẮM & NƯỚC MẮM'
};

export const ProductGrid = {
  props: {
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    formatPrice: {
      type: Function,
      required: true
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  emits: ['load-more'],
  components: { Lightbox },
  data() {
    return {
      // Sản phẩm đang xem ảnh phóng to (null = đang đóng).
      zoomedProduct: null
    };
  },
  methods: {
    categoryLabel(category) {
      return CATEGORY_LABELS[category] || '';
    },
    onImageError(event) {
      event.target.src = '/images/placeholder-product.svg';
    },
    setupObserver() {
      if (this.observer) this.observer.disconnect();

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.$emit('load-more');
        }
      }, { rootMargin: '100px' });

      if (this.$refs.sentinel) {
        this.observer.observe(this.$refs.sentinel);
      }
    }
  },
  template: `
    <section>
      <h2 class="sr-only">Danh sách đặc sản khô, rim và nước mắm Đà Nẵng</h2>
      <p v-if="loading && products.length === 0" class="state-text">Đang tải sản phẩm...</p>
      <p v-else-if="error" class="state-text state-error">{{ error }}</p>
      <p v-else-if="products.length === 0" class="state-text">Không tìm thấy sản phẩm phù hợp.</p>

      <div v-else class="product-grid">
        <article v-for="product in products" :key="product._id" class="product-card">
          <span v-if="product.isHot" class="hot-tag">BÁN CHẠY</span>
          <button
            type="button"
            class="img-frame"
            @click="zoomedProduct = product"
            :aria-label="'Xem ảnh lớn: ' + product.name"
          >
            <img
              :src="product.image"
              :alt="product.name + ' - đặc sản Đà Nẵng PATA'"
              loading="lazy"
              decoding="async"
              width="300"
              height="300"
              @error="onImageError"
            >
            <span class="zoom-badge" aria-hidden="true">🔍</span>
          </button>
          <div class="card-body">
            <small>{{ categoryLabel(product.category) }}</small>
            <h3>{{ product.name }}</h3>
            <p>{{ formatPrice(product.price, product.unit) }}</p>
          </div>
        </article>
      </div>

      <div v-if="hasMore" ref="sentinel" class="sentinel"></div>
      <p v-if="loading && products.length > 0" class="loading-more">Đang tải thêm...</p>

      <lightbox
        v-if="zoomedProduct"
        :src="zoomedProduct.image"
        :alt="zoomedProduct.name + ' - đặc sản Đà Nẵng PATA'"
        @close="zoomedProduct = null"
      ></lightbox>
    </section>
  `,
  watch: {
    hasMore(newVal) {
      if (!newVal) {
        if (this.observer) {
          this.observer.disconnect();
        }
        return;
      }

      this.$nextTick(() => this.setupObserver());
    },
    products() {
      if (!this.hasMore) return;
      this.$nextTick(() => this.setupObserver());
    }
  },
  mounted() {
    if (this.hasMore) {
      this.setupObserver();
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};
