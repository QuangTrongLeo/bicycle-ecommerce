import { products } from '../product/productApi';
import { productColors } from '../product/productColorApi';
import { productImages } from '../product/productImageApi';

const RESPONSE_DELAY = 1200;

const INTENTS = Object.freeze({
  PRODUCT_BY_COLOR: 'PRODUCT_BY_COLOR',
  FAQ: 'FAQ',
  GREETING: 'GREETING',
  PRICE: 'PRICE',
  UNKNOWN: 'UNKNOWN'
});

const nowISO = () => new Date().toISOString();

const normalizeText = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const containsAny = (input, words = []) =>
  words.some(word => input.includes(word));

const findColorInMessage = (input) =>
  productColors.find(color =>
    input.includes(color.colorName.toLowerCase())
  );

const FAQ_DATA = [
  {
    keys: ['size', 'kích cỡ'],
    reply:
      'Shop hiện có đầy đủ size từ 36 đến 44, bạn tham khảo bảng size ở trang chi tiết sản phẩm nha 👟'
  },
  {
    keys: ['đổi', 'trả', 'hoàn tiền'],
    reply:
      'Shop hỗ trợ đổi trả trong vòng 30 ngày nếu sản phẩm còn nguyên vẹn và chưa qua sử dụng.'
  },
  {
    keys: ['ship', 'vận chuyển', 'giao hàng'],
    reply:
      'Đơn hàng từ 1.000.000đ sẽ được miễn phí vận chuyển toàn quốc 🚚'
  },
  {
    keys: ['real', 'auth', 'chính hãng', 'fake'],
    reply:
      'Shop cam kết 100% chính hãng. Nếu phát hiện hàng giả, shop hoàn tiền và đền bù gấp 10 lần.'
  }
];

const detectIntent = (input) => {
  if (containsAny(input, ['hi', 'hello', 'chào', 'alo'])) {
    return INTENTS.GREETING;
  }

  if (containsAny(input, ['giá', 'bao nhiêu', 'rẻ', 'sale'])) {
    return INTENTS.PRICE;
  }

  if (findColorInMessage(input)) {
    return INTENTS.PRODUCT_BY_COLOR;
  }

  if (FAQ_DATA.some(f => containsAny(input, f.keys))) {
    return INTENTS.FAQ;
  }

  return INTENTS.UNKNOWN;
};

const buildProductItem = (colorItem) => {
  const baseProduct = products.find(p => p.id === colorItem.productId);
  if (!baseProduct) return null;

  const image = productImages.find(
    img => img.colorId === colorItem.id
  );

  return {
    ...baseProduct,
    color: colorItem.colorName,
    thumbnail: image?.imageUrl ?? 'https://via.placeholder.com/200',
    url: `category?color=${encodeURIComponent(
      colorItem.colorHex
    )}&page=1`
  };
};

const buildProductListResponse = (colorName) => {
  const colors = productColors.filter(
    c => c.colorName.toLowerCase() === colorName.toLowerCase()
  );

  const items = colors.map(buildProductItem).filter(Boolean);

  if (!items.length) return null;

  return {
    status: 200,
    type: 'product_list',
    message: `Mình tìm được ${items.length} mẫu xe màu ${colorName} cho bạn nè 👇`,
    data: items,
    meta: {
      color: colorName,
      total: items.length
    },
    createdAt: nowISO()
  };
};

const buildFaqResponse = (input) => {
  const faq = FAQ_DATA.find(f =>
    containsAny(input, f.keys)
  );

  if (!faq) return null;

  return {
    status: 200,
    type: 'text',
    message: faq.reply,
    createdAt: nowISO()
  };
};

const buildGreetingResponse = () => ({
  status: 200,
  type: 'text',
  message:
    'Chào bạn 👋 Mình là trợ lý AI của Shop Giày. Bạn có thể hỏi mình về sản phẩm, màu sắc, giá cả hoặc chính sách nha!',
  createdAt: nowISO()
});

const buildPriceResponse = () => ({
  status: 200,
  type: 'text',
  message:
    'Giá mỗi sản phẩm sẽ khác nhau tuỳ mẫu và màu sắc. Bạn cho mình biết mẫu giày bạn quan tâm nha 👀',
  createdAt: nowISO()
});

const buildFallbackResponse = () => ({
  status: 200,
  type: 'text',
  message:
    'Mình chưa hiểu rõ câu hỏi này 😥 Bạn có thể hỏi lại chi tiết hơn hoặc liên hệ trực tiếp với shop để được hỗ trợ nhanh nhất nha!',
  createdAt: nowISO()
});

export const getAiResponse = (userMessage) =>
  new Promise(resolve => {
    setTimeout(() => {
      const input = normalizeText(userMessage);
      const intent = detectIntent(input);

      if (intent === INTENTS.PRODUCT_BY_COLOR) {
        const color = findColorInMessage(input);
        if (color) {
          const response = buildProductListResponse(color.colorName);
          if (response) return resolve(response);
        }
      }

      if (intent === INTENTS.FAQ) {
        const response = buildFaqResponse(input);
        if (response) return resolve(response);
      }

      if (intent === INTENTS.GREETING) {
        return resolve(buildGreetingResponse());
      }

      if (intent === INTENTS.PRICE) {
        return resolve(buildPriceResponse());
      }

      resolve(buildFallbackResponse());
    }, RESPONSE_DELAY);
  });
