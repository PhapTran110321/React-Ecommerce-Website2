import React, { useState } from "react";
import blogList from "../utilis/blogdata";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PopularPost from "../shop/PopularPost";
import Tags from "../shop/Tags";
const socialList = [
  {
    link: "#",
    iconName: "icofont-facebook",
    className: "facebook",
  },
  {
    link: "#",
    iconName: "icofont-twitter",
    className: "twitter",
  },
  {
    link: "#",
    iconName: "icofont-linkedin",
    className: "linkedin",
  },
  {
    link: "#",
    iconName: "icofont-instagram",
    className: "instagram",
  },
  {
    link: "#",
    iconName: "icofont-pinterest",
    className: "pinterest",
  },
];

const SingleBlog = () => {
  const [blog, setBlog] = useState(blogList);
  const { id } = useParams();
  //   console.log(id);
  const result = blog.filter((b) => b.id === Number(id));
  console.log(result[0]);

  return (
    <div>
      <PageHeader
        title={"Single Blog Pages"}
        curPage={"Blog / Blog Details"}
      ></PageHeader>
      <div className="blog-section blog-single padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              {" "}
              <article>
                <div className="section-wrapper">
                  <div className="row row-cols-1 justify-content-center g-4">
                    <div className="col">
                      <div className="post-item style-2">
                        <div className="post-inner">
                          {result.map((item) => (
                            <div key={item.id}>
                              {/* POST-THUMB */}
                              <div className="post-thumb">
                                <img
                                  src={item.imgUrl}
                                  alt=""
                                  className="w-100"
                                />
                              </div>
                              {/* POST-CONTENT */}
                              <div className="post-content">
                                <h3>{item.title}</h3>
                                <div className="meta-post">
                                  <ul className="lab-ul">
                                    {item.metaList.map((val, i) => (
                                      <li key={i}>
                                        <i className={val.iconName}></i>{" "}
                                        {val.text}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <p>
                                  Serenity hasir taken poseson mying entre soung
                                  these sweet morngs sprng whch enjoy with whole
                                  heart create am alones and feel the charm of
                                  extenceth spt whch the blissouls like mineing
                                  am soo happy my dearsi friend absoribed the
                                  exquste sense enjoy my whole hearts alone and
                                  fee the charm of extenceths spotsi whch was
                                  the blis of soulis mineing amsoing dear frend
                                  soingu absoribed the exqust sense tranqui
                                  exitence neglect my talents should
                                </p>
                                <blockquote>
                                  <p>
                                    {" "}
                                    Dynamically recaptiulize distributed
                                    technologies is wherease turnkey channels
                                    and onotonectally provide access to resource
                                    liveling expretise vlas worldwide
                                    deliverables uolisicly extend aserser are
                                    diverse vortals
                                  </p>
                                  <cite>
                                    <a href="#">...Phap Tran</a>
                                  </cite>
                                </blockquote>
                                <p>
                                  Whole heart create am alones and feel the
                                  charm of exstenceth spot whch the blissouls
                                  like mineing am soo happy my dearsi frend
                                  absoribed the exquste sense enjoy my whole
                                  hearts alone and fee the charm of extenceths
                                  spotsi whch was the blis of soulis mineing
                                  amsoing dear frend soingu absoribed the exqust
                                  sense tranqui existence neglect my talentsr
                                  should ncapable ofing is drawng singe
                                  wonderful serenty has taken posseion of my
                                  entre soulng these sweet present moment and
                                  yet feel that never was greater artst
                                </p>
                                <img
                                  src="/src/assets/images/blog/single/01.jpg"
                                  alt=""
                                />
                                <p>
                                  Whole heart create am alones and feel the
                                  charm of exstenceth spot whch the blissouls
                                  like mineing am soo happy my dearsi frend
                                  absoribed the exquste sense enjoy my whole
                                  hearts alone and fee the charm of extenceths
                                  spotsi whch was the blis of soulis mineing
                                  amsoing dear frend soingu absoribed the exqust
                                  sense tranqui existence neglect
                                </p>
                                <div className="video-thumb">
                                  <img
                                    src="/src/assets/images/blog/single/02.jpg"
                                    alt=""
                                  />
                                </div>
                                <p>
                                  Whole heart create am alones and feel the
                                  charm of exstenceth spot whch the blissouls
                                  like mineing am soo happy my dearsi frend
                                  absoribed the exquste sense enjoy my whole
                                  hearts alone and fee the charm of extenceths
                                  spotsi whch was the blis of soulis mineing
                                  amsoing dear frend soingu absoribed the exqust
                                  sense tranqui existence neglect
                                </p>
                                <div className="tags-section">
                                  <ul className="tags lab-ul">
                                    <li>
                                      <a href="#">Agency</a>
                                    </li>
                                    <li>
                                      <a href="#">Business</a>
                                    </li>
                                    <li>
                                      <a href="#">Personal</a>
                                    </li>
                                  </ul>
                                  <ul className="lab-ul social-icons">
                                    {socialList.map((val, i) => (
                                      <li key={i}>
                                        <a href="#" className={val.className}>
                                          <i className={val.iconName}></i>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="navigations-part">
                      <div className="left">
                        <a href="#" className="prev">
                          <i className="icofont-double-left"></i> Previous
                          Article
                        </a>
                        <a href="#" className="title">
                          Evisculate Parallel Processes via Technica Sound
                          Models Authoritative
                        </a>
                      </div>
                      <div className="right">
                        <a href="#" className="prev">
                          Next Article <i className="icofont-double-right"></i>
                        </a>
                        <a href="#" className="title">
                          Qvisculate Parallel Processes via Technica Sound
                          Models Authoritative
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Tags />
                <PopularPost />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
