// OrderHistory.jsx
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';
import { getProductBySizeId, getAllDeliveryMethods, getAllPaymentMethods } from '~/data/services';
const st = classNames.bind(styles);

function OrderHistory() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const userId = currentUser?.id;

    const allOrderHistory = useSelector((state) => state.shopping.orderHistory);
    const deliveryMethods = getAllDeliveryMethods();
    const paymentMethods = getAllPaymentMethods();

    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getDeliveryName = (id) => deliveryMethods.find((d) => d.id === id)?.name || 'Không xác định';
    const getPaymentName = (id) => paymentMethods.find((p) => p.id === id)?.name || 'Không xác định';

    // Lọc đơn hàng của user hiện tại
    const userOrders = allOrderHistory.filter((order) => order.userId === userId);
    console.log(userOrders);

    // Filter theo trạng thái
    const filteredOrders = useMemo(() => {
        if (filterStatus === 'all') {
            return userOrders;
        }
        return userOrders.filter((order) => {
            const lastStatus = order.orderStatusHistory?.[order.orderStatusHistory.length - 1]?.status;
            return lastStatus === filterStatus;
        });
    }, [userOrders, filterStatus]);

    // Sort theo ngày mới nhất trước
    const sortedOrders = useMemo(() => {
        return [...filteredOrders].sort((a, b) => {
            // Sort theo date nếu có, nếu không thì sort theo id
            if (a.date && b.date) {
                return new Date(b.date) - new Date(a.date);
            }
            return b.id - a.id;
        });
    }, [filteredOrders]);

    // Phân trang
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedOrders, currentPage]);

    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

    const statusTabs = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Đang xử lý', value: 'processing' },
        { label: 'Đang giao', value: 'shipping' },
        { label: 'Thất bại', value: 'failed' },
        { label: 'Hoàn thành', value: 'completed' },
    ];

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className={st('order-history-page')}>
            <div className={st('container')}>
                <h1 className="text-center mb-4 fw-bold">Quản lí đơn hàng</h1>

                {/* Status Tabs */}
                <div className={st('status-tabs')}>
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.value}
                            className={`btn ${filterStatus === tab.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => {
                                setFilterStatus(tab.value);
                                setCurrentPage(1);
                            }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Order List */}
                <div className={st('order-list')}>
                    {paginatedData.length === 0 ? (
                        <div className="alert alert-info text-center">Chưa có đơn hàng nào.</div>
                    ) : (
                        paginatedData.map((order) => {
                            const totalPrice =
                                order.items?.reduce((sum, item) => {
                                    const sizeInfo = getProductBySizeId(item.sizeId);
                                    return sum + (sizeInfo?.finalPrice || 0) * item.quantity;
                                }, 0) || 0;

                            const lastStatus = order.orderStatusHistory?.[order.orderStatusHistory.length - 1];

                            return (
                                <div key={order.id} className="card mb-4">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title mb-0">Order ID: {order.id}</h5>
                                            <span className="badge bg-info">
                                                {lastStatus?.status || 'Không xác định'}
                                            </span>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-md-3">
                                                <div className="text-muted small">Ngày đặt hàng</div>
                                                <div>{order.date ? new Date(order.date).toLocaleString() : 'N/A'}</div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="text-muted small">Phương thức giao hàng</div>
                                                <div>{getDeliveryName(order.deliveryId)}</div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="text-muted small">Phương thức thanh toán</div>
                                                <div>{getPaymentName(order.paymentId)}</div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="text-muted small">Tổng tiền</div>
                                                <div className="fw-bold">{totalPrice.toLocaleString()}₫</div>
                                            </div>
                                        </div>

                                        <table className="table">
                                            <colgroup>
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                                <col />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Màu</th>
                                                    <th>Kích thước</th>
                                                    <th>Số lượng</th>
                                                    <th>Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items?.map((item, index) => {
                                                    const sizeInfo = getProductBySizeId(item.sizeId);
                                                    if (!sizeInfo) return null;

                                                    return (
                                                        <tr key={index}>
                                                            <td title={sizeInfo.nameProduct}>{sizeInfo.nameProduct}</td>
                                                            <td>{sizeInfo.nameColor}</td>
                                                            <td>{sizeInfo.nameSize}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{sizeInfo.finalPrice}₫</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                        <div className="mt-2 text-end">
                                            <Link to={`/detail-order-history/${order.id}`}>
                                                <button className="btn btn-primary">Xem chi tiết đơn hàng</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 0 && (
                    <div className={st('pagination-wrapper')}>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}>
                            &laquo; Trước
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => handlePageChange(page)}>
                                {page}
                            </button>
                        ))}
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                            Tiếp &raquo;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;
