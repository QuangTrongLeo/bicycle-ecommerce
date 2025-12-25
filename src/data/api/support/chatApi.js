const STORAGE_KEY = 'SUPPORT_REQUESTS';

const validateContactData = (data) => {
  if (!data?.name || !data?.email || !data?.content) {
    return 'Vui lòng nhập đầy đủ thông tin!';
  }
  return null;
};

export const sendContactRequest = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = validateContactData(data);
      if (error) {
        reject({ status: 400, message: error });
        return;
      }

      try {
        const requests =
          JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

        const newRequest = {
          id: crypto.randomUUID(),
          ...data,
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([...requests, newRequest])
        );

        resolve({
          status: 200,
          message: 'Gửi yêu cầu thành công! Nhân viên sẽ liên hệ với bạn sớm nhất.'
        });
      } catch {
        reject({ status: 500, message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
      }
    }, 1500);
  });
};
