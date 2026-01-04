import { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faShieldHalved,
  faCircleQuestion,
  faHeadset,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faRobot,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { sendContactRequest } from '~/data/api/support/chatApi';
import { getAiResponse } from '~/data/api/support/aiApi';

const st = classNames.bind(styles);

const DEFAULT_AI_MESSAGE = {
  role: 'ai',
  content:
    'Xin chào! Tôi là trợ lý ảo 🤖 Bạn có thể hỏi tôi về size giày, phí ship hoặc chính sách mua hàng.'
};

function Support() {
  const [activeTab, setActiveTab] = useState('policy');
  const [loading, setLoading] = useState({ contact: false, ai: false });
  const [messages, setMessages] = useState([DEFAULT_AI_MESSAGE]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [form, setForm] = useState({ name: '', email: '', content: '' });
  const [popup, setPopup] = useState({ show: false, type: 'success', message: '' });

  const chatEndRef = useRef(null);

  const scrollBottom = useCallback(
    () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }),
    []
  );

  useEffect(() => {
    activeTab === 'ai-chat' && scrollBottom();
  }, [messages, activeTab, scrollBottom]);

  const showPopup = (type, message) =>
    setPopup({ show: true, type, message });

  const closePopup = () =>
    setPopup(p => ({ ...p, show: false }));

  const updateForm = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const resetForm = () =>
    setForm({ name: '', email: '', content: '' });

  const pushMessage = useCallback(
    msg => setMessages(m => [...m, msg]),
    []
  );

  const sendContact = async () => {
    if (!form.name || !form.email || !form.content) {
      showPopup('warning', 'Vui lòng nhập đầy đủ thông tin trước khi gửi!');
      return;
    }

    setLoading(l => ({ ...l, contact: true }));
    try {
      const res = await sendContactRequest(form);
      showPopup('success', res.message || 'Gửi yêu cầu thành công!');
      resetForm();
    } catch (e) {
      showPopup('error', e.message || 'Có lỗi xảy ra!');
    } finally {
      setLoading(l => ({ ...l, contact: false }));
    }
  };

  const sendAi = async () => {
    if (!input.trim() || loading.ai) return;

    const content = input.trim();

    setHistory(h => [content, ...h]);
    setHistoryIdx(-1);
    pushMessage({ role: 'user', content });
    setInput('');
    setLoading(l => ({ ...l, ai: true }));

    try {
      const res = await getAiResponse(content);
      pushMessage({
        role: 'ai',
        content: res.message,
        type: res.type,
        data: res.data
      });
    } catch {
      pushMessage({
        role: 'ai',
        content: 'Xin lỗi 😥 mình gặp chút trục trặc.'
      });
    } finally {
      setLoading(l => ({ ...l, ai: false }));
    }
  };

  const handleKey = e => {
    if (e.key === 'Enter') return sendAi();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const idx = historyIdx + 1;
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const idx = historyIdx - 1;
        setHistoryIdx(idx);
        setInput(history[idx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  const renderAiChat = () => (
    <div className={st('tab-content')}>
      <h2>Hỏi đáp với trợ lý AI</h2>

      <div className={st('ai-chat-container')}>
        <div className={st('chat-window')}>
          {messages.map((m, i) => (
            <div key={i} className={st('chat-bubble', m.role)}>
              <div>{m.content}</div>

              {m.type === 'product_list' && m.data && (
                <div className={st('product-list-container')}>
                  {m.data.map(p => (
                    <div key={p.id} className={st('product-item-mini')}>
                      <img src={p.image} alt={p.name} />
                      <p>{p.name}</p>
                      <p>{p.price?.toLocaleString()}đ</p>
                      <button onClick={() => p.link && (location.href = p.link)}>
                        Xem ngay
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading.ai && (
            <div className={st('chat-bubble', 'ai')}>
              <FontAwesomeIcon icon={faSpinner} spin /> Đang suy nghĩ...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className={st('chat-input-group')}>
          <input
            placeholder="Hỏi tôi bất cứ điều gì..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={sendAi} disabled={loading.ai}>
            <FontAwesomeIcon
              icon={loading.ai ? faSpinner : faPaperPlane}
              spin={loading.ai}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ margin: '20px 0 40px' }}>
      <div className={st('support-header')}>
        <h3>Trung tâm hỗ trợ khách hàng</h3>
        <p>Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn</p>
      </div>

      <div className="row" style={{ marginTop: 20 }}>
        <div className="col-md-3">
          <div className={st('support-menu')}>
            {[
              ['ai-chat', faRobot, 'Hỏi đáp AI'],
              ['policy', faShieldHalved, 'Chính sách'],
              ['faq', faCircleQuestion, 'Câu hỏi thường gặp'],
              ['contact', faHeadset, 'Liên hệ']
            ].map(([k, i, l]) => (
              <div
                key={k}
                className={st('menu-item', { active: activeTab === k })}
                onClick={() => setActiveTab(k)}
              >
                <span>
                  <FontAwesomeIcon icon={i} /> {l}
                </span>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <div className={st('support-content')}>
            {activeTab === 'ai-chat' && renderAiChat()}
          </div>
        </div>
      </div>

      {popup.show && (
        <div className={st('modal-overlay')} onClick={closePopup}>
          <div className={st('modal-box', popup.type)} onClick={e => e.stopPropagation()}>
            <button onClick={closePopup}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>

            <FontAwesomeIcon
              icon={
                popup.type === 'success'
                  ? faCheckCircle
                  : popup.type === 'error'
                  ? faTimesCircle
                  : faExclamationTriangle
              }
            />

            <h4>
              {popup.type === 'success'
                ? 'Thành công'
                : popup.type === 'error'
                ? 'Thất bại'
                : 'Lưu ý'}
            </h4>

            <p>{popup.message}</p>

            <button onClick={closePopup}>Đã hiểu</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
