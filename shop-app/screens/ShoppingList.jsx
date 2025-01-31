import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory } from '../Redux/categorySlice';
import { useNavigation } from '@react-navigation/native';

const ShoppingList = () => {
  const [newCategory, setNewCategory] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categories = useSelector(state => state.categories.items);

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      dispatch(addCategory(newCategory));
      setNewCategory('');
    }
  };

  const handleNavigateToItems = (category) => {
    navigation.navigate('ItemsList', { category });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.categoryItem, { backgroundColor: item.color }]}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleNavigateToItems(item)}>
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
    backgroundColor: '#2D2E37',
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