// Toast.jsx
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

const st = classNames.bind(styles);

function SingleToast({ message, id, onClose }) {
    console.log(message, id);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => setIsShow(true), 50);
        const hideTimer = setTimeout(() => setIsShow(false), 3000);
        const cleanupTimer = setTimeout(() => onClose(id), 3500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            clearTimeout(cleanupTimer);
        };
    }, [id, onClose]);

    return <div className={st('toast-item', { show: isShow, hide: !isShow })}>{message}</div>;
}

function Toast() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (event) => {
            const id = Date.now() + Math.random();
            setToasts([{ id, message: event.detail.message }]);
        };

        window.addEventListener('showToast', handleToast);
        return () => window.removeEventListener('showToast', handleToast);
    }, []);

    const handleClose = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <div className={st('toast-container')}>
            {toasts.map((toast, index) => (
                <SingleToast key={toast.id} id={toast.id} message={toast.message} index={index} onClose={handleClose} />
            ))}
        </div>
    );
}

// Export function để show toast
export const showToast = (message) => {
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message } }));
};

export default Toast;
