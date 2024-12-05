import { createSlice, nanoid } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (name, quantity = 1) => ({
        payload: {
          id: nanoid(),
          name,
          quantity,
          purchased: false,
        },
      }),
    },
    editItem: (state, action) => {
      const { id, name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.name = name;
        existingItem.quantity = quantity;
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    togglePurchased: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
  },
});

export const { 
  addItem, 
  editItem, 
  deleteItem, 
  togglePurchased 
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;