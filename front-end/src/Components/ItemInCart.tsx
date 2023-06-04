import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeItem } from "../Redux/Reducers/CartReducer";
import { ItemInCartType } from "../Interfaces/ItemInterface";

function ItemInCart({ item }: { item: ItemInCartType }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2">
      <div className=" max-w-[100px] basis-1/5">
        <img src={item.img} alt="" />
      </div>
      <div className="flex basis-3/5">
        <div>
          <div className="item-name font-bold text-xl">{item.name}</div>
          <div className="opacity-70 italic">
            {`Đường: ${item.sugar}, Đá: ${item.ice}`}
          </div>
          <div>
            {item.price}đ x <span>{item.quantity}</span>
          </div>
        </div>
      </div>
      <div className="basis-1/5 flex flex-col items-center justify-around">
        <div>
          Quantity: <span>{item.quantity}</span>{" "}
        </div>
        <DeleteOutlined
          onClick={() => dispatch(removeItem(item))}
          style={{ fontSize: 20 }}
        />
      </div>
    </div>
  );
}

export default ItemInCart;
