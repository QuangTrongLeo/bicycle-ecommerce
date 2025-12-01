import classNames from 'classnames/bind';
import styles from './style.module.scss';
import React, { useRef, useState, useEffect } from 'react';
const st = classNames.bind(styles);

function CenterHorizontalScroll({ children }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Hàm scroll mượt
    const smoothScroll = (element, target, duration = 500) => {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            element.scrollLeft = start + change * progress;
            if (progress < 1) requestAnimationFrame(animateScroll);
        };

        requestAnimationFrame(animateScroll);
    };

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const card = container.firstElementChild;
        if (!card) return;

        const style = window.getComputedStyle(card);
        const gap = parseInt(style.marginRight) || 16;
        const scrollAmount = card.offsetWidth + gap;
        const target = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

        smoothScroll(container, target, 300);
    };

    // Cập nhật trạng thái nút trái/phải
    const updateButtons = () => {
        const container = scrollRef.current;
        if (!container) return;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        container.addEventListener('scroll', updateButtons);
        updateButtons();
        return () => container.removeEventListener('scroll', updateButtons);
    }, []);

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
