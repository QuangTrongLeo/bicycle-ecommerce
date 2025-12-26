const STORAGE_KEY = 'SUPPORT_REQUESTS';
const REQUEST_DELAY = 1500;

const nowISO = () => new Date().toISOString();

const safeJSON = {
  parse(value, fallback) {
    try {
      return JSON.parse(value) ?? fallback;
    } catch {
      return fallback;
    }
  },
  stringify(value) {
    return JSON.stringify(value);
  }
};

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

const normalizeText = (value) =>
  typeof value === 'string' ? value.trim() : '';

const validatePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, message: 'Dữ liệu không hợp lệ!' };
  }

  if (!normalizeText(payload.name)) {
    return { valid: false, message: 'Thiếu họ tên!' };
  }

  if (!normalizeText(payload.email)) {
    return { valid: false, message: 'Thiếu email!' };
  }

  if (!normalizeText(payload.content)) {
    return { valid: false, message: 'Thiếu nội dung liên hệ!' };
  }

  return { valid: true };
};

const readRequests = () =>
  safeJSON.parse(localStorage.getItem(STORAGE_KEY), []);

const writeRequests = (requests) => {
  localStorage.setItem(STORAGE_KEY, safeJSON.stringify(requests));
};

const createRequestModel = (data) => ({
  id: generateId(),
  name: normalizeText(data.name),
  email: normalizeText(data.email),
  content: normalizeText(data.content),
  status: 'pending',
  createdAt: nowISO(),
  updatedAt: nowISO(),
  extra: {
    platform: 'web',
    language: navigator.language,
    userAgent: navigator.userAgent
  }
});

const response = {
  success() {
    return {
      status: 200,
      message:
        'Yêu cầu đã được gửi thành công. Bộ phận hỗ trợ sẽ phản hồi trong thời gian sớm nhất.'
    };
  },
  error(status, message) {
    return { status, message };
  }
};

export const sendContactRequest = (payload) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const validation = validatePayload(payload);
      if (!validation.valid) {
        reject(response.error(400, validation.message));
        return;
      }

      try {
        const requests = readRequests();
        const newRequest = createRequestModel(payload);
        writeRequests([...requests, newRequest]);
        resolve(response.success());
      } catch {
        reject(
          response.error(
            500,
            'Hệ thống gặp sự cố. Vui lòng thử lại sau.'
          )
        );
      }
    }, REQUEST_DELAY);
  });

export const getAllContactRequests = () => {
  return readRequests().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const getContactRequestById = (id) => {
  return readRequests().find((req) => req.id === id) ?? null;
};

export const updateContactRequestStatus = (id, nextStatus) => {
  const requests = readRequests();

  const updatedRequests = requests.map((req) => {
    if (req.id !== id) return req;
    return {
      ...req,
      status: nextStatus,
      updatedAt: nowISO()
    };
  });

  writeRequests(updatedRequests);
  return updatedRequests;
};

export const removeContactRequest = (id) => {
  const requests = readRequests();
  const filtered = requests.filter((req) => req.id !== id);
  writeRequests(filtered);
  return filtered;
};

export const clearAllContactRequests = () => {
  writeRequests([]);
  return [];
};
