import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/store";

import { logout } from "../Redux/Reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/Reducers/CartReducer";

function Header() {
  const user: any = useSelector(
    //@ts-ignore
    (state: RootState) => state.auth.currentUser
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className=" bg-base-grey sticky top-0">
      <nav className="flex flex-row items-center gap-0">
        <div className="flex items-center justify-center basis-3/12">
          <Link to="">
            <img className="w-32" src="/assets/img/primary-logo.png" alt="" />
          </Link>
        </div>
        <ul className="flex flex-row basis-6/12 items-center justify-center gap-8 uppercase text-base-cream">
          <NavLink to={""}>Trang chủ</NavLink>
          <NavLink to={"foods"}>Đồ ăn</NavLink>
          <NavLink to={"drinks"}>Thức uống</NavLink>
          <NavLink to={"news"}>Tin tức</NavLink>
        </ul>
        <div className="flex items-center justify-center basis-3/12 text-base-cream ">
          {user ? (
            <div className="flex gap-2 items-center justify-between">
              <span>Welcome, {user.username}</span>
              {user.admin ? <Link to="management">Quản lý</Link> : <></>}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  dispatch(clearCart());
                  dispatch(logout());
                }}
              >
                <span>Đăng xuất</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center  gap-3 ">
              <Link to="login" className="flex items-center">
                <button>Đăng nhập</button>
              </Link>
              <Link to="register" className="flex items-center">
                <button>Đăng ký</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
