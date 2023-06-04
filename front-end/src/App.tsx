import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { getItems } from "./Redux/APIRequest";
import { Drawer, FloatButton } from "antd";

import { RootState } from "./Redux/store";
import {
  PhoneOutlined,
  ShoppingCartOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import ItemInCart from "./Components/ItemInCart";
import { ItemInCartType } from "./Interfaces/ItemInterface";

export const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart).cart;
  console.log(cart);
  //@ts-ignore
  const totalQty: number = cart.reduce((sum: number, item: ItemInCartType) => {
    return sum + item?.quantity;
  }, 0);
  const total: number = cart.reduce((sum: number, item: ItemInCartType) => {
    return sum + item?.price * item?.quantity;
  }, 0);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getItems(dispatch);
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto bg-white">
      <Header />
      <Outlet />
      <Footer />
      <FloatButton.Group>
        <FloatButton
          href="tel:+8496162028"
          tooltip={<>Hotline</>}
          icon={<PhoneOutlined />}
        />

        <FloatButton
          onClick={showDrawer}
          badge={{ count: totalQty, overflowCount: 50 }}
          icon={<ShoppingCartOutlined />}
          tooltip={<div>Cart</div>}
        />
        <FloatButton.BackTop
          tooltip={<>Reach Top</>}
          icon={<VerticalAlignTopOutlined />}
          visibilityHeight={0}
        />
      </FloatButton.Group>
      <Drawer
        width={500}
        title={`Giỏ hàng của bạn ( ${totalQty} món )`}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className=" flex flex-col gap-3 h-5/6 overflow-auto">
          {cart.map((item: ItemInCartType) => (
            <ItemInCart item={item} key={item.id + item.sugar + item.ice} />
          ))}
        </div>
        {cart.length === 0 ? (
          <></>
        ) : (
          <div className=" h-1/6 flex flex-col justify-center gap-0">
            <div className="flex items-center justify-between">
              <span>Tổng tiền tạm tính:</span>
              <span>{total} đ</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Mã giảm giá:</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tổng tiền:</span>
              <span>{total} đ</span>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
