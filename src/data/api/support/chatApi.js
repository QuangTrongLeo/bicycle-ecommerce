const STORAGE_KEY = 'SUPPORT_REQUESTS';
const REQUEST_DELAY = 1500;

const nowISO = () => new Date().toISOString();

const safeJSON = {
  parse: (v, f) => {
    try {
      return JSON.parse(v) ?? f;
    } catch {
      return f;
    }
  },
  stringify: JSON.stringify
};

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `req_${Date.now()}_${Math.random().toString(36).slice(2)}`;

const normalizeText = (v) =>
  typeof v === 'string' ? v.trim() : '';

const validatePayload = ({ name, email, content } = {}) => {
  if (!normalizeText(name)) return [false, 'Thiếu họ tên!'];
  if (!normalizeText(email)) return [false, 'Thiếu email!'];
  if (!normalizeText(content)) return [false, 'Thiếu nội dung liên hệ!'];
  return [true];
};

const readRequests = () =>
  safeJSON.parse(localStorage.getItem(STORAGE_KEY), []);

const writeRequests = (data) =>
  localStorage.setItem(STORAGE_KEY, safeJSON.stringify(data));

const createRequest = (data) => ({
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

const ok = (message) => ({ status: 200, message });
const fail = (status, message) => ({ status, message });

export const sendContactRequest = (payload) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const [valid, error] = validatePayload(payload);
      if (!valid) return reject(fail(400, error));

      try {
        const requests = readRequests();
        writeRequests([...requests, createRequest(payload)]);
        resolve(
          ok(
            'Yêu cầu đã được gửi thành công. Bộ phận hỗ trợ sẽ phản hồi trong thời gian sớm nhất.'
          )
        );
      } catch {
        reject(
          fail(500, 'Hệ thống gặp sự cố. Vui lòng thử lại sau.')
        );
      }
    }, REQUEST_DELAY);
  });

export const getAllContactRequests = () =>
  readRequests().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

export const getContactRequestById = (id) =>
  readRequests().find(r => r.id === id) ?? null;

export const updateContactRequestStatus = (id, status) => {
  const updated = readRequests().map(r =>
    r.id === id
      ? { ...r, status, updatedAt: nowISO() }
      : r
  );

  writeRequests(updated);
  return updated;
};

export const removeContactRequest = (id) => {
  const updated = readRequests().filter(r => r.id !== id);
  writeRequests(updated);
  return updated;
};

export const clearAllContactRequests = () => {
  writeRequests([]);
  return [];
};
