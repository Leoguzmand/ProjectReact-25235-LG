import { createContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  // Seteamos elementos del carrito
  const [cartItems, setCartItems] = useState([]);

  // Función Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        // Si el elemento existe en el carrito, aumenta cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función Eliminar producto por ID
  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Función Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Función Actualizar cantidad
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calcular total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Al cargar la app, leer carrito guardado
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      setCartItems(storedCart || []);
    } catch {
      setCartItems([]);
    }
  }, []);

  // Cada vez que el carrito (cartItems) cambie, guardar en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Provee contexto a los componentes hijos
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
