import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "../components/modal.css";
import { replace, useLocation, useNavigate } from "react-router-dom";
const CheckOutPage = () => {
  // show:quản lý việc hiển thị Modal(hiển thị hay không)
  // setShow: Hàm cập nhật trạng thái show(true/false)
  const [show, setShow] = useState(false);
  // activeTab: Lưu trữ giá trị thanh toán hiện tại(visa/paypal)
  // setActiveTab: Hàm thay đổi Tab thanh toán đang được chọn
  const [activeTab, setActiveTab] = useState("visa");
  // Thay đổi Tab đang được chọn(visa hay paypal)
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  // thay đổi giá trị show thành true để hiển thị Modal
  const handleShow = () => setShow(true);
  // thay đổi giá trị show thành false để không hiển thị Modal
  const handleClose = () => setShow(false);

  // -------------ĐẶT HÀNG THÀNH CÔNG VÀ CHUYỂN VỀ TRANG TRƯỚC ĐÓ

  // đây là 1 hook của React Router dùng để lấy thông tin location vị trí hiện tại của trang web
  // useLocation() trả về 1 đối tượng chứa thông tin như pathname,search,hash,state...
  // Tại đây, location sẽ cung cấp các thông tin về URL hiện tại(đường dẫn của trang)
  const location = useLocation();

  // đây là 1 hook của React Router dùng để điều hướng đến các trang khác trong ứng dụng
  // Hàm navigate cho phép bạn di chuyển người dùng đến 1 địa chỉ mới
  // ví dụ như thay đổi trang khi người dùng hoàn thành 1 hành động
  const navigate = useNavigate();

  // dòng này xác định địa chỉ mà người dùng đã đến trước khi truy cập trang Checkout(từ nơi họ xuất phát)
  //  location.state là một thuộc tính có thể được truyền từ trang trước khi chuyển hướng (thường dùng trong React Router).
  // ?. là toán tử giúp kiểm tra an toàn nếu state hoặc from không tồn tại
  // pathname là thuộc tính đại diện cho đường dẫn URL của trang xuất phát
  // "/" nếu không có thông tin nào trong state.from.pathname, giá trị mặc định là / (Trang chủ)
  const from = location.state?.from?.pathname || "/";

  // Đây là 1 hàm được định nghĩa để xử lý khi người dùng xác nhận đặt hàng. Hàm này sẽ được gọi khi người dùng nhấn nút "Order" hoặc "Add paypal"
  const handleOrderConfirm = () => {
    alert("Your Order is placed successfully!");
    // Dòng này sẽ xóa thông tin giỏ hàng (lưu trữ trong localStorage dưới tên "cart") sau khi người dùng đã hoàn thành việc đặt
    // hàng. Điều này giúp làm sạch dữ liệu giỏ hàng sau khi thanh toán.
    localStorage.removeItem("cart");
    //Sau khi xử lý đơn hàng, hàm navigate được gọi để chuyển hướng người dùng về trang trước đó (from).
    //replace : true có nghĩa là thay vì thêm một entry mới vào lịch sử trình duyệt, trang hiện tại sẽ thay thế entry đó.
    // Điều này giúp người dùng không thể quay lại trang checkout khi sử dụng nút "back" của trình duyệt.
    navigate(from, { replace: true });
  };
  // -------------ĐẶT HÀNG THÀNH CÔNG VÀ CHUYỂN VỀ TRANG TRƯỚC ĐÓ

  return (
    <div className="modalCard">
      {/* Một button được tạo ra với nội dung "Proceed to Checkout" Khi người dùng nhấp vào nút này, handleShow được gọi để hiển thị MODAL */}
      <Button variant="primary" className="py-2" onClick={handleShow}>
        Proceed to Checkout
      </Button>
      {/*  */}
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">Select Your Payment Method</h5>
          <div className="modal-content">
            <div className="modal-body">
              <div className="tabs mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${
                        activeTab === "visa" ? "active" : ""
                      }`}
                      id="visa-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="visa"
                      aria-selected={activeTab === "visa"}
                      onClick={() => handleTabChange("visa")}
                      href="#visa"
                    >
                      <img
                        src="https://i.imgur.com/sB4jftM.png"
                        alt=""
                        width="80"
                      ></img>
                    </a>
                  </li>

                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${
                        activeTab === "paypal" ? "active" : ""
                      }`}
                      id="paypal-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="paypal"
                      aria-selected={activeTab === "paypal"}
                      onClick={() => handleTabChange("paypal")}
                    >
                      <img
                        src="https://i.imgur.com/yK7EDD1.png"
                        alt=""
                        width="80"
                      ></img>
                    </a>
                  </li>
                </ul>

                {/* CONTENTS */}
                <div className="tab-content" id="myTabContent">
                  {/* VISA CONTENT */}
                  <div
                    className={`tab-pane fade ${
                      activeTab === "visa" ? "show active" : ""
                    }`}
                    id="visa"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    {/* visa tab content */}
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Credit card</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            required
                          />
                          <span>Calholder Name</span>
                        </div>

                        <div className="inputbox">
                          <input
                            type="text"
                            name="number"
                            id="number"
                            min="1"
                            max="999"
                            className="form-control"
                            required
                          />
                          <span>Card Number</span>
                          <i className="fa fa-eye"></i>
                        </div>

                        <div className="d-flex flex-row">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="number"
                              id="number"
                              min="1"
                              max="999"
                              className="form-control"
                              required
                            />
                            <span>Expiration Date</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              name="number"
                              id="number"
                              min="1"
                              max="999"
                              className="form-control"
                              required
                            />
                            <span>CVV</span>
                          </div>
                        </div>

                        <div className="px-5 pay">
                          <button
                            className="btn btn-success btn-block"
                            onClick={handleOrderConfirm}
                          >
                            Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* PAYPAL CONTENT */}
                  <div
                    className={`tab-pane fade${
                      activeTab === "paypal" ? "show active" : ""
                    }`}
                    id="paypal"
                    role="tabpanel"
                    aria-labelledby="paypal-tab"
                  >
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Paypal Account Info</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            required
                          />
                          <span>Enter your email</span>
                        </div>

                        <div className="inputbox">
                          <input
                            type="text"
                            name="number"
                            id="number"
                            min="1"
                            max="999"
                            className="form-control"
                            required
                          />
                          <span>Your Name</span>
                        </div>

                        <div className="d-flex flex-row">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="number"
                              id="number"
                              min="1"
                              max="999"
                              className="form-control"
                              required
                            />
                            <span>Extra info</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              name="number"
                              id="number"
                              min="1"
                              max="999"
                              className="form-control"
                              required
                            />
                            <span></span>
                          </div>
                        </div>

                        <div className="px-5 pay">
                          <button
                            className="btn btn-success btn-block"
                            onClick={handleOrderConfirm}
                          >
                            Add Paypal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* payment desclaimer */}
                <p className="mt-3 px-4 p-Disclaimer">
                  <em>Payment Disclaimer: </em> In not event shall payment or
                  partial payment by Owner for any material or service
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckOutPage;
