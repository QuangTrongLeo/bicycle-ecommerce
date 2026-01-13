export const getAiResponse = (userMessage) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const input = userMessage.toLowerCase();
            let response = "";

            if (input.includes("size") || input.includes("kích cỡ")) {
                response = "Bên mình có bảng size chuẩn từ 36-44. Bạn có thể xem chi tiết ở phần 'Câu hỏi thường gặp' nhé!";
            } else if (input.includes("đổi trả") || input.includes("hoàn tiền")) {
                response = "Chính sách đổi trả của chúng mình là 30 ngày kể từ khi nhận hàng, miễn là giày còn mới ạ.";
            } else if (input.includes("ship") || input.includes("vận chuyển")) {
                response = "Đơn trên 1 triệu là được miễn phí ship toàn quốc luôn bạn nhé!";
            } else if (input.includes("hi") || input.includes("chào")) {
                response = "Chào bạn! Mình là trợ lý ảo của Shop Giày. Bạn cần mình giúp gì nào?";
            } else {
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