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
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [messages, setMessages] = useState([DEFAULT_AI_MESSAGE]);
  const [userInput, setUserInput] = useState('');

  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });

  const [popup, setPopup] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  const chatEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (activeTab === 'ai-chat') {
      scrollToBottom();
    }
  }, [messages, activeTab, scrollToBottom]);

  const closePopup = () =>
    setPopup(prev => ({ ...prev, show: false }));

  const updateFormData = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetContactForm = () =>
    setFormData({ name: '', email: '', content: '' });

  const showPopup = (type, message) =>
    setPopup({ show: true, type, message });

  const handleSendContact = async () => {
    if (!formData.name || !formData.email || !formData.content) {
      showPopup('warning', 'Vui lòng nhập đầy đủ thông tin trước khi gửi!');
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendContactRequest(formData);
      showPopup(
        'success',
        res.message || 'Gửi yêu cầu thành công!'
      );
      resetContactForm();
    } catch (err) {
      showPopup(
        'error',
        err.message || 'Có lỗi xảy ra!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const pushMessage = msg =>
    setMessages(prev => [...prev, msg]);

  const handleSendAi = async () => {
    if (!userInput.trim() || isAiLoading) return;

    const content = userInput.trim();

    setHistory(prev => [content, ...prev]);
    setHistoryIdx(-1);

    pushMessage({ role: 'user', content });
    setUserInput('');
    setIsAiLoading(true);

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
      setIsAiLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSendAi();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const idx = historyIdx + 1;
        setHistoryIdx(idx);
        setUserInput(history[idx]);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const idx = historyIdx - 1;
        setHistoryIdx(idx);
        setUserInput(history[idx]);
      } else {
        setHistoryIdx(-1);
        setUserInput('');
      }
    }
  };

  const renderAiChat = () => (
    <div className={st('tab-content')}>
      <h2>Hỏi đáp với trợ lý AI</h2>

      <div className={st('ai-chat-container')}>
        <div className={st('chat-window')}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={st('chat-bubble', msg.role)}
            >
              <div>{msg.content}</div>

              {msg.type === 'product_list' && msg.data && (
                <div className={st('product-list-container')}>
                  {msg.data.map(p => (
                    <div
                      key={p.id}
                      className={st('product-item-mini')}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className={st('product-img')}
                      />
                      <p className={st('product-name')}>
                        {p.name}
                      </p>
                      <p className={st('product-price')}>
                        {p.price?.toLocaleString()}đ
                      </p>
                      <button
                        className={st('btn-view-product')}
                        onClick={() =>
                          p.link &&
                          (window.location.href = p.link)
                        }
                      >
                        Xem ngay
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isAiLoading && (
            <div className={st('chat-bubble', 'ai')}>
              <FontAwesomeIcon icon={faSpinner} spin /> Đang suy nghĩ...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className={st('chat-input-group')}>
          <input
            placeholder="Hỏi tôi bất cứ điều gì..."
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={st('btn-send-ai')}
            onClick={handleSendAi}
            disabled={isAiLoading}
          >
            <FontAwesomeIcon
              icon={isAiLoading ? faSpinner : faPaperPlane}
              spin={isAiLoading}
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
            ].map(([key, icon, label]) => (
              <div
                key={key}
                className={st('menu-item', {
                  active: activeTab === key
                })}
                onClick={() => setActiveTab(key)}
              >
                <span>
                  <FontAwesomeIcon
                    icon={icon}
                    className={st('icon-left')}
                  />
                  {label}
                </span>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <div className={st('support-content')}>
            {activeTab === 'ai-chat' && renderAiChat()}
            {activeTab !== 'ai-chat' && null}
          </div>
        </div>
      </div>

      {popup.show && (
        <div className={st('modal-overlay')} onClick={closePopup}>
          <div
            className={st('modal-box', popup.type)}
            onClick={e => e.stopPropagation()}
          >
            <button
              className={st('modal-close')}
              onClick={closePopup}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>

            <div className={st('modal-icon')}>
              {popup.type === 'success' && (
                <FontAwesomeIcon icon={faCheckCircle} />
              )}
              {popup.type === 'error' && (
                <FontAwesomeIcon icon={faTimesCircle} />
              )}
              {popup.type === 'warning' && (
                <FontAwesomeIcon icon={faExclamationTriangle} />
              )}
            </div>

            <h4 className={st('modal-title')}>
              {popup.type === 'success'
                ? 'Thành công'
                : popup.type === 'error'
                ? 'Thất bại'
                : 'Lưu ý'}
            </h4>

            <p className={st('modal-msg')}>
              {popup.message}
            </p>

            <button
              className={st('btn-modal-ok')}
              onClick={closePopup}
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
