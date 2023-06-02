import Item, { ItemType } from "../Components/Item";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

function Drinks() {
  const drinksList = useSelector((state: RootState) => state.item).items;
  return (
    <div className=" flex flex-wrap gap-1 items-center justify-center">
      {drinksList.map((item: ItemType) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Drinks;
