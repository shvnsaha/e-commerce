import React, { createContext } from 'react';
import useCart from '../hooks/useCart';

export const CartContext = createContext(null);

const CartProvider = ({children}) => {
    const [cart,refetch] = useCart();
    return (
        <CartContext.Provider value={authInfo}>
        {children}
     </CartContext.Provider>
    );
};

export default CartProvider;