import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './style.module.scss';
import { SearchBox } from '~/components/Input';

const st = classNames.bind(styles);

function Collection() {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

    const colors = [
        { c: 'red', n: 'Đỏ' },
        { c: 'blue', n: 'Xanh' },
        { c: 'yellow', n: 'Vàng' },
        { c: 'green', n: 'Xanh lá' },
        { c: 'black', n: 'Đen' },
        { c: 'white', n: 'Trắng' },
        { c: 'pink', n: 'Hồng' },
    ];

    const products = Array.from({ length: 8 });

    return (
        <div className={st('page')}>
            <div className="container">
                <div className="row">
                    {/* ----------------- SIDEBAR ----------------- */}
                    <div className="col-md-2">
                        <div className={st('filter')}>
                            {/* Nhóm sản phẩm */}
                            <p className={st('filter-title')}>Nhóm sản phẩm</p>
                            <div className={st('filter-group')}>
                                {['Giày Nam', 'Giày Nữ', 'Giày Trẻ Em'].map((g) => (
                                    <label key={g}>
                                        <input
                                            type="radio"
                                            name="g"
                                            checked={selectedGroup === g}
                                            onChange={() => setSelectedGroup(g)}
                                        />
                                        {g}
                                    </label>
                                ))}
                            </div>

                            {/* Kích cỡ */}
                            <p className={st('filter-title')}>Kích cỡ</p>
                            <div className={st('filter-size')}>
                                {sizes.map((s) => (
                                    <button
                                        key={s}
                                        className={selectedSize === s ? st('active') : ''}
                                        onClick={() => setSelectedSize(s)}>
                                        {s}
                                    </button>
                                ))}
                            </div>

                            {/* Màu sắc */}
                            <p className={st('filter-title')}>Màu sắc</p>
                            <div className={st('filter-color')}>
                                {colors.map((item) => (
                                    <div className={st('color-item')} key={item.c}>
                                        <button
                                            style={{ backgroundColor: item.c }}
                                            className={selectedColor === item.c ? st('active-color') : ''}
                                            onClick={() => setSelectedColor(item.c)}></button>
                                        <p>{item.n}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ----------------- PRODUCT LIST ----------------- */}
                    <div className="col-md-10">
                        <div className={st('product-list')}>
                            {/* SEARCH BAR */}
                            <SearchBox />

                            {/* PRODUCT GRID */}
                            <div className="row">
                                {products.map((_, i) => (
                                    <div className="col-md-3" key={i}>
                                        <div className={st('card')}>
                                            <div className={st('card-img')}>
                                                <img src="/assets/homeImages/10.jpg" alt="" />

                                                <div className={st('card-size')}>
                                                    {['S', 'M', 'L', 'XL', '2XL'].map((s) => (
                                                        <button key={s}>{s}</button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className={st('card-color')}>
                                                {['#e4e4e4', '#292929', '#27262b'].map((c) => (
                                                    <button key={c} style={{ background: c }}></button>
                                                ))}
                                            </div>

                                            <p className={st('card-name')}>Iphone 13 Pro Max lorem ipsum</p>

                                            <div className={st('card-price')}>
                                                <span className={st('price')}>30.000đ</span>
                                                <span className={st('discount')}>10%</span>
                                                <span className={st('old')}>20.000đ</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* PAGINATION */}
                            <div className={st('pagination')}>
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button key={n}>{n}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;
