import React, { useRef, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

const st = classNames.bind(styles);

function MainHorizontalScroll({ children }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = useCallback((direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const card = container.firstElementChild;
        if (!card) return;

        // Lấy width + margin-right của item
        const cardWidth = card.getBoundingClientRect().width;
        const style = window.getComputedStyle(card);
        const margin = parseInt(style.marginRight) || 16;

        const scrollAmount = cardWidth + margin;

        const target = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

        // Scroll native mượt ngay lập tức
        container.scrollTo({
            left: target,
            behavior: 'smooth',
        });
    }, []);

    const updateButtons = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 1);
        setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 1);
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => updateButtons();
        container.addEventListener('scroll', handleScroll, { passive: true });

        updateButtons();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [updateButtons]);

    return (
        <div className={st('container')}>
            {canScrollLeft && (
                <button className={st('scroll-btn', 'left')} onClick={() => scroll('left')}>
                    &#10094;
                </button>
            )}

            <div className={st('scroll-wrapper')} ref={scrollRef}>
                {children}
            </div>

            {canScrollRight && (
                <button className={st('scroll-btn', 'right')} onClick={() => scroll('right')}>
                    &#10095;
                </button>
            )}
        </div>
    );
}

export default MainHorizontalScroll;
