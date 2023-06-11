export interface ItemType {
  _id: string;
  img: string;
  name: string;
  price: number;
}

export interface ItemInCartType extends ItemType {
  quantity: number;
  sugar: string;
  ice: string;
}
