import React, { useState } from "react";
import Ratting from "../components/Ratting";
import { Link } from "react-router-dom";

const title = "Our Products";
const ProductData = [
  {
    imgUrl: "src/assets/images/categoryTab/01.jpg",
    cate: "Shoes",
    title: "Nike Premier X",
    author: "assets/images/course/author/01.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 1,
  },
  {
    imgUrl: "src/assets/images/categoryTab/02.jpg",
    cate: "Bags",
    title: "Asthetic Bags",
    author: "assets/images/course/author/02.jpg",
    brand: "D&J Bags",
    price: "$199.00",
    id: 2,
  },
  {
    imgUrl: "src/assets/images/categoryTab/03.jpg",
    cate: "Phones",
    title: "iPhone 12",
    author: "src/assets/images/categoryTab/brand/apple.png",
    brand: "Apple",
    price: "$199.00",
    id: 3,
  },
  {
    imgUrl: "src/assets/images/categoryTab/04.jpg",
    cate: "Bags",
    title: "Hiking Bag 15 Nh100",
    author: "assets/images/course/author/04.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 4,
  },
  {
    imgUrl: "src/assets/images/categoryTab/05.jpg",
    cate: "Shoes",
    title: "Outdoor Sports Shoes",
    author: "assets/images/course/author/05.jpg",
    brand: "Nike",
    price: "$199.00",
    id: 5,
  },
  {
    imgUrl: "src/assets/images/categoryTab/06.jpg",
    cate: "Beauty",
    title: "COSRX Snail Mucin",
    author: "assets/images/course/author/06.jpg",
    brand: "Zaara",
    price: "$199.00",
    id: 6,
  },
  {
    imgUrl: "src/assets/images/categoryTab/07.jpg",
    cate: "Bags",
    title: "Look Less Chanel Bag ",
    author: "assets/images/course/author/01.jpg",
    brand: "Gucci",
    price: "$199.00",
    id: 7,
  },
  {
    imgUrl: "src/assets/images/categoryTab/08.jpg",
    cate: "Shoes",
    title: "Casual Sneakers",
    author: "assets/images/course/author/02.jpg",
    brand: "Bata",
    price: "$199.00",
    id: 8,
  },
];
const CategoryShowCase = () => {
  // items là 1 biến trạng thái, ban đầu sẽ được gán giá trị từ ProductData
  // setItems là hàm cập nhật giá trị của items
  // ProductData là một mảng chứa thông tin của sản phẩm
  const [items, setItems] = useState(ProductData);

  // Hàm filterItem dùng để lọc các danh sách của sản phẩm theo thể loại categItem
  // filterItem là 1 hàm nhận vào 1 đối số là categItem
  const filterItem = (categItem) => {
    // bên trong hàm ProductData.filter đc sử dụng để lọc các phần tử trong mảng ProductData. Hàm filter sẽ tạo ra 1 mảng mới chỉ chứa các phần tử curElem có thuộc tính cate = categItem
    const updateItems = ProductData.filter((curElem) => {
      return curElem.cate === categItem;
    });

    setItems(updateItems);
  };
  return (
    <div className="course-section style-3 padding-tb">
      {/* SHAPES */}
      <div className="course-shape one">
        <img src="/src/assets/images/shape-img/icon/01.png" alt=""></img>
      </div>
      <div className="course-shape-two">
        <img src="/src/assets/images/shape-img/icon/02.png" alt=""></img>
      </div>

      {/* main section */}
      <div className="container">
        {/* SECTION - HEADER */}
        <div className="section-header">
          <h2 className="title">{title}</h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={() => setItems(ProductData)}>All</li>
              <li onClick={() => filterItem("Shoes")}>Shoes</li>
              <li onClick={() => filterItem("Bags")}>Bags</li>
              <li onClick={() => filterItem("Phones")}>Phones</li>
              <li onClick={() => filterItem("Beauty")}>Beauty</li>
            </ul>
          </div>
        </div>

        {/* section body */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 rows-cols-md-2 row-cols-1 course-filter">
            {items.map((product) => (
              <div key={product.id} className="col">
                <div className="course-item style-4">
                  <div className="course-inner">
                    {/* COURSE-THUMB */}
                    <div className="course-thumb">
                      <img src={product.imgUrl} alt=""></img>
                      <div className="course-category">
                        <div className="course-cate">
                          <a href="#">{product.cate}</a>
                        </div>
                        <div className="course-reiew">
                          <Ratting />
                        </div>
                      </div>
                    </div>

                    {/* COURSE-CONTENT */}
                    <div className="course-content">
                      <Link to={`/shop/${product.id}`}>
                        <h6>{product.title}</h6>
                      </Link>
                      <div className="course-footer">
                        <div className="course-author">
                          <Link to="/" className="ca-name">
                            {product.brand}
                          </Link>
                        </div>
                        <div className="course-price">{product.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShowCase;
