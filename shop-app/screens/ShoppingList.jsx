import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';

const ShoppingList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Bakery', color: '#00FF00' },
    { id: 2, name: 'Fruit & Veg', color: '#FF8C00' },
    { id: 3, name: 'Meat', color: '#FF0000' },
    { id: 4, name: 'Dairy', color: '#FF00FF' },
    { id: 5, name: 'Household', color: '#00FFFF' },
  ]);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const newId = categories.length + 1;
      const newCategoryObject = { id: newId, name: newCategory, color: getRandomColor() };
      setCategories([...categories, newCategoryObject]);
      setNewCategory('');
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.categoryItem, { backgroundColor: item.color }]}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <TouchableOpacity>
              <Text style={styles.categoryArrow}>→</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.addCategoryContainer}>
        <TextInput
          style={styles.addCategoryInput}
          placeholder="Add Category"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TouchableOpacity style={styles.addCategoryButton} onPress={handleAddCategory}>
          <Text style={styles.addCategoryButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryArrow: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  addCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addCategoryInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  addCategoryButton: {
    backgroundColor: '#00FF00',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  addCategoryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ShoppingList;