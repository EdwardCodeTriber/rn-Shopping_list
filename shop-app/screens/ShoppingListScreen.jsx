import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addItem, 
  editItem, 
  deleteItem, 
  togglePurchased 
} from '../Redux/ShoppingListSlice';
import { Ionicons } from '@expo/vector-icons';

export default function ShoppingListScreen() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('1');
  const [editingItem, setEditingItem] = useState(null);

  //
  const dispatch = useDispatch();
  const shoppingItems = useSelector(state => state.shoppingList.items);

  //
  const handleAddItem = () => {
    if (!itemName.trim()) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    if (editingItem) {
      dispatch(editItem({
        id: editingItem.id,
        name: itemName,
        quantity: parseInt(itemQuantity, 10)
      }));
      setEditingItem(null);
    } else {
      dispatch(addItem(itemName, parseInt(itemQuantity, 10)));
    }

    setItemName('');
    setItemQuantity('1');
  };

  //
  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemQuantity(item.quantity.toString());
  };

  //
  const handleDeleteItem = (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => dispatch(deleteItem(id)) 
        }
      ]
    );
  };

  //
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => dispatch(togglePurchased(item.id))}
      >
        <Ionicons 
          name={item.purchased ? 'checkbox' : 'square-outline'} 
          size={24} 
          color={item.purchased ? 'green' : 'black'}
        />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text 
          style={[
            styles.itemName, 
            item.purchased && styles.purchasedItem
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity 
          onPress={() => handleEditItem(item)}
          style={styles.actionButton}
        >
          <Ionicons name="pencil" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleDeleteItem(item.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.quantityInput}
          placeholder="Qty"
          value={itemQuantity}
          onChangeText={setItemQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>
            {editingItem ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={shoppingItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            Your shopping list is empty
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  itemQuantity: {
    color: 'gray',
  },
  itemActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 12,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },
});