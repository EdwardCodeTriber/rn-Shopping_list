import { createSlice, nanoid } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [
      { id: '1', name: 'Bakery', color: '#00FF00' },
      { id: '2', name: 'Fruit & Veg', color: '#FF8C00' },
      { id: '3', name: 'Meat', color: '#FF0000' },
      { id: '4', name: 'Dairy', color: '#FF00FF' },
      { id: '5', name: 'Household', color: '#00FFFF' },
    ]
  },
  reducers: {
    addCategory: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (name) => ({
        payload: {
          id: nanoid(),
          name,
          color: getRandomColor()
        }
      })
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter(category => category.id !== action.payload);
    }
  }
});

// Utility function for random color generation
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;