const STORAGE_KEY = 'SUPPORT_REQUESTS';

export const sendContactRequest = (data) => {
    return new Promise((resolve, reject) => {
        // Giả lập mạng chậm 1.5 giây
        setTimeout(() => {
            if (!data.name || !data.email || !data.content) {
                reject({ status: 400, message: "Vui lòng nhập đầy đủ thông tin!" });
                return;
            }

            try {
                // Lưu vào LocalStorage
                const currentData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
                const newRequest = {
                    id: Date.now(),
                    ...data,
                    createdAt: new Date().toISOString(),
                    status: 'pending'
                };
                currentData.push(newRequest);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));

                resolve({ status: 200, message: "Gửi yêu cầu thành công! Chúng tôi sẽ sớm liên hệ lại." });
            } catch (error) {
                reject({ status: 500, message: "Lỗi hệ thống!" });
            }
        }, 1500); 
    });
};