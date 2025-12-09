import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { getAllDeliveryMethods, getAllPaymentMethods, getProductBySizeId } from '~/data/services';
import styles from './style.module.scss';

const st = classNames.bind(styles);

function DetailOrderHistory() {
    const { id } = useParams();
    const orderProducts = useSelector((state) => state.shopping.orderHistory.find((order) => order.id === Number(id)));
    console.log(orderProducts);
    const deliveryMethods = getAllDeliveryMethods();
    const paymentMethods = getAllPaymentMethods();

    const getDeliveryName = (deliveryId) => deliveryMethods.find((d) => d.id === deliveryId)?.name || 'Không xác định';
    const getPaymentName = (paymentId) => paymentMethods.find((p) => p.id === paymentId)?.name || 'Không xác định';

    if (!orderProducts) {
        return <div className="alert alert-info text-center mt-5">Không tìm thấy đơn hàng.</div>;
    }

    const totalPrice = orderProducts.totalPrice || 0;
    const shippingFee = orderProducts.shippingFee || 0;
    const orderStatusHistory = orderProducts.orderStatusHistory || [];
    const items = orderProducts.items || [];

    return (
        <div className={st('detail-order-history')}>
            <div className="container">
                <h3 className="text-center mb-4">Order Detail {orderProducts.id}</h3>

                <div className="row">
                    {/* Thông tin đơn hàng */}
                    <div className="col-md-6 col-sm-12 mb-4">
                        <div className={st('order-summary', 'p-3', 'border', 'rounded')}>
                            <h4 className={'fw-bold'}>Thông tin đơn hàng</h4>
                            <p>
                                <strong>Ngày đặt hàng:</strong> {new Date(orderProducts.date).toLocaleString()}
                            </p>
                            <p>
                                <strong>Tổng số tiền:</strong> {totalPrice.toLocaleString()}₫
                            </p>
                            <p>
                                <strong>Phí giao hàng:</strong> {shippingFee.toLocaleString()}₫
                            </p>
                            <p>
                                <strong>Hình thức giao hàng:</strong> {getDeliveryName(orderProducts.deliveryId)}
                            </p>
                            <p>
                                <strong>Hình thức thanh toán:</strong> {getPaymentName(orderProducts.paymentId)}
                            </p>
                        </div>
                    </div>

                    {/* Tiến độ đơn hàng */}
                    <div className="col-md-6 col-sm-12 mb-4">
                        <h4>Tiến độ đơn hàng</h4>
                        {orderStatusHistory.map((status, idx) => (
                            <div key={idx} className={st('order-status', 'd-flex', 'mb-3')}>
                                <div className={st('timeLine', 'me-3')}>{new Date(status.time).toLocaleString()}</div>
                                <div className={st('info')}>
                                    <div>{status.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bảng sản phẩm */}
                <div className={st('product-table-container', 'mt-4')}>
                    <table className={st('product-table', 'table', 'table-bordered', 'table-striped')}>
                        <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Màu</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.reverse().map((item, idx) => {
                                const productInfo = getProductBySizeId(item.sizeId);
                                console.log(productInfo);
                                return (
                                    <tr key={idx}>
                                        <td>
                                            {productInfo?.image && (
                                                <img
                                                    src={productInfo.image}
                                                    alt={productInfo.nameProduct}
                                                    className={st('product-image')}
                                                />
                                            )}
                                        </td>
                                        <td>{productInfo?.nameProduct || 'Không xác định'}</td>
                                        <td>{productInfo?.nameColor || 'Không xác định'}</td>
                                        <td>{productInfo?.nameSize || 'Không xác định'}</td>
                                        <td>{(productInfo?.discountPrice || 0).toLocaleString()}₫</td>
                                        <td>{item.quantity}</td>
                                        <td>{((productInfo?.discountPrice || 0) * item.quantity).toLocaleString()}₫</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DetailOrderHistory;
