import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Базовое состояние и методы
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // каждый item: { id, title, price, image, quantity }

      // Добавление товара (если уже есть, увеличиваем quantity)
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...currentItems, { ...product, quantity: 1 }],
          });
        }
      },

      // Удаление товара полностью
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      // Увеличение количества
      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      // Уменьшение количества (если quantity === 1, удаляем)
      decreaseQuantity: (productId) => {
        const currentItem = get().items.find((item) => item.id === productId);
        if (currentItem.quantity === 1) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        }
      },

      // Очистка корзины
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'shopping-cart', // ключ в localStorage
      getStorage: () => localStorage, // по умолчанию localStorage, но указываем явно
    }
  )
);

export default useCartStore;