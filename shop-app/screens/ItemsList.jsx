import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, toggleItemCheck, deleteItem } from "../Redux/itemsSlice";

const ItemsListScreen = ({ route }) => {
  const { category } = route.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  // Get items for this specific category
  const items = useSelector(
    (state) => state.items.itemsByCategory[category.id] || []
  );

  const handleToggleItemCheck = (itemId) => {
    dispatch(
      toggleItemCheck({
        categoryId: category.id,
        itemId,
      })
    );
  };

  const handleAddItem = () => {
    if (newItemName.trim() === "") {
      Alert.alert("Error", "Please enter an item name");
      return;
    }

    dispatch(
      addItem({
        categoryId: category.id,
        name: newItemName,
      })
    );
    setNewItemName("");
    setModalVisible(false);
  };

  const handleDeleteItem = (itemId) => {
    dispatch(
      deleteItem({
        categoryId: category.id,
        itemId,
      })
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={[
                styles.checkboxContainer,
                item.checked ? styles.checkedContainer : null,
              ]}
              onPress={() => handleToggleItemCheck(item.id)}
            >
              {item.checked && <Text style={styles.checkboxText}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Text style={styles.deleteText}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in this category</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={handleAddItem}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2E37",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3A3940",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedContainer: {
    backgroundColor: "#00FF00",
  },
  checkboxText: {
    color: "#000000",
    fontWeight: "bold",
  },
  itemText: {
    flex: 1,
    color: "#FFFFFF",
    marginHorizontal: 12,
  },
  deleteText: {
    color: "#FF0000",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#00FF00",
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#3A3940",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color:"white",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  modalAddButton: {
    backgroundColor: "#00FF00",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  modalButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ItemsListScreen;
