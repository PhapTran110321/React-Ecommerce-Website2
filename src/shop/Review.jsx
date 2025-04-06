import React, { useState } from "react";
import Rating from "../components/Ratting";
const reviwtitle = "Add a Review";
let ReviewList = [
  {
    imgUrl: "/src/assets/images/instructor/01.jpg",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/02.jpg",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/03.jpg",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/04.jpg",
    imgAlt: "Client thumb",
    name: "Cher Daviau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
];

const Review = () => {
  const [reviewShow, setReviewShow] = useState(true);
  return (
    <>
      {/*  DESCRIPTION REVIEW 4 */}
      <ul
        className={`review-nav lab-ul ${
          reviewShow ? "RevActive" : "DescActive"
        }`}
      >
        <li className="desc" onClick={() => setReviewShow(!reviewShow)}>
          Description
        </li>
        <li className="rev" onClick={() => setReviewShow(!reviewShow)}>
          Review 4
        </li>
      </ul>

      {/* DESCRIPTION AND REVIEW CONTENT */}
      <div
        className={`review-content ${
          reviewShow ? "review-content-show" : "description-show"
        }`}
      >
        {/* REVIEW */}
        <div className="review-showing">
          <ul className="content lab-ul">
            {ReviewList.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img src={review.imgUrl}></img>
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{review.name}</a>
                      <p>{review.date}</p>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{review.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* ADD REVIEW FIELD  */}
          <div className="client-review">
            <div className="review-form">
              <div className="review-title">
                <h5>{reviwtitle}</h5>
              </div>

              {/* FORM REIVEW */}
              <form action="action" className="row">
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name *"
                  ></input>
                </div>

                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Your Email *"
                  ></input>
                </div>

                <div className="col-md-4 col-12">
                  <div className="rating">
                    <span className="me-2">Your Rating:</span>
                    <Rating />
                  </div>
                </div>

                {/* TEXT-AREA */}
                <div className="col-md-12 col-12">
                  <textarea
                    name="message"
                    id="message"
                    rows="8"
                    placeholder="Type Here Message"
                  ></textarea>
                </div>

                <div className="col-12">
                  <button type="submit" className="default-button">
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor inciduunt ut labore et dolore magna aliqua. Ut enim
            ad minum venlam, quis nostrud exerciation ullamco laboris nisi ut
            aliquip ex ea comodo consrquat. Duils aute urere dolor in
            reprehenderrit in voluptate velit esse cillm dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anum id est laborum.
          </p>

          <div className="post-item">
            <div className="post-thumb">
              <img src="/src/assets/images/shop/01.jpg" alt=""></img>
            </div>
            <div className="post-content">
              <ul className="lab-ul">
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur, soluta?
                </li>
                <li>amet consectetur adipisicing elit. Pariatur, soluta?</li>
                <li> amet consectetur adipisicing elit. Pariatur, soluta?</li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur, soluta?
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur, soluta?
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur, soluta?
                </li>
              </ul>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor inciduunt ut labore et dolore magna aliqua. Ut enim
            ad minum venlam, quis nostrud exerciation ullamco laboris nisi ut
            aliquip ex ea comodo consrquat. Duils aute urere dolor in
            reprehenderrit in voluptate velit esse cillm dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anum id est laborum.
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;
