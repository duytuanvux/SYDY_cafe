export interface ItemType {
  id: number;
  img: string;
  name: string;
  price: number;
}

export interface ItemInCartType extends ItemType {
  quantity: number;

  sugar: string;
  ice: string;
}
