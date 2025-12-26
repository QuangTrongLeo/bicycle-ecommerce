import { products } from '../product/productApi';
import { productColors } from '../product/productColorApi';
import { productImages } from '../product/productImageApi';

const RESPONSE_DELAY = 1200;

const INTENTS = {
  PRODUCT_BY_COLOR: 'PRODUCT_BY_COLOR',
  FAQ: 'FAQ',
  GREETING: 'GREETING',
  UNKNOWN: 'UNKNOWN'
};

const normalizeText = (text = '') =>
  text.toLowerCase().replace(/\s+/g, ' ').trim();

const hasKeyword = (input, keywords = []) =>
  keywords.some(k => input.includes(k));

const findMentionedColor = (input) =>
  productColors.find(c =>
    input.includes(c.colorName.toLowerCase())
  );

const FAQ_RESPONSES = [
  {
    keywords: ['size', 'kích cỡ'],
    message:
      'Shop có size từ 36 đến 44, bạn có thể xem bảng size chi tiết ở mục FAQ nha 👟'
  },
  {
    keywords: ['đổi trả', 'hoàn tiền'],
    message:
      'Shop hỗ trợ đổi trả trong vòng 30 ngày kể từ khi nhận hàng, miễn là sản phẩm còn mới nha.'
  },
  {
    keywords: ['ship', 'vận chuyển'],
    message:
      'Đơn hàng trên 1 triệu sẽ được freeship toàn quốc 🚚'
  },
  {
    keywords: ['xem hàng', 'kiểm tra', 'thử giày'],
    message:
      'Bạn được quyền mở hộp và kiểm tra giày khi shipper giao tới, ưng ý thì nhận nha!'
  },
  {
    keywords: ['giá', 'nhiêu', 'sale', 'rẻ'],
    message:
      'Giá sản phẩm luôn đi kèm chất lượng. Bạn nhớ săn voucher ở trang chủ để có giá tốt hơn nha!'
  },
  {
    keywords: ['real', 'auth', 'chính hãng', 'fake'],
    message:
      'Shop cam kết 100% sản phẩm chính hãng. Nếu phát hiện hàng fake, shop đền x10 giá trị đơn hàng.'
  },
  {
    keywords: ['hi', 'hello', 'chào'],
    message:
      'Chào bạn 👋 Mình là trợ lý ảo của Shop Giày. Mình có thể hỗ trợ bạn tìm sản phẩm hoặc giải đáp thắc mắc nè!'
  }
];

const detectIntent = (input) => {
  const hasColor = !!findMentionedColor(input);

  if (hasColor && hasKeyword(input, ['xe', 'mẫu', 'tìm', 'có'])) {
    return INTENTS.PRODUCT_BY_COLOR;
  }

  if (FAQ_RESPONSES.some(f => hasKeyword(input, f.keywords))) {
    return INTENTS.FAQ;
  }

  if (hasKeyword(input, ['hi', 'hello', 'chào'])) {
    return INTENTS.GREETING;
  }

  return INTENTS.UNKNOWN;
};

const buildProductItem = (colorItem) => {
  const productBase = products.find(
    p => p.id === colorItem.productId
  );

  if (!productBase) return null;

  const imageObj = productImages.find(
    img => img.colorId === colorItem.id
  );

  return {
    ...productBase,
    colorName: colorItem.colorName,
    image:
      imageObj?.imageUrl || 'https://via.placeholder.com/150',
    link: `category?color=${encodeURIComponent(
      colorItem.colorHex
    )}&page=1`
  };
};

const buildProductResponseByColor = (colorName) => {
  const matchedColors = productColors.filter(
    c => c.colorName.toLowerCase() === colorName.toLowerCase()
  );

  const items = matchedColors
    .map(buildProductItem)
    .filter(Boolean);

  if (!items.length) return null;

  return {
    status: 200,
    type: 'product_list',
    message: `Dạ, đây là các mẫu xe màu ${colorName} bạn đang tìm nè 👇`,
    data: items,
    meta: {
      total: items.length,
      color: colorName
    },
    createdAt: new Date().toISOString()
  };
};

const buildFaqResponse = (input) => {
  const matched = FAQ_RESPONSES.find(f =>
    hasKeyword(input, f.keywords)
  );

  if (!matched) return null;

  return {
    status: 200,
    type: 'text',
    message: matched.message,
    createdAt: new Date().toISOString()
  };
};

const buildGreetingResponse = () => ({
  status: 200,
  type: 'text',
  message:
    'Chào bạn 👋 Mình là trợ lý AI của Shop Giày. Bạn có thể hỏi mình về sản phẩm, size, giá hoặc chính sách nha!',
  createdAt: new Date().toISOString()
});

const buildFallbackResponse = () => ({
  status: 200,
  type: 'text',
  message:
    'Câu hỏi này hơi ngoài khả năng của mình 😥 Bạn để lại tin nhắn ở mục Liên hệ, nhân viên shop sẽ hỗ trợ bạn sớm nhất nha!',
  createdAt: new Date().toISOString()
});

export const getAiResponse = (userMessage) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const input = normalizeText(userMessage);
      const intent = detectIntent(input);

      if (intent === INTENTS.PRODUCT_BY_COLOR) {
        const color = findMentionedColor(input);
        if (color) {
          const productResponse =
            buildProductResponseByColor(color.colorName);
          if (productResponse) return resolve(productResponse);
        }
      }

      if (intent === INTENTS.FAQ) {
        const faqResponse = buildFaqResponse(input);
        if (faqResponse) return resolve(faqResponse);
      }

      if (intent === INTENTS.GREETING) {
        return resolve(buildGreetingResponse());
      }

      resolve(buildFallbackResponse());
    }, RESPONSE_DELAY);
  });
};
