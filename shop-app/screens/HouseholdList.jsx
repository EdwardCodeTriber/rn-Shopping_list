import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const HouseholdScreen = () => {
  const [householdItems, setHouseholdItems] = useState([
    { id: 1, name: 'Bath Soap', checked: false },
    { id: 2, name: 'Kitchen roll', checked: false },
    { id: 3, name: 'Laundry powder', checked: true },
    { id: 4, name: 'Cloth', checked: true },
  ]);

  const toggleItemCheck = (id) => {
    setHouseholdItems(
      householdItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddItem = () => {
    // Add logic to handle adding a new item
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={householdItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                item.checked ? styles.checkedContainer : null,
              ]}
              onPress={() => toggleItemCheck(item.id)}
            >
              {item.checked && <Text style={styles.checkboxText}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity>
              <Text style={styles.deleteText}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedContainer: {
    backgroundColor: '#00FF00',
  },
  checkboxText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    color: '#FFFFFF',
    marginHorizontal: 12,
  },
  deleteText: {
    color: '#FF0000',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#00FF00',
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HouseholdScreen;