import { setItem } from "localforage";
import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";
import CheckOutPage from "./CheckOutPage";

const CartPage = () => {
  // cartItems: lưu trữ danh sách các mặt hàng có trong giỏ hàng
  // setcartItems = hàm được dùng để cập nhật lại giá trị của setcartItems
  const [cartItems, setcartItems] = useState([]);

  // fetch cart item from local stroge
  // useEffect để lấy dữ liệu từ localStorage

  useEffect(() => {
    // lấy dữ liệu giỏ hàng(cart) từ localStorage nơi dữ liệu giỏ hàng đã được lưu trữ trước đó
    // Và chuyển đổi nó từ dạng JSON về dạng mảng Javascript bằng JSON.PARSE
    const storedCartItems = JSON.parse(localStorage.getItem("cart"));

    setcartItems(storedCartItems);
  }, []);

  // calculate price
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // handle quantity increase
  const handleIncrease = (item) => {
    item.quantity += 1;
    // cập nhật lại trạng thái giỏ hàng bằng cách gọi setcartItems([...cartItems])
    setcartItems([...cartItems]);
    // giỏ hàng mới được lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  // handle quantity decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
    setcartItems([...cartItems]);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  // hand item remove
  const handleRemoveItem = (item) => {
    const updateCart = cartItems.filter(
      (cartItems) => cartItems.id !== item.id
    );
    setcartItems(updateCart);
    updateLocalStorage(updateCart);
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // reduce() là 1 phương thức mảng dùng để tính toán giá trị duy nhất
  // trong trường hợp này là tính tổng giá trị trong giỏ hàng
  // reduce nhận vào 2 tham số: 1 hàm callback() và giá trị khởi tạo =0
  // hàm callback() có 2 tham số: total và item.
  // +) Total: ban đầu giá trị này là 0 do chúng ta truyền vào 0 ở tham số thứ 2
  // +) item: mỗi phần tử trong mảng cartItems(mỗi sản phẩm trong giỏ hàng)
  // const cartSubtotal = cartItems.reduce((total, item) => {
  //   return total + calculateTotalPrice(item);
  // }, 0);
  // Tính tổng: Trong mỗi lần lặp qua mảng, hàm callback
  // lấy giá trị total hiện tại cộng thêm cho tổng giá trị của mỗi sản phẩm được định nghĩa ở hàm calculateTotalPrice
  // sau khi reduce thực hiện xong việc lặp tất cả các phần tử trong cartItems, cartSubtotal sẽ chứa tổng giá trị của tất cả các mặt hàng có trong giỏ hàng
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);
  // sau khi tính toán xong tổng giá trị giỏ hàng được gàn cho tổng giá trị đơn hàng

  const orderTotal = cartSubtotal;

  return (
    <div>
      <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* Cart top */}
            <div className="cart-top">
              <table>
                {/* TABLE HEADER */}
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                {/* TABLE BODY */}
                <tbody>
                  {cartItems.map((item, indx) => (
                    <tr key={indx}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to="/shop">
                            <img src={item.img}></img>
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to="/shop">{item.name}</Link>
                        </div>
                      </td>

                      <td className="cat-price">${item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                          ></input>
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>

                      <td className="cat-topice">
                        ${calculateTotalPrice(item)}
                      </td>

                      <td className="cat-edit">
                        <a href="#" onClick={() => handleRemoveItem(item)}>
                          <img src={delImgUrl}></img>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*----------- Cart top ends------------- */}

            {/* -----------cart bottom */}
            <div className="cart-bottom">
              {/* CHECKOUT BOX */}
              <div className="cart-checkout-box">
                <form className="coupon">
                  <input
                    className="cart-page-input-text"
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Coupon code..."
                  />
                  <input type="submit" value="Apply Coupon" />
                </form>

                <form className="cart-checkout">
                  <input type="submit" value="Update Cart" />
                  <div>
                    <CheckOutPage />
                  </div>
                </form>
              </div>
              {/* ---------------------CHECK BOX END */}

              {/* SHOPPING BOX */}
              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Calculate Shiping</h3>
                      <div className="outline-select">
                        <select>
                          <option value="uk">United Kingdom(UK)</option>
                          <option value="us">United States (USA)</option>
                          <option value="bd">Bangladesh</option>
                          <option value="vn">Viet Nam</option>
                          <option value="ind">India</option>
                          <option value="np">Nepal</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>

                      <div className="outline-select shipping-select">
                        <select>
                          <option value="uk">New York</option>
                          <option value="us">London</option>
                          <option value="bd">Dhaka</option>
                          <option value="pak">Korachi</option>
                          <option value="ind">New Delhi</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>

                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="Postalcode/ZIP"
                        className="cart-page-input-text"
                      />
                      <button type="submit">Update Address</button>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Totals</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart Subtotal</span>
                          <p className="pull-right">${cartSubtotal}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Shipping and Handling
                          </span>
                          <p className="pull-right">Free Shipping</p>
                        </li>
                        <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">${orderTotal.toFixed(2)}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
