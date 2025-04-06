import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// AuthContext được tạo ra bằng createContext(), nó tạo ra 1 đối tượng context mà bạn sẽ dùng để chia sẻ dữ liệu liên quan đến xác thực
// (vd trạng thái đăng nhập của người dùng) trong toàn bộ ứng dụng
export const AuthContext = createContext();
// getAuth(): lấy đối tượng xác thực từ firebase để sử dụng các phương thức đăng nhập, đăng ký và đăng xuất
const auth = getAuth();
// GoogleAuthProvider: tạo đối tượng cung cấp phương thức đăng nhập bằng Google
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // user: state dùng để lưu trữ thông tin người dùng hiện tại. Giá trị mặc định là null
  const [user, setUser] = useState(null);
  // loading: State để quản lý trạng thái dữ liệu. Ban đầu, giá trị là true
  // có nghĩa là đang tải dữ liệu(thông tin người dùng). Sau khi xác thực xong nó sẽ trả về false
  const [loading, setLoading] = useState(true);

  // createUser: phương thức để tạo người dùng mới bằng email và mật khẩu.
  // Sử dụng hàm createUserWithEmailAndPassword từ firebase
  // trước khi gọi hàm này, state loading được đặt là true để chỉ ra rằng quá trình này đang diễn ra
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signUpWithEmail: Phương thức đăng nhập người dùng thông qua Google
  // Sử dụng signInWithPopup kết hợp với gooleProvider để mở cửa sổ Popup cho phép người dùng đăng nhập qua tài khoản Google
  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // login: phương thức để người dùng đăng nhập bằng email và mật khẩu, sử dụng hàm signInWithEmailAndPassword của firebase
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logOut: phương thức người dùng đăng xuất, sử dụng hàm signOut của Firebase
  const logOut = () => {
    return signOut(auth);
  };

  // user is available or not
  // useEffect được dùng để theo dõi trạng thái xác thực người dùng
  // Mỗi khi trạng thái người dùng thay đổi(đăng nhập, đăng xuất), hàm callback onAuthStateChanged sẽ được gọi và cập nhật lại setUser và setLoading

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => {
      return unsubcribe();
    };
  }, []);

  // cung cấp context cho toàn bộ ứng dụng

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    signUpWithGmail,
  };

  //AuthContext.Provider cung cấp authInfo cho các component con của AuthProvider thông qua value
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
