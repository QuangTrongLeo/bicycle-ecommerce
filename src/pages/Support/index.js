import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShieldHalved, faCircleQuestion, faHeadset, faSpinner, 
    faCheckCircle, faTimesCircle,faExclamationTriangle,faRobot, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { sendContactRequest } from '~/data/api/support/chatApi';
import { getAiResponse } from '~/data/api/support/aiApi'; 
const st = classNames.bind(styles);

function Support() {

const [activeTab, setActiveTab] = useState('policy'); 
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Xin chào! Tôi là trợ lý ảo. Bạn có thể hỏi tôi về size giày, phí ship hoặc chính sách bảo hành.' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const [history, setHistory] = useState([]); 
    const [historyIdx, setHistoryIdx] = useState(-1); 

    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (activeTab === 'ai-chat') {
            scrollToBottom();
        }
    }, [messages, activeTab]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: ''
    });
    const [popup, setPopup] = useState({
        show: false,
        type: 'success', // 'success', 'error', 'warning'
        message: ''
    });

    const closePopup = () => setPopup(prev => ({ ...prev, show: false }));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendContact = async () => {
        if (!formData.name || !formData.email || !formData.content) {
            setPopup({
                show: true,
                type: 'warning',
                message: 'Vui lòng nhập đầy đủ thông tin trước khi gửi!'
            });
            return;
        }

        setIsLoading(true); 

        try {
            const res = await sendContactRequest(formData);
            setPopup({
                show: true,
                type: 'success',
                message: res.message || 'Gửi yêu cầu thành công! Chúng tôi sẽ sớm liên hệ.'
            });            
            setFormData({ name: '', email: '', content: '' }); 
        } catch (err) {
            alert(err.message); 
        } finally {
            setIsLoading(false); 
        }
    };

    const handleSendAi = async () => {
        if (!userInput.trim()) return;

        setHistory(prev => [userInput, ...prev]);
        setHistoryIdx(-1); 

        const userMsg = { role: 'user', content: userInput };
        setMessages(prev => [...prev, userMsg]);
        setUserInput('');
        setIsAiLoading(true);

        try {
            const res = await getAiResponse(userInput);
            
            setMessages(prev => [...prev, { role: 'ai', content: res.message }]);
        } catch (err) {
            console.error("Lỗi AI:", err);
        } finally {
            setIsAiLoading(false);
        }
    };

const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendAi();
        } else if (e.key === 'ArrowUp') {
            // Nhấn mũi tên lên: Lấy câu lệnh cũ hơn
            e.preventDefault(); // Ngăn con trỏ nhảy về đầu dòng
            if (historyIdx < history.length - 1) {
                const nextIdx = historyIdx + 1;
                setHistoryIdx(nextIdx);
                setUserInput(history[nextIdx]);
            }
        } else if (e.key === 'ArrowDown') {
            // Nhấn mũi tên xuống: Lấy câu lệnh mới hơn
            e.preventDefault();
            if (historyIdx > 0) {
                const nextIdx = historyIdx - 1;
                setHistoryIdx(nextIdx);
                setUserInput(history[nextIdx]);
            } else if (historyIdx === 0) {
                setHistoryIdx(-1);
                setUserInput('');
            }
        }
    };
    const renderContent = () => {
        switch (activeTab) {
            case 'policy':
                return (
                    <div className={st('tab-content')}>
                        <h2>Chính sách & Quy định</h2>
                        <div className={st('info-block')}>
                            <h4>1. Chính sách đổi trả</h4>
                            <p>Thời gian đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên tem mác và chưa qua sử dụng.</p>
                        </div>
                        <div className={st('info-block')}>
                            <h4>2. Chính sách bảo hành</h4>
                            <p>Bảo hành 6 tháng đối với các lỗi do nhà sản xuất (bong keo, đứt chỉ...). Không bảo hành lỗi do người sử dụng.</p>
                        </div>
                        <div className={st('info-block')}>
                            <h4>3. Chính sách vận chuyển</h4>
                            <p>Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ. Thời gian giao hàng tiêu chuẩn từ 2-4 ngày làm việc.</p>
                        </div>
                    </div>
                );
            case 'faq':
                return (
                    <div className={st('tab-content')}>
                        <h2>Câu hỏi thường gặp (FAQ)</h2>
                        <div className={st('info-block')}>
                            <h4>Làm sao để chọn size giày chuẩn?</h4>
                            <p>Bạn có thể tham khảo bảng quy đổi size trong trang chi tiết sản phẩm hoặc liên hệ hotline để được tư vấn đo chân.</p>
                        </div>
                        <div className={st('info-block')}>
                            <h4>Tôi có được kiểm tra hàng trước khi nhận không?</h4>
                            <p>Có. Chúng tôi khuyến khích khách hàng kiểm tra sản phẩm trước khi thanh toán cho shipper.</p>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className={st('tab-content')}>
                        <h2>Liên hệ hỗ trợ</h2>
                        <div className={st('info-row')}>
                            <p>Hotline</p>
                            <p className={st('highlight')}>1900 123 456</p>
                        </div>
                        <div className={st('info-row')}>
                            <p>Email</p>
                            <p>support@shopgiay.com</p>
                        </div>
                        <div className={st('info-row')}>
                            <p>Địa chỉ văn phòng</p>
                            <p>123 Đường ABC, Quận 1, TP.HCM</p>
                        </div>
                        <div className={st('info-row')}>
                            <p>Thời gian làm việc</p>
                            <p>8:00 - 21:00 (Tất cả các ngày trong tuần)</p>
                        </div>
{/* --- FORM LIÊN HỆ MỚI --- */}
                        <div className={st('contact-form')}>
                            <h4>Gửi thắc mắc cho chúng tôi</h4>
                            
                            <div className={st('form-group')}>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Họ tên của bạn" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div className={st('form-group')}>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email liên hệ"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className={st('form-group')}>
                                <textarea 
                                    name="content"
                                    rows="4" 
                                    placeholder="Nội dung cần hỗ trợ..."
                                    value={formData.content}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <button 
                                className={st('btn-contact', { disabled: isLoading })} 
                                onClick={handleSendContact}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: 8 }} />
                                        Đang gửi...
                                    </>
                                ) : (
                                    'Gửi yêu cầu hỗ trợ ngay'
                                )}
                            </button>
                        </div>
                        {/* ------------------------- */}
                    </div>                    
                );
                case 'ai-chat':
    return (
        <div className={st('tab-content')}>
            <h2>Hỏi đáp với trợ lý AI</h2>
            <div className={st('ai-chat-container')}>
                <div className={st('chat-window')}>
                    {messages.map((msg, index) => (
                        <div key={index} className={st('chat-bubble', msg.role)}>
                            <div className={st('bubble-content')}>{msg.content}</div>
                        </div>
                    ))}
                    {/* Điểm neo để tự động cuộn */}
                    <div ref={chatEndRef} />
                </div>

                <div className={st('chat-input-group')}>
                    <input 
                        type="text" 
                        placeholder="Hỏi về size, ship, bảo hành..." 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        className={st('btn-send-ai')} 
                        onClick={handleSendAi}
                        disabled={isAiLoading}
                    >
                        {isAiLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPaperPlane} />}
                    </button>
                </div>
            </div>
        </div>
    );
            default:
                return null;
        }
        
    };

return (
        <div className="container" style={{ marginTop: 20, marginBottom: 40 }}>
            {/* Giữ nguyên phần Header */}
            <div className="row">
                <div className="col-md-12">
                    <div className={st('support-header')}>
                        <h3>Trung tâm hỗ trợ khách hàng</h3>
                        <p>Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn</p>
                    </div>
                </div>
            </div>

            {/* Giữ nguyên phần Layout chia cột */}
            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-md-3">
                    <div className={st('support-menu')}>
                        <div 
                            className={st('menu-item', { active: activeTab === 'ai-chat' })}
                            onClick={() => setActiveTab('ai-chat')}
                        >
                            <span>
                                <FontAwesomeIcon icon={faRobot} className={st('icon-left')} />
                                Hỏi đáp AI
                            </span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                        <div 
                            className={st('menu-item', { active: activeTab === 'policy' })}
                            onClick={() => setActiveTab('policy')}
                        >
                            <span>
                                <FontAwesomeIcon icon={faShieldHalved} className={st('icon-left')} />
                                Chính sách
                            </span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>

                        <div 
                            className={st('menu-item', { active: activeTab === 'faq' })}
                            onClick={() => setActiveTab('faq')}
                        >
                            <span>
                                <FontAwesomeIcon icon={faCircleQuestion} className={st('icon-left')} />
                                Câu hỏi thường gặp
                            </span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>

                        <div 
                            className={st('menu-item', { active: activeTab === 'contact' })}
                            onClick={() => setActiveTab('contact')}
                        >
                            <span>
                                <FontAwesomeIcon icon={faHeadset} className={st('icon-left')} />
                                Liên hệ
                            </span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </div>
                </div>

                <div className="col-md-9" style={{ paddingRight: 0 }}>
                    <div className={st('support-content')}>
                        {renderContent()}
                    </div>
                </div>
            </div>
            {popup.show && (
            <div className={st('modal-overlay')} onClick={closePopup}>
                <div className={st('modal-box', popup.type)} onClick={(e) => e.stopPropagation()}>
                    <button className={st('modal-close')} onClick={closePopup}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                    
                    <div className={st('modal-icon')}>
                        {popup.type === 'success' && <FontAwesomeIcon icon={faCheckCircle} />}
                        {popup.type === 'error' && <FontAwesomeIcon icon={faTimesCircle} />}
                        {popup.type === 'warning' && <FontAwesomeIcon icon={faExclamationTriangle} />}
                    </div>

                    <h4 className={st('modal-title')}>
                        {popup.type === 'success' ? 'Thành công' : 
                         popup.type === 'error' ? 'Thất bại' : 'Lưu ý'}
                    </h4>
                    
                    <p className={st('modal-msg')}>{popup.message}</p>

                    <button className={st('btn-modal-ok')} onClick={closePopup}>
                        Đã hiểu
                    </button>
                </div>
            </div>
        )}
        </div>
        
    );
}

export default Support;