// Khung xem ảnh phóng to, dùng chung cho lưới sản phẩm và slider quảng cáo.
// Đóng bằng: bấm nền, bấm nút ×, hoặc phím Esc.
export const Lightbox = {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    // Ảnh dày chữ (vd: bảng giá): trên màn hẹp cho rộng hơn màn hình
    // và kéo ngang để đọc, thay vì ép vừa khung khiến chữ bé xíu.
    wide: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  methods: {
    onKeydown(e) {
      if (e.key === 'Escape') this.$emit('close');
    }
  },
  mounted() {
    // Khoá cuộn trang nền khi đang xem ảnh.
    this.prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Nhớ nơi đang focus để trả lại khi đóng.
    this.lastFocused = document.activeElement;
    this.$nextTick(() => {
      if (this.$refs.closeBtn) this.$refs.closeBtn.focus();
    });

    window.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount() {
    document.body.style.overflow = this.prevOverflow || '';
    window.removeEventListener('keydown', this.onKeydown);

    if (this.lastFocused && this.lastFocused.focus) {
      this.lastFocused.focus();
    }
  },
  template: `
    <div
      class="lightbox"
      :class="{ 'lightbox-wide': wide }"
      role="dialog"
      aria-modal="true"
      aria-label="Ảnh phóng to"
      @click="$emit('close')"
    >
      <button ref="closeBtn" class="lightbox-close" @click.stop="$emit('close')" aria-label="Đóng ảnh">×</button>
      <img :src="src" :alt="alt" @click.stop>
    </div>
  `
};
