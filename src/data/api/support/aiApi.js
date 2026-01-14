import { products } from '../product/productApi';
import { productColors } from '../product/productColorApi';
import { productImages } from '../product/productImageApi';
export const getAiResponse = (userMessage) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const input = userMessage.toLowerCase();
            const foundColor = productColors.find(c => input.includes(c.colorName.toLowerCase()));
        if (foundColor && (input.includes("xe") || input.includes("mẫu") || input.includes("tìm"))) {
                    const matchingColors = productColors.filter(
                    c => c.colorName.toLowerCase() === foundColor.colorName.toLowerCase()
                );

            const matchProducts = matchingColors.map(colorItem => {
                    // Tìm thông tin chung của sản phẩm (tên, giá...)
                    const productBase = products.find(p => p.id === colorItem.productId);
                    const imageObj = productImages.find(img => img.colorId === colorItem.id);

                    if (productBase) {
                        return {
                            ...productBase,
                            image: imageObj ? imageObj.imageUrl : 'https://via.placeholder.com/150', 
                            colorName: colorItem.colorName
                        };
                    }
                    return null;
                }).filter(p => p !== null); 

                if (matchProducts.length > 0) {
                    return resolve({
                        status: 200,
                        type: 'product_list', 
                        message: `Dạ, đây là danh sách xe màu ${foundColor.colorName} mà bạn cần tìm:`,
                        data: matchProducts,
                        createdAt: new Date().toISOString()
                    });
                }
            }

            let response = "";
            if (input.includes("size") || input.includes("kích cỡ")) {
                response = "Bên mình có bảng size chuẩn từ 36-44. Bạn có thể xem chi tiết ở phần 'Câu hỏi thường gặp' nhé!";
            } else if (input.includes("đổi trả") || input.includes("hoàn tiền")) {
                response = "Chính sách đổi trả của chúng mình là 30 ngày kể từ khi nhận hàng, miễn là giày còn mới ạ.";
            } else if (input.includes("ship") || input.includes("vận chuyển")) {
                response = "Đơn trên 1 triệu là được miễn phí ship toàn quốc luôn bạn nhé!";
            } else if (input.includes("hi") || input.includes("chào") || input.includes("hello"))  {
                response = "Chào bạn! Mình là trợ lý ảo của Shop Giày. Bạn cần mình giúp gì nào?";
            }
              else if (input.includes("xem hàng") || input.includes("kiểm tra") || input.includes("thử giày")) {
                response = "Tất nhiên rồi bạn! Khi shipper giao đến, bạn hoàn toàn được quyền mở hộp kiểm tra giày trước khi thanh toán. Ưng ý mới nhận bạn nhé!";
            }
              else if (input.includes("giá") || input.includes("nhiêu") || input.includes("sale") || input.includes("rẻ")) {
                response = "Giá sản phẩm bên mình luôn đi đôi với chất lượng (cam kết hàng chính hãng). Bạn có thể săn thêm voucher ở banner trang chủ để được giá tốt hơn nhé!";
            }
              else if (input.includes("real") || input.includes("auth") || input.includes("chính hãng") || input.includes("fake")) {
                response = "Shop cam kết 100% sản phẩm là hàng chính hãng, full box và tem mác. Nếu phát hiện hàng giả, shop đền gấp 10 lần giá trị đơn hàng nên bạn yên tâm tuyệt đối nha!";
            }
             else {
                response = "Câu hỏi này hơi khó với mình, nhưng bạn có thể để lại tin nhắn trong phần 'Liên hệ', nhân viên sẽ gọi lại ngay!";
            }

            resolve({
                status: 200,
                message: response,
                createdAt: new Date().toISOString()
            });
        }, 1200);
    });
};