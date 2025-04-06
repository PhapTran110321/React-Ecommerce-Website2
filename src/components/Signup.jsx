import React, { useContext, useState } from "react";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
const title = "Register";
const socialTitle = "Login with Social Media";
const btnText = "Get Started Now";
const Signup = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, createUser } = useContext(AuthContext);
  //useLocation lấy thông tin vị trí của trang hiện tại
  // location sẽ chứa url của trang hiện tại(pathname, search,...)
  // Đây là thông tin cần thiết để xử lý việc điều hướng người dùng trở lại trang trước đó sau khi đăng ký hoặc đăng nhập thành công
  const location = useLocation();
  //  cho phép điều hướng người dùng đến một URL khác. Ví dụ, sau khi người dùng đăng ký hoặc đăng nhập thành công, bạn có thể sử dụng navigate(from, { replace: true }) để chuyển hướng người dùng về trang trước đó hoặc trang chủ.  const navigate = useNavigate();
  // đây là cách lấy giá trị pathname của trang trước khi người dùng chuyển
  // hướng đến trang đăng nhập. Nếu không có trang trước đó(state from)
  // không tồn tại và sẽ điều hướng người dùng về lại trang chủ ("/")
  const navigate = useNavigate();
  // dòng code này lấy giá trị pathname từ state của location để xác định trang người dùng
  // đang muốn quay lại sau khi đăng nhập thành công
  const from = Location.state?.from?.pathname || "/";
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      const user = result.user;
      navigate(from, { replace: true }).catch((error) => {
        const errorMsg = error.message;
        seterrorMessage("Please provide valid email & password");
      });
    });
  };
  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    // console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      seterrorMessage(
        "Password doesn't match! Please, provide a correct password"
      );
    } else {
      seterrorMessage("");
      createUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Account created successfully done!");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error.message);
          alert(`${error.message}`);
        });
    }
  };
  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form className="account-form" onSubmit={handleSignup}>
              <div className="form-group">
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              {/* SHOWING MESSAGE */}
              <div>
                {errorMessage && (
                  <div className="error-message text-danger mb-1">
                    {errorMessage}
                  </div>
                )}
              </div>

              <div className="form-group">
                <button className="d-block lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>

            {/* ACCOUNT-BOTTOM */}
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Are you a member ? <Link to="/login">Login</Link>
              </span>
              <span className="or">
                <span>or</span>
              </span>

              {/* SOCIAL LOGIN */}
              <h5 className="subtitle">{socialTitle}</h5>
              <ul className="lab-ul social-icons justify-content-center">
                <li>
                  <button className="github" onClick={handleRegister}>
                    <i className="icofont-github"></i>
                  </button>
                </li>
                <li>
                  <a href="/" className="facebook">
                    <i className="icofont-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="twitter">
                    <i className="icofont-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="linkedin">
                    <i className="iconfont-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="instagram">
                    <i className="icofont-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
