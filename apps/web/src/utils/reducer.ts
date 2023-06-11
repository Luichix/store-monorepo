export type User = any;

export interface Basket {
  id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
}

type AddToBasketAction = {
  type: 'ADD_TO_BASKET';
  item: Basket;
};

type RemoveFromBasketAction = {
  type: 'REMOVE_FROM_BASKET';
  id: string;
};

type SetUserAction = {
  type: 'SET_USER';
  user: User;
};

export type Action = AddToBasketAction | RemoveFromBasketAction | SetUserAction;

export type State = {
  basket: Basket[];
  user: User;
};

export const initialState: State = {
  basket: [],
  user: {},
};

// Selector
export const getBasketTotal = (basket: Basket[]) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
  }
};

export default reducer;
