import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { getAllDeliveryMethods, getAllPaymentMethods } from '~/data/services';
import { paginateData } from '~/utils/paginate';

import styles from './style.module.scss';
const st = classNames.bind(styles);

function OrderHistory() {
    const orderHistory = useSelector((state) => state.shopping.orderHistory);
    const deliveryMethods = getAllDeliveryMethods();
    const paymentMethods = getAllPaymentMethods();

    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getDeliveryName = (id) => deliveryMethods.find((d) => d.id === id)?.name || 'Không xác định';
    const getPaymentName = (id) => paymentMethods.find((p) => p.id === id)?.name || 'Không xác định';

    const filteredOrders =
        filterStatus === 'all'
            ? orderHistory
            : orderHistory.filter(
                  (order) => order.orderStatusHistory?.[order.orderStatusHistory.length - 1]?.status === filterStatus
              );
    const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);
    const { paginatedData, totalPages } = paginateData(filteredOrders, currentPage, itemsPerPage, sortByDateDesc);

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
                            const lastStatus = order.orderStatusHistory?.[order.orderStatusHistory.length - 1];
                            return (
                                <div key={order.id} className="card mb-4">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-2 text-center">
                                                <div className="text-muted">Ngày mua</div>
                                                <div>{new Date(order.date).toLocaleString()}</div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="text-muted">Phương thức</div>
                                                <div>{getDeliveryName(order.deliveryId)}</div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="text-muted">Thanh toán</div>
                                                <div className="text-success">{getPaymentName(order.paymentId)}</div>
                                            </div>
                                            <div className="col-md-1 text-center">
                                                <div className="text-muted">Tổng tiền</div>
                                                <div>{order.totalPrice.toLocaleString()}₫</div>
                                            </div>
                                            <div className="col-md-1 text-center">
                                                <div className="text-muted">Trạng thái</div>
                                                <div>{lastStatus?.status}</div>
                                            </div>
                                            <div className="col-md-2 text-center">
                                                <Link to={`/detail-order-history/${order.id}`}>
                                                    <button className="btn btn-primary">Xem chi tiết đơn hàng</button>
                                                </Link>
                                            </div>
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
