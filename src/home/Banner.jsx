import React, { useState } from "react";
import productData from "..//products.json";
import { Link } from "react-router-dom";
import SelectedCategory from "../components/SelectedCategory";
const title = (
  <h2>
    Search Your One From <span>Thousand</span> of Products
  </h2>
);

const desc = "We Have The Largest Collection of Products";

// Đây là một chuỗi văn bản chứa mô tả ngắn về các sản phẩm, sẽ được sử dụng trong GUI
const bannerList = [
  {
    iconName: "icofont-user-alt-4",
    text: "1.5 Million Customers",
  },
  {
    iconName: "icofont-notification",
    text: "More then 2000 Marchent",
  },
  {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
  },
];
const Banner = () => {
  // use state quản lý giá trị ủa ô tìm kiếm, ban đầu được khởi tạo là 1 chuỗi rỗng
  const [searchInput, setSearchInput] = useState("");

  // use state lưu trữ danh sách sản phẩm đã được lọc theo từ khóa tìm kiếm.
  // Ban đầu được gán giá trị bằng productData(nơi chứa tất cả các sản phẩm)
  const [filteredProducts, setfilteredProducts] = useState(productData);
  const handleSearch = (e) => {
    // e.target.value" đây là giá trị mà người dùng nhập vào ô tìm kiếm. e là sự kiện(event) đưcọ kích hoạt khi người dùng thay đổi giá trị trong ô input, e.target.value sẽ lấy giá trị mới nhập vào từ ô input
    const searchTerm = e.target.value;
    // sau khi có giá trị mới từ ô input, hàm nãy sẽ cập nhật state searchInput với giá trị đó
    setSearchInput(searchTerm);

    // hàm filter() được gọi trên mảng productData. Mỗi sản phẩm trong productData sẽ được kiểm tra xem tên của nó (product.name) có chứa từ khóa tìm kiếm không
    // product.name.toLowerCase là để chuyển tên sản phẩm thành chữ thường, còn searchTerm.toLowerCase() là từ khóa tìm kiếm cũng được chuyển thành chữ thường. Điều này giúp so sánh mà không phân biệt chữ hoa chữ thường
    // includes(searchTerm.toLowerCase()) sẽ trả về true nếu tên sản phẩm chứa từ khóa tìm kiếm
    const filetred = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setfilteredProducts(filetred);
  };
  return (
    <div className="banner-section style-4">
      <div className="container">
        <div className="banner-content">
          {title}
          <form>
            <SelectedCategory select={"all"} />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Your Product"
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
          <p>{desc}</p>
          {/* điều kiện này kiểm tra xem searchInput có chứa giá trị hay không, nếu có tức là ng dùng đã nhập vào ô tim kiếm và render danh sách các sản phẩm từ filteredProducts */}
          {/* filteredProducts.map: đây là cú pháp đúng để duyệt qua mảng filteredProducts và render từng sản phẩm dưới dạng 1 phần tử li
            	key={i}: key là 1 thuộc tính quan trọng trong React khi render danh sách các phần tử
          */}
          <ul className="lab-ul">
            {searchInput &&
              filteredProducts.map((product, i) => (
                <li key={i}>
                  <Link to={`/shop/${product.id}`}>{product.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Banner;
