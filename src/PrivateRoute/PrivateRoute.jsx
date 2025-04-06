import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Navigation } from "swiper/modules";

// định nghĩa component PrivateRoute
// children: đây là phần tử con được truyền vào trong component PrivateRoute
// Component này sẽ bao bộc các trang mà bạn muốn bảo vệ(chỉ cho phép truy cập khi người dùng đã đăng nhập)
const PrivateRoute = ({ children }) => {
  // user: là thông tin nếu người dùng đã đăng nhập(nếu chưa đăng nhập user sẽ là null)
  // loading: là 1 trạng thái dùng để kiểm tra xem quá trình xác thật của người dùng
  // đã hoàn tất hay chưa. Nếu quá trình xác thực đang diễn ra, bạn có thể hiển thị 1 màn hình chờ đang loading
  const { user, loading } = useContext(AuthContext);
  //location: Đây là thông tin về URL hiện tại mà người dùng đang cố gắng truy cập. Bạn sẽ sử dụng thông tin này để lưu trữ trang mà người dùng muốn vào trước khi chuyển hướng họ đến trang đăng nhập.
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }
  //Nếu user có giá trị (tức là người dùng đã đăng nhập), thì component sẽ trả về children — tức là nội dung mà bạn muốn bảo vệ. Điều này có nghĩa là người dùng sẽ được phép truy cập trang mà họ yêu cầu.
  if (user) {
    return children;
  }

  // Nếu người dùng chưa đăng nhập (tức là user là null), bạn sẽ chuyển hướng họ đến trang đăng nhập (/login) bằng cách sử dụng Navigate.
  //state={{ from: location }}: Điều này giúp lưu trữ thông tin về URL mà người dùng đang cố gắng truy cập (trong biến location). Sau khi người dùng đăng nhập thành công, bạn có thể sử dụng state này để điều hướng họ quay lại trang mà họ muốn truy cập trước khi bị chuyển hướng đến trang đăng nhập.
  //replace: Thuộc tính này sẽ thay thế trang hiện tại trong lịch sử duyệt web, có nghĩa là người dùng không thể quay lại trang trước đó bằng cách nhấn nút "Back" trong trình duyệt.
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
