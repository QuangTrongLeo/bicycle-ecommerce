import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';
import { SearchBox } from '~/components/Input';

import {
    getAllProductsFullPaginate,
    getTopCategoriesBySold,
    getProductsByCategoryPaginate,
    getColors,
} from '~/data/services';

const st = classNames.bind(styles);

function Category_Demo() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [query, setQuery] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [color, setColor] = useState(searchParams.get('color') || '');

    const [categories, setCategories] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedColorByProduct, setSelectedColorByProduct] = useState({});

    useEffect(() => {
        setAvailableColors(getColors());
    }, []);

    useEffect(() => {
        const top = getTopCategoriesBySold(3);
        setCategories(top);
    }, []);

    useEffect(() => {
        let res;

        if (category) {
            res = getProductsByCategoryPaginate(category, page, 8);
        } else {
            res = getAllProductsFullPaginate(page, 8);
        }

        let list = res.data;

        // SEARCH
        if (query.trim() !== '') {
            list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
        }

        // FILTER COLOR
        if (color.trim() !== '') {
            list = list.filter((p) => p.colors?.some((c) => String(c.colorHex).toLowerCase() === color.toLowerCase()));
        }

        setData(list);
        setTotalPages(res.totalPages);
    }, [page, query, category, color]);

    const onSearch = (value) => {
        setQuery(value);
        setPage(1);

        setSearchParams({
            search: value,
            page: 1,
            ...(category && { category }),
            ...(color && { color }),
        });
    };

    const onSelectCategory = (id) => {
        setCategory(id);
        setPage(1);

        setSearchParams({
            ...(id && { category: id }),
            page: 1,
            ...(query && { search: query }),
            ...(color && { color }),
        });
    };

    const onSelectColor = (hex) => {
        const newValue = hex === color ? '' : hex;

        setColor(newValue);
        setPage(1);

        setSearchParams({
            ...(category && { category }),
            ...(query && { search: query }),
            ...(newValue && { color: newValue }),
            page: 1,
        });
    };

    return (
        <div className={st('collection')}>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div className={st('filter')}>
                            <p className={st('filter-title')}>Nhóm sản phẩm</p>

                            <div className={st('filter-group')}>
                                <label>
                                    <input
                                        type="radio"
                                        name="cate"
                                        checked={String(category) === ''}
                                        onChange={() => onSelectCategory('')}
                                    />
                                    Tất cả sản phẩm
                                </label>

                                {categories.map((cate) => (
                                    <label key={cate.id}>
                                        <input
                                            type="radio"
                                            name="cate"
                                            checked={String(category) === String(cate.id)}
                                            onChange={() => onSelectCategory(cate.id)}
                                        />
                                        {cate.name}
                                    </label>
                                ))}
                            </div>

                            {/* COLOR FILTER */}
                            <p className={st('filter-title')}>Màu sắc</p>

                            <div className={st('filter-color')}>
                                {availableColors.map((item) => (
                                    <div className={st('color-item')} key={item.id}>
                                        <button
                                            style={{ backgroundColor: item.code }}
                                            className={color === item.code ? st('active-color') : ''}
                                            onClick={() => onSelectColor(item.code)}></button>
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ================= PRODUCT LIST ================= */}
                    <div className="col-md-10">
                        <div className={st('product-list')}>
                            <SearchBox value={query} onSearch={onSearch} placeholder="Tìm kiếm sản phẩm..." />

                            <div className="row">
                                {data.map((p) => {
                                    // lấy màu được chọn hoặc mặc định màu đầu tiên
                                    const selectedId = selectedColorByProduct[p.id];
                                    const selectedColor = p.colors.find((c) => c.id === selectedId) || p.colors[0];

                                    return (
                                        <div className="col-md-3" key={p.id}>
                                            <div className={st('card')}>
                                                <div className={st('card-img')}>
                                                    <Link to={`/detail/${p.id}`}>
                                                        <img src={selectedColor.images?.[0]} alt={p.name} />
                                                    </Link>

                                                    <div className={st('card-size')}>
                                                        {selectedColor.sizes?.map((s) => (
                                                            <button key={s.id}>{s.size}</button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* COLOR BUTTONS */}
                                                <div className={st('card-color')}>
                                                    {p.colors?.map((c) => (
                                                        <button
                                                            key={c.id}
                                                            style={{ background: c.colorHex }}
                                                            onClick={() =>
                                                                setSelectedColorByProduct((prev) => ({
                                                                    ...prev,
                                                                    [p.id]: c.id,
                                                                }))
                                                            }></button>
                                                    ))}
                                                </div>

                                                <p className={st('card-name')}>{p.name}</p>

                                                <div className={st('card-price')}>
                                                    <span className={st('price')}>{p.price.toLocaleString()}đ</span>

                                                    {p.discount > 0 && (
                                                        <>
                                                            <span className={st('discount')}>{p.discount}%</span>

                                                            <span className={st('old')}>
                                                                {(p.price * (1 + p.discount / 100)).toLocaleString()}đ
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* PAGINATION */}
                            {data.length > 0 && totalPages > 1 && (
                                <div className={st('pagination')}>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                        <button
                                            key={n}
                                            className={page === n ? st('active') : ''}
                                            onClick={() => {
                                                setPage(n);
                                                setSearchParams({
                                                    page: n,
                                                    ...(query && { search: query }),
                                                    ...(category && { category }),
                                                    ...(color && { color }),
                                                });
                                            }}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category_Demo;
