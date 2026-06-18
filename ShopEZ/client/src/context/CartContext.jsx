import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const getCartKey = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    return user
      ? `cart_${user.id}`
      : "guest_cart";
  };

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(
      getCartKey()
    );

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      getCartKey(),
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(
      (item) =>
        (item._id || item.id) ===
        (product._id || product.id)
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          (item._id || item.id) ===
          (product._id || product.id)
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        (item._id || item.id) === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          (item._id || item.id) === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter(
        (item) =>
          (item._id || item.id) !== id
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;