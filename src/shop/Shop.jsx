import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

const ShowResults = "Showing 01 - 12 of 139 Results";
import Data from "../products.json";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
const Shop = () => {
  // dùng để theo dõi chế độ xem của sản phẩm dưới dạng lưới hay danh sách, giá trị mặc định là true nên là chế độ lưới đang được chọn
  const [GridList, setGridList] = useState(true);
  // products: lưu trữ tất cả sản phẩm hiện có trogng file products.json
  const [products, setProduct] = useState(Data);
  // đây là hàm khai báo 1 useState curentPage với giá trị mặc định là 1
  // currentPage sẽ lưu trữ số trang hiện tại trong ứng dụng
  // setCurrentPage là hàm dùng để cập nhật giá trị của setCurrentPage khi người dùng chuyển trang
  const [currentPage, setCurrentPage] = useState(1);
  // số sản phẩm xuất hiện trong 1 trang
  const productsPerPage = 12;
  // lấy chỉ số của sản phẩm cuối cùng: trang hiện tại * số sản phẩm xuất hiện trong 1 trang
  const indexOfLastProduct = currentPage * productsPerPage;
  // lấy chỉ số của sản phẩm đầu tiên: sản phẩm cuối cùng - số sản phẩm xuất hiện trong 1 trang
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // dòng này lấy chỉ số sản phẩm của trang hiện tại từ sản phẩm đầu tiên đến sản phẩm cuối cùng trong trang đó
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //định nghĩa 1 hàm paginate để thay đổi trang hiện tại, truyền vào 1 tham số pageNumber, sẽ cập nhât
  // state currentPage với giá trị của trang đó. Khi currentPage thay đổi, trang mới sẽ được hiển thị với các sản phẩm tương ứng với trang đó
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter products based on category

  // Lưu trữ danh mục sản phẩm. Giá trị mặc định là All
  const [selectedCategory, setSelectedCategory] = useState("All");
  // menuItems: Mảng chứa tất cả các danh mục sản phẩm có trong data
  // Hàm map giúp tạo ra 1 mảng các danh mục
  // ...new Set giúp loại bỏ các giá trị trùng lặp
  const menuItems = [...new Set(Data.map((Val) => Val.category))];

  // đây là hàm có thể gọi khi người dùng chọn 1 danh mục sản phẩm: ví dụ: "áo"
  // curcat là tham số đầu vào của hàm này và curcat đại diện cho danh mục mà người dùng đã chọn
  const filterItem = (curcat) => {
    // data là 1 mảng chứa tất cả sản phẩm trong file product.json
    // filter là 1 phương thức của mảng, giúp tạo ra 1 mảng mới chỉ chứa các phần tử thỏa mãn điều kiện
    // Trong trường hợp này .filter() sẽ duyệt qua từng sản phẩm trong data và kiểm tra xem category có bằng với curcat hay không
    //
    const newItem = Data.filter((newVal) => {
      // Truy cập thuộc tính category của 1 sản phẩm trong data
      return newVal.category === curcat;
    });
    // cập nhật trạng thái setSelectedCategory để lưu trữ danh mục hiện tại mà người dùng đã chọn
    setSelectedCategory(curcat);
    // cập nhật trạng thái setProduct(các sản phẩm đã được lọc theo danh mục). Điều này làm thay đổi danh sách sản phẩm hiện thị trên trang, chỉ còn những sản phẩm thuộc danh mục curcat
    setProduct(newItem);
  };
  return (
    <div>
      <PageHeader title="Our Shop Page" curPage="Shop" />
      {/* SHOP PAGE */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                {/* SPACE BEETWEEN LEFT */}

                <div className="shop-title d-flex flex-warp justify-content-between">
                  <p>{ShowResults}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost"></i>
                    </a>

                    <a className="list" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>

                {/* PRODUCT CARDS */}
                <div>
                  <ProductCards
                    GridList={GridList}
                    products={currentProducts}
                  />
                </div>

                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={GridList}></Search>
                <ShopCategory
                  filterItem={filterItem}
                  setItem={setProduct}
                  menuItems={menuItems}
                  setProduct={setProduct}
                  selectedCategory={selectedCategory}
                />
                <PopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
