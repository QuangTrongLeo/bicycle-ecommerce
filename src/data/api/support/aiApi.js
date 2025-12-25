import { products } from '../product/productApi';
import { productColors } from '../product/productColorApi';
import { productImages } from '../product/productImageApi';

const normalizeText = (text = '') =>
  text.toLowerCase().trim();

const hasKeyword = (input, keywords = []) =>
  keywords.some(k => input.includes(k));

const buildProductResponseByColor = (colorName) => {
  const matchingColors = productColors.filter(
    c => c.colorName.toLowerCase() === colorName.toLowerCase()
  );

  const items = matchingColors.map(colorItem => {
    const productBase = products.find(p => p.id === colorItem.productId);
    if (!productBase) return null;

    const imageObj = productImages.find(img => img.colorId === colorItem.id);
    return {
      ...productBase,
      image: imageObj?.imageUrl || 'https://via.placeholder.com/150',
      colorName: colorItem.colorName,
      link: `category?color=${encodeURIComponent(colorItem.colorHex)}&page=1`
    };
  }).filter(Boolean);

  return items.length
    ? {
        status: 200,
        type: 'product_list',
        message: `Dạ, đây là các mẫu xe màu ${colorName} bạn đang tìm nè 👇`,
        data: items,
        createdAt: new Date().toISOString()
      }
    : null;
};

const FAQ_RESPONSES = [
  {
    keywords: ['size', 'kích cỡ'],
    message: 'Shop có size từ 36 đến 44, bạn tham khảo bảng size ở mục FAQ giúp mình nha 👟'
  },
  {
    keywords: ['đổi trả', 'hoàn tiền'],
    message: 'Shop hỗ trợ đổi trả trong 30 ngày, miễn là sản phẩm còn mới và chưa qua sử dụng nha.'
  },
  {
    keywords: ['ship', 'vận chuyển'],
    message: 'Đơn hàng trên 1 triệu được freeship toàn quốc đó bạn 🚚'
  },
  {
    keywords: ['xem hàng', 'kiểm tra', 'thử giày'],
    message: 'Bạn được quyền kiểm tra giày khi shipper giao đến, ưng thì nhận nha!'
  },
  {
    keywords: ['giá', 'nhiêu', 'sale', 'rẻ'],
    message: 'Giá luôn đi kèm chất lượng. Bạn nhớ săn voucher ở trang chủ để được giá tốt hơn nha!'
  },
  {
    keywords: ['real', 'auth', 'chính hãng', 'fake'],
    message: 'Shop cam kết 100% hàng chính hãng, phát hiện fake đền x10 giá trị đơn hàng!'
  },
  {
    keywords: ['hi', 'chào', 'hello'],
    message: 'Chào bạn 👋 Mình là trợ lý ảo của Shop Giày, mình có thể hỗ trợ gì cho bạn nè?'
  }
];

export const getAiResponse = (userMessage) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const input = normalizeText(userMessage);

      // 👉 Ưu tiên tìm sản phẩm theo màu
      const foundColor = productColors.find(c =>
        input.includes(c.colorName.toLowerCase())
      );

      if (
        foundColor &&
        hasKeyword(input, ['xe', 'mẫu', 'tìm'])
      ) {
        const productResponse = buildProductResponseByColor(foundColor.colorName);
        if (productResponse) return resolve(productResponse);
      }

      // 👉 FAQ
      const faq = FAQ_RESPONSES.find(f =>
        hasKeyword(input, f.keywords)
      );

      resolve({
        status: 200,
        type: 'text',
        message: faq
          ? faq.message
          : 'Câu hỏi này hơi ngoài khả năng của mình 😥 Bạn để lại tin nhắn ở mục Liên hệ nhé!',
        createdAt: new Date().toISOString()
      });
    }, 1200);
  });
};
