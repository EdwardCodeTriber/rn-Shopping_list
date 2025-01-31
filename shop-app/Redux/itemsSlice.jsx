import { createSlice, nanoid } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    itemsByCategory: {}
  },
  reducers: {
    addItem: {
      reducer: (state, action) => {
        const { categoryId, name } = action.payload;
        if (!state.itemsByCategory[categoryId]) {
          state.itemsByCategory[categoryId] = [];
        }
        state.itemsByCategory[categoryId].push({
          id: nanoid(),
          name,
          checked: false
        });
      }
    },
    toggleItemCheck: (state, action) => {
      const { categoryId, itemId } = action.payload;
      const items = state.itemsByCategory[categoryId];
      const item = items.find(i => i.id === itemId);
      if (item) {
        item.checked = !item.checked;
      }
    },
    deleteItem: (state, action) => {
      const { categoryId, itemId } = action.payload;
      state.itemsByCategory[categoryId] = state.itemsByCategory[categoryId].filter(
        item => item.id !== itemId
      );
    }
  }
});

export const { addItem, toggleItemCheck, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;