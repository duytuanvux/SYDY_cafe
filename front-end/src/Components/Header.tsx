import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className=" bg-base-grey sticky top-0">
      <nav className="flex flex-row items-center gap-0">
        <div className="flex items-center justify-center basis-3/12">
          <Link to="">
            <img
              className="w-32"
              src="/src/assets/img/primary-logo.png"
              alt=""
            />
          </Link>
        </div>
        <ul className="flex flex-row basis-6/12 items-center justify-center gap-8 uppercase text-base-cream">
          <NavLink to={""}>Trang chủ</NavLink>
          <NavLink to={"foods"}>Đồ ăn</NavLink>
          <NavLink to={"drinks"}>Thức uống</NavLink>
          <NavLink to={"news"}>Tin tức</NavLink>
        </ul>
        <div className="flex justify-center basis-3/12 gap-3 text-base-cream">
          <Link to="login" className="flex items-center">
            <button>Đăng nhập</button>
          </Link>
          <Link to="register" className="flex items-center">
            <button>Đăng ký</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
