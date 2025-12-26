const STORAGE_KEY = 'SUPPORT_REQUESTS';
const REQUEST_DELAY = 1500;

const safeParseJSON = (value, fallback = []) => {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
};

const generateRequestId = () => {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

const validateContactData = (data) => {
  if (!data) return 'Dữ liệu gửi lên không hợp lệ!';
  if (!data.name?.trim()) return 'Vui lòng nhập họ tên!';
  if (!data.email?.trim()) return 'Vui lòng nhập email!';
  if (!data.content?.trim()) return 'Vui lòng nhập nội dung!';
  return null;
};

const getStoredRequests = () =>
  safeParseJSON(localStorage.getItem(STORAGE_KEY), []);

const saveRequestsToStorage = (requests = []) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

const buildSuccessResponse = () => ({
  status: 200,
  message:
    'Gửi yêu cầu thành công! Nhân viên hỗ trợ sẽ liên hệ với bạn trong thời gian sớm nhất.'
});

const buildErrorResponse = (status, message) => ({
  status,
  message
});

export const sendContactRequest = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const validationError = validateContactData(data);
      if (validationError) {
        reject(buildErrorResponse(400, validationError));
        return;
      }

      try {
        const currentRequests = getStoredRequests();

        const newRequest = {
          id: generateRequestId(),
          name: data.name.trim(),
          email: data.email.trim(),
          content: data.content.trim(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          meta: {
            source: 'web',
            userAgent: navigator.userAgent
          }
        };

        saveRequestsToStorage([...currentRequests, newRequest]);

        resolve(buildSuccessResponse());
      } catch {
        reject(
          buildErrorResponse(
            500,
            'Có lỗi hệ thống xảy ra. Vui lòng thử lại sau!'
          )
        );
      }
    }, REQUEST_DELAY);
  });
};

export const getAllContactRequests = () =>
  getStoredRequests();

export const updateContactRequestStatus = (id, status) => {
  const requests = getStoredRequests();
  const updated = requests.map(req =>
    req.id === id ? { ...req, status } : req
  );
  saveRequestsToStorage(updated);
  return updated;
};
