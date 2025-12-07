import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
const st = classNames.bind(styles);

function OrderDetail() {
    const { orderId } = useParams(); // Lấy ID từ URL
    const orderProducts = useSelector((state) => state.shopping.orderHistory.find((o) => o.id.toString() === orderId));

    if (!orderProducts) {
        return <div className="alert alert-info text-center mt-5">Không tìm thấy đơn hàng.</div>;
    }

    return (
        <div className={st('order-detail-page')}>
            <div className="container mt-5">
                <h3 className="text-center mb-4">Chi tiết đơn hàng #{orderProducts.id}</h3>

                <div className="row">
                    {/* Thông tin đơn hàng */}
                    <div className="col-md-6 col-sm-12 mb-4">
                        <div className={st('order-summary', 'p-3', 'border', 'rounded')}>
                            <h4>Thông tin đơn hàng</h4>
                            <p>
                                <strong>Ngày đặt hàng:</strong> {new Date(orderProducts.orderDate).toLocaleString()}
                            </p>
                            <p>
                                <strong>Tổng số tiền:</strong> {orderProducts.totalPrice.toLocaleString()}₫
                            </p>
                            <p>
                                <strong>Phương thức thanh toán:</strong> {orderProducts.paymentName}
                            </p>
                            <p>
                                <strong>Phương thức giao hàng:</strong> {orderProducts.deliveryName}
                            </p>
                            <p>
                                <strong>Phí giao hàng:</strong> {orderProducts.deliveryPrice}₫
                            </p>
                            <p>
                                <strong>Địa chỉ nhận hàng:</strong> {orderProducts.deliveryAddress}
                            </p>
                        </div>
                    </div>

                    {/* Tiến độ đơn hàng */}
                    <div className="col-md-6 col-sm-12 mb-4">
                        <h4>Tiến độ đơn hàng</h4>
                        {orderProducts.statusModels.map((status, idx) => (
                            <div key={idx} className={st('order-status', 'd-flex', 'mb-3')}>
                                <div className={st('timeLine', 'me-3')}>
                                    {new Date(status.timeline).toLocaleString()}
                                </div>
                                <div className={st('info')}>
                                    <div>{status.name}</div>
                                    <div>{status.description}</div>
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
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Colors</th>
                                <th>Sizes</th>
                                <th>Quantity</th>
                                <th>Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderProducts.productModels.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price.toLocaleString()}₫</td>
                                    <td>{product.discount}%</td>
                                    <td>
                                        {product.colorModels.map((color) => (
                                            <div
                                                key={color.id}
                                                className={st('color-box', 'd-flex', 'align-items-center', 'mb-1')}>
                                                <span>{color.name}</span>
                                                <span
                                                    className={st('color-boxSpan', 'ms-2')}
                                                    style={{
                                                        backgroundColor: color.hexCode,
                                                        width: '20px',
                                                        height: '20px',
                                                        display: 'inline-block',
                                                        borderRadius: '50%',
                                                    }}></span>
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {product.colorModels.map((color) =>
                                            color.sizeModels.map((size) => <div key={size.id}>{size.size}</div>)
                                        )}
                                    </td>
                                    <td>{product.purchaseQuantity}</td>
                                    <td>
                                        {product.colorModels.map((color) =>
                                            color.imageModels.map((image) => (
                                                <img
                                                    key={image.id}
                                                    src={`data:image/png;base64,${image.imageBase64}`}
                                                    alt={product.name}
                                                    className={st('product-image', 'me-1', 'mb-1')}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                            ))
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
