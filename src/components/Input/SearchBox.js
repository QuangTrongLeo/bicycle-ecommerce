import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBox.module.scss';
const st = classNames.bind(styles);

function SearchBox({ onSearch }) {
    const [focus, setFocus] = useState(false);
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <div className={st('search-box')} style={{ border: focus ? '1px solid #007bff' : '1px solid #ced4da' }}>
            <input
                type="text"
                value={text}
                placeholder=" "
                className={st('search-input')}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={handleChange}
            />

            <label className={st('search-label')}>Tìm kiếm</label>

            <FontAwesomeIcon icon={faSearch} className={st('search-icon')} />
        </div>
    );
}

export default SearchBox;
