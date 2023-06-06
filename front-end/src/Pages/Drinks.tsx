import { useSelector } from "react-redux";
import Item from "../Components/Item";
import { RootState } from "../Redux/store";
import { ItemType } from "../Interfaces/ItemInterface";

function Drinks() {
  const drinksList = useSelector((state: RootState) => state.item.items);

  return (
    <div className=" flex flex-wrap gap-1 items-center justify-center">
      {drinksList.map((item: ItemType) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Drinks;
