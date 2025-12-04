import classNames from 'classnames/bind';
import styles from './style.module.scss';
import React, { useRef, useState, useEffect } from 'react';

// Khởi tạo classNames bind
const st = classNames.bind(styles);

function CenterHorizontalScroll({ children }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Hàm scroll mượt
    const smoothScroll = (element, target, duration = 250) => {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Sử dụng một hàm easing đơn giản (vd: cubic-out)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            element.scrollLeft = start + change * easeProgress;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                updateButtons();
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;

        // CẦN LẤY CARD CON ĐẦU TIÊN TRONG center-wrapper
        const centerWrapper = container.querySelector(`.${st('center-wrapper')}`);
        const card = centerWrapper ? centerWrapper.firstElementChild : null;

        if (!card) return;

        // Giả định GAP là 16px (theo CSS của .center-wrapper)
        const gap = 16;
        const scrollAmount = card.offsetWidth + gap;

        // Tính toán mục tiêu cuộn
        let target = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

        // Giới hạn target
        if (target < 0) target = 0;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (target > maxScroll) target = maxScroll;

        smoothScroll(container, target);
    };

    // Cập nhật trạng thái nút trái/phải
    const updateButtons = () => {
        const container = scrollRef.current;
        if (!container) return;

        // Sử dụng Math.ceil và làm tròn để tránh lỗi số lẻ/floating point
        const scrollLeft = Math.ceil(container.scrollLeft);
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        // Nút trái: hiện khi đã cuộn qua vị trí 0
        setCanScrollLeft(scrollLeft > 0);

        // Nút phải: hiện khi chưa cuộn đến cuối cùng (trừ 1-2 pixel sai số)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    };

    // Thiết lập listener cho scroll và resize
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        container.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();

        return () => {
            container.removeEventListener('scroll', updateButtons);
            window.removeEventListener('resize', updateButtons);
        };
    }, [children]);

    return (
        <div className={st('container')}>
            {canScrollLeft && (
                <button className={st('scroll-btn', 'left')} onClick={() => scroll('left')}>
                    &#10094;
                </button>
            )}
            <div className={st('scroll-wrapper')} ref={scrollRef}>
                <div className={st('center-wrapper')}>{children}</div>
            </div>
            {canScrollRight && (
                <button className={st('scroll-btn', 'right')} onClick={() => scroll('right')}>
                    &#10095;
                </button>
            )}
        </div>
    );
}

export default CenterHorizontalScroll;
