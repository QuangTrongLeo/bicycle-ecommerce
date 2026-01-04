import { products } from '../product/productApi';
import { productColors } from '../product/productColorApi';
import { productImages } from '../product/productImageApi';

const RESPONSE_DELAY = 1200;

const INTENTS = {
  PRODUCT_BY_COLOR: 'PRODUCT_BY_COLOR',
  FAQ: 'FAQ',
  GREETING: 'GREETING',
  PRICE: 'PRICE',
  UNKNOWN: 'UNKNOWN'
};

const nowISO = () => new Date().toISOString();

const normalizeText = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const containsAny = (input, words) =>
  words.some(word => input.includes(word));

const findColorInMessage = (input) =>
  productColors.find(c =>
    input.includes(c.colorName.toLowerCase())
  );

const FAQ_DATA = [
  {
    keys: ['size', 'kích cỡ'],
    reply: 'Shop hiện có đầy đủ size từ 36 đến 44, bạn tham khảo bảng size ở trang chi tiết sản phẩm nha 👟'
  },
  {
    keys: ['đổi', 'trả', 'hoàn tiền'],
    reply: 'Shop hỗ trợ đổi trả trong vòng 30 ngày nếu sản phẩm còn nguyên vẹn và chưa qua sử dụng.'
  },
  {
    keys: ['ship', 'vận chuyển', 'giao hàng'],
    reply: 'Đơn hàng từ 1.000.000đ sẽ được miễn phí vận chuyển toàn quốc 🚚'
  },
  {
    keys: ['real', 'auth', 'chính hãng', 'fake'],
    reply: 'Shop cam kết 100% chính hãng. Nếu phát hiện hàng giả, shop hoàn tiền và đền bù gấp 10 lần.'
  }
];

const detectIntent = (input) => {
  if (containsAny(input, ['hi', 'hello', 'chào', 'alo'])) return INTENTS.GREETING;
  if (containsAny(input, ['giá', 'bao nhiêu', 'rẻ', 'sale'])) return INTENTS.PRICE;
  if (findColorInMessage(input)) return INTENTS.PRODUCT_BY_COLOR;
  if (FAQ_DATA.some(f => containsAny(input, f.keys))) return INTENTS.FAQ;
  return INTENTS.UNKNOWN;
};

const buildProductItem = (color) => {
  const product = products.find(p => p.id === color.productId);
  if (!product) return null;

  const image = productImages.find(i => i.colorId === color.id);

  return {
    ...product,
    color: color.colorName,
    thumbnail: image?.imageUrl || 'https://via.placeholder.com/200',
    url: `category?color=${encodeURIComponent(color.colorHex)}&page=1`
  };
};

const buildProductListResponse = (colorName) => {
  const items = productColors
    .filter(c => c.colorName.toLowerCase() === colorName.toLowerCase())
    .map(buildProductItem)
    .filter(Boolean);

  if (!items.length) return null;

  return {
    status: 200,
    type: 'product_list',
    message: `Mình tìm được ${items.length} mẫu xe màu ${colorName} cho bạn nè 👇`,
    data: items,
    meta: { color: colorName, total: items.length },
    createdAt: nowISO()
  };
};

const buildTextResponse = (message) => ({
  status: 200,
  type: 'text',
  message,
  createdAt: nowISO()
});

const buildFaqResponse = (input) => {
  const faq = FAQ_DATA.find(f => containsAny(input, f.keys));
  return faq ? buildTextResponse(faq.reply) : null;
};

const RESPONDERS = {
  [INTENTS.GREETING]: () =>
    buildTextResponse(
      'Chào bạn 👋 Mình là trợ lý AI của Shop Giày. Bạn có thể hỏi mình về sản phẩm, màu sắc, giá cả hoặc chính sách nha!'
    ),

  [INTENTS.PRICE]: () =>
    buildTextResponse(
      'Giá mỗi sản phẩm sẽ khác nhau tuỳ mẫu và màu sắc. Bạn cho mình biết mẫu giày bạn quan tâm nha 👀'
    ),

  [INTENTS.UNKNOWN]: () =>
    buildTextResponse(
      'Mình chưa hiểu rõ câu hỏi này 😥 Bạn có thể hỏi lại chi tiết hơn hoặc liên hệ trực tiếp với shop để được hỗ trợ nhanh nhất nha!'
    )
};

export const getAiResponse = (userMessage) =>
  new Promise(resolve => {
    setTimeout(() => {
      const input = normalizeText(userMessage);
      const intent = detectIntent(input);

      if (intent === INTENTS.PRODUCT_BY_COLOR) {
        const color = findColorInMessage(input);
        if (color) {
          const res = buildProductListResponse(color.colorName);
          if (res) return resolve(res);
        }
      }

      if (intent === INTENTS.FAQ) {
        const res = buildFaqResponse(input);
        if (res) return resolve(res);
      }

      resolve((RESPONDERS[intent] || RESPONDERS[INTENTS.UNKNOWN])());
    }, RESPONSE_DELAY);
  });
