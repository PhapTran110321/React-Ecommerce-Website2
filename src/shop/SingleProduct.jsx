import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import "../shop/PopularPost";
import "../shop/Tags";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Autoplay } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import Review from "./Review";
import PopularPost from "../shop/PopularPost";
import Tags from "../shop/Tags";

const SingleProduct = () => {
  // dòng này khai báo 1 trạng thái product và hàm cập nhật trạng thái setProduct
  const [product, setProduct] = useState([]);
  // trạng thái product được tạo với 1 mảng rỗng, có thể dùng để lưu trữ thông tin của 1 sản phẩm cụ thể

  //useParams() là 1 hook react router cho phép bạn lấy các tham số động từ Url của trang hiện tại
  //Khi bạn sử dụng các router động(vd: shop/:id) các tham số này sẽ được truyền vào URL và bạn có thể truy cập chúng bằng useParams()
  // phần :id trong Url là 1 tham số động mà bạn có thể thay đổi để tuy cập trang khác nhau chẳng hạn /shop/1
  // khi người dùng truy cập 1 url như vậy thì useParams() sẽ giúp bạn lấy tham số id
  const { id } = useParams();
  //   console.log(id);
  useEffect(() => {
    fetch("/src/products.json")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  const result = product.filter((p) => p.id === id);
  console.log(result);
  return (
    <div>
      <PageHeader title={"OUR SHOP SINGLE"} curPage={"Shop / Single Product"} />
      <div className="shop-single padding-tb asside-bg">
        <div className="container">
          <div className="row justify-content-center">
            {/* LEFT SIDE */}
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                            className="mySwiper"
                          >
                            {result.map((item, i) => (
                              <SwiperSlide key={i}>
                                <div className="single-thumb">
                                  <img src={item.img} alt=""></img>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <div className="pro-single-prev">
                            <i className="icofont-rounded-left"></i>
                          </div>
                          <div className="pro-single-next">
                            <i className="icofont-rounded-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <div>
                          {result.map((item) => (
                            <ProductDisplay key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* REVIEW */}

                <div className="review">
                  <Review />
                </div>
              </article>
            </div>
            {/* RIGHT SIDE */}
            <div className="col-lg-4 col-12">
              <div className="ps-lg-4">
                <PopularPost />
                <Tags />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
