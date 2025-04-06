import React, { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import {
  Link,
  Navigate,
  replace,
  useLocation,
  useNavigate,
} from "react-router-dom";
const title = "Login";
const socialTitle = "Login with Social Media";
const btnText = "Login Now";

const socialList = [
  { iconName: "icofont-facebook", siteLink: "#", className: "facebook" },
  { iconName: "icofont-twitter", siteLink: "#", className: "twitter" },
  { iconName: "icofont-linkedin", siteLink: "#", className: "linkedin" },
  { iconName: "icofont-instagram", siteLink: "#", className: "instagram" },
  { iconName: "icofont-pinterest", siteLink: "#", className: "pinterest" },
];
const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  // lấy phương thức đăng nhập và đăng ký từ AuthContext
  const { signUpWithGmail, login } = useContext(AuthContext);
  //useLocation lấy thông tin vị trí của trang hiện tại
  // location sẽ chứa url của trang hiện tại(pathname, search,...)
  // Đây là thông tin cần thiết để xử lý việc điều hướng người dùng trở lại trang trước đó sau khi đăng ký hoặc đăng nhập thành công
  const location = useLocation();
  // được dùng để điều hướng người dùng đến trang khác
  const navigate = useNavigate();
  // đây là cách để lấy giá trị pathname của trang trước khi người dùng
  // chuyển hướng đến trang đăng nhập. Nếu không có trang trước đó(state from không tồn tại)
  // và sẽ điều hướng người dùng về trang chủ "/"
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    // là phương thức dùng để ngừng hành động mặc định của sự kiện. Trong trường hợp này, hành động mặc định của việc gửi biểu mẫu là làm mới lại trang(reload). khi gọi preventDefault(), việc làm mới trang sẽ bị ngừng, giúp bạn có therer xử lý dữ liệu nhập vào mà không cần phải tải lại trang
    event.preventDefault();
    // event.target là phẩn tử HTML mà sự kiện đang xảy ra. Trong trường hợp này, sự kiện là submit, nên event.target sẽ là form mà người dùng đang gửi. Lệnh này gán đối tượng form vào biến form, để bạn có thể dễ dàng truy cấp các phần tử trong form
    const form = event.target;
    // console.log(form);
    //Dòng này lấy giá trị của trường input có name="email" trong form. Dễ dàng nhận thấy, trong biểu mẫu, trường nhập liệu cho email có name="email". Khi người dùng nhập email vào trường này và gửi form, bạn sẽ lấy giá trị đã nhập và gán cho biến email.
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    // Hàm này là 1 hàm login dùng để đăng nhập được lấy từ AuthContext
    // email  và password là những giá trị mà người dùng dùng để đăng nhập. Hàm login sẽ gửi những giá trị này đến API để thực hiện đăng nhập
    login(email, password)
      // .then((result) => {...}) phần nãy sẽ chạy nếu đăng nhập thành công
      // result chứa thông tin trả về từ quá trình đăng nhập. Trong trường hợp này, thông tin người dùng sẽ được lưu trong result.user
      .then((result) => {
        // dòng này lưu thông tin người dung
        const user = result.user;
        alert("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMsg = error.message;
        seterrorMessage("Please provide valid email & password");
      });
  };
  const handleRegister = () => {
    signUpWithGmail().then((result) => {
      const user = result.user;
      navigate(from, { replace: true }).catch((error) => {
        const errorMsg = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
    });
  };
  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form className="account-form" onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Emai Address *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password *"
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
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <Link to="/forgetpass">Forget Password?</Link>
                </div>
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
                Don Have an Account? <Link to="/sing-up">Sign Up</Link>
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

export default Login;
