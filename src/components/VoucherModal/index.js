import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useState } from 'react';
import { formatDateVN } from '~/utils';
import { getVoucherById } from '~/data/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircle } from '@fortawesome/free-solid-svg-icons';

const st = classNames.bind(styles);

function VoucherModal({ vouchers = [], totalProductAmount = 0, onConfirm }) {
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const selectedVoucher = selectedVoucherId ? getVoucherById(selectedVoucherId) : null;
    const today = new Date();

    const isVoucherValid = (voucher) => {
        const start = new Date(voucher.startDate);
        const end = new Date(voucher.endDate);
        return voucher.quantity > 0 && today >= start && today <= end;
    };

    const calculateDiscount = () => {
        if (!selectedVoucher) return 0;
        const discount = (totalProductAmount * selectedVoucher.discountPercent) / 100;
        return Math.min(discount, selectedVoucher.maxDiscount);
    };

    const handleConfirm = () => {
        onConfirm({
            voucherId: selectedVoucherId,
            discountAmount: calculateDiscount(),
        });
    };

    return (
        <div className={st('modal', 'fade')} id="voucherModal" tabIndex="-1" aria-hidden="true">
            <div className={st('modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable')}>
                <div className={st('modal-content')}>
                    {/* HEADER */}
                    <div className={st('modal-header')}>
                        <h5 className={st('modal-title', 'fw-bold')}>Voucher giảm giá sản phẩm</h5>
                        <button type="button" className={st('btn-close')} data-bs-dismiss="modal" />
                    </div>

                    {/* BODY */}
                    <div className={st('modal-body')} style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        {vouchers.length === 0 && <p>Hiện không có voucher</p>}

                        {vouchers.map((voucher) => {
                            const valid = isVoucherValid(voucher);
                            const isSelected = selectedVoucherId === voucher.id;

                            return (
                                <div
                                    key={voucher.id}
                                    className={classNames(
                                        st('voucher-item'),
                                        'border rounded p-2 mb-2 d-flex align-items-center',
                                        {
                                            'border-primary': isSelected,
                                            'opacity-50': !valid,
                                        }
                                    )}
                                    style={{ cursor: valid ? 'pointer' : 'not-allowed' }}
                                    onClick={() => valid && setSelectedVoucherId(isSelected ? null : voucher.id)}>
                                    {/* RADIO */}
                                    <input
                                        type="radio"
                                        className={st('form-check-input', 'me-2')}
                                        checked={isSelected}
                                        readOnly
                                    />

                                    {/* CONTENT */}
                                    <div className={st('flex-grow-1')}>
                                        <div className={st('fw-bold', 'd-flex', 'align-items-center')}>
                                            <span>Giảm {voucher.discountPercent}% </span>
                                            <FontAwesomeIcon icon={faCircle} className={st('dot')} />
                                            <span>Tối đa {voucher.maxDiscount.toLocaleString()}đ</span>
                                        </div>
                                        <div className={st('text-muted', 'small', 'd-flex', 'align-items-center')}>
                                            <span>SL: {voucher.quantity}</span>
                                            <FontAwesomeIcon icon={faCircle} className={st('dot')} />
                                            <span>
                                                {formatDateVN(voucher.startDate)}
                                                <FontAwesomeIcon icon={faArrowRight} className={st('mx-1')} />
                                                {formatDateVN(voucher.endDate)}
                                            </span>
                                        </div>

                                        {/* KHÔNG KHẢ DỤNG */}
                                        {!valid && (
                                            <div className={st('text-danger', 'small', 'mt-1')}>
                                                Voucher không khả dụng
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* FOOTER */}
                    <div className={st('modal-footer', 'd-flex', 'justify-content-between')}>
                        <div>
                            <div>
                                Giảm giá:{' '}
                                <span className={st('text-danger', 'fw-bold')}>
                                    {calculateDiscount().toLocaleString()}đ
                                </span>
                            </div>
                            <div>
                                Tổng thanh toán:{' '}
                                <span className={st('text-success', 'fw-bold')}>
                                    {(totalProductAmount - calculateDiscount()).toLocaleString()}đ
                                </span>
                            </div>
                        </div>

                        <button
                            className={st('btn', 'btn-primary')}
                            data-bs-dismiss="modal"
                            disabled={!selectedVoucherId}
                            onClick={handleConfirm}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherModal;
