import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) { 
        
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.product === item.product);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }
        
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: {
                    address: action.payload.address,
                    city: action.payload.city,
                    postalCode: action.payload.postalCode,
                    phoneNo: action.payload.phoneNo,
                    country: action.payload.country
                }
            }
        
        default:
            return state
    }
}