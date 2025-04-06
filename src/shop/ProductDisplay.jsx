import React, { useState } from "react";
import { Link } from "react-router-dom";

const desc =
  "Energistia an deliver atacica metrcs after avsionary Apopria trnsition enterpris an sources applications emerging psd template.";

// đây là 1 component nhận 1 prop có tên là item. Prop này là 1 đối tượng chứa thông tin của sản phẩm: tên sp, giá bán,...
const ProductDisplay = ({ item }) => {
  //   console.log(item);
  // dòng này tiến hành destructing prop item để lấy các giá trị.
  const { name, id, price, seller, ratingsCount, quantity, img } = item;
  const [prequantity, setQuantity] = useState(quantity);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");

  // các hàm này xử lý việc chọn kích thước và màu sắc, cập nhật các state size và color khi người dùng chọn 1 tùy chọn từ dropdown
  const handSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDecrease = () => {
    if (prequantity > 1) {
      setQuantity(prequantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(prequantity + 1);
  };

  const handleSubmit = (e) => {
    // e.preventDefault ngừng hành động mặc định của sự kiện(trong trường hợp này là hành động gửi form). Khi người dùng nhấn nút "Add to cart", trình duyệt không tải lại trang
    // mà thay vào đó sẽ thực thi các hành động trong hàm handleSubmit
    e.preventDefault();
    // tạo 1 đối tượng sản phẩm
    const product = {
      id: id,
      img: img,
      name: name,
      price: price,
      quantity: prequantity,
      size: size,
      color: color,
      coupon: coupon,
    };
    // console.log(product);

    // MỤC ĐÍCH: đoạn mã này lấy dữ liệu giỏ hàng từ localStorage(nơi mà dữ liệu được lưu trữ trên giao diện của người dùng). localStorage lưu trũ thông tin dưới dạng chuỗi, vì vậy
    // chúng ta cần chuyển nó thành 1 đối tượng javascript bằng cách sử dụng: "JSON.parse()"
    // localStorage.getItem("cart") cố gắng lấy dữ liệu giỏ hàng được lưu trữ từ trước. Nếu giỏ hàng tồn tại trong localStorage, giá trị trả về là 1 chuỗi JSON trong giỏ hàng
    // JSON.parse() chuyển chuỗi JSON này thành mảng các sản phẩm (giỏ hàng)
    // nếu không có giỏ hàng trong localStorage, || [] sẽ đảm bảo rằng existingCart là 1 mảng trống. đây là cách để tránh lỗi khi không có dữ liệu giỏ hàng
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // mục đích của đoạn mã này là tìm vị trí của sản phẩm có trong giỏ hàng có id trùng với id của sản phẩm mà hiện tại người dùng đang muốn thêm vào giỏ hàng
    // existingCart.findIndex() là phương thức mảng tìm chỉ số(index) của phần tử trong mảng thỏa mãn điều kiện
    // (item) => item.id === id là điều kiện tìm kiếm. Điều này có nghĩa là chúng ta sẽ duyệt qua tất cả các phần tử trong existingCart, và tìm phần tử có id giống với id dang đc xử lý
    // nếu tìm thấy id giống nhau, findIndex sẽ trả về vị trí(index) của sản phẩm đố trong mảng. Nếu không tìm thấy thì sẽ trả về 1
    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === id
    );

    // nếu existingProductIndex không phải là -1, tức là sản phẩm đã tồn tại trong giỏ hàng, chúng ta sẽ cập nhật số lượng của sản phẩm đó
    // existingCart[existingProductIndex].quantity += prequantity: đoạn mã này lấy phần tử trong mảng existingCart ở vị trí existingProductIndex(sản phẩm có id trùng với sản phẩm thêm vào)
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += prequantity;
    }
    // trương fhowpj sản phẩm chưa được thêm trong giỏ hàng (existingProductIndex === -1) chúng ta thêm sản phẩm mới vào trong mảng existingCart: existingCart.push(product)
    else {
      existingCart.push(product);
    }
    // update local storage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setQuantity(1);
    setSize("Select Size");
    setColor("Select Color");
    setCoupon("");
  };

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span>({ratingsCount}) review</span>
        </p>
        <h4 className="price">${price}</h4>
        <h6>{seller}</h6>
        <p>{desc}</p>
      </div>

      {/* CART COMPONENTS */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="select-product size">
            {/* SELECT SIZE */}
            <select value={size} onChange={handSizeChange}>
              <option>Select Size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          {/* SELECT COLOR */}
          <div className="select-product color">
            <select value={color} onChange={handColorChange}>
              <option>Select Color</option>
              <option>Pink</option>
              <option>Ash</option>
              <option>Red</option>
              <option>White</option>
              <option>Blue</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          {/* QUANTITY */}
          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              type="text"
              className="cart-plus-minus-box"
              name="qtybutton"
              id="qtybutton"
              value={prequantity}
              onChange={(e) => setQuantity(e.target.value, 10)}
            ></input>
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>

          {/* ENTER DISCOUNT CODE */}
          <div className="dicount-code mb-2">
            <input
              type="text"
              placeholder="Enter Discount Code"
              onChange={(e) => setCoupon(e.target.value)}
            ></input>
          </div>

          {/* btn section */}
          <button type="submit" className="lab-btn">
            <span>Add To Cart</span>
          </button>

          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check out</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
