import { Text, View, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { data } from "@/data/todos";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState('');

  //Add Todo
  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
    }
  }

  //Toggle Todo
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  //Remove Todo
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const renderItem = ({ item }) => (
    <View style={style.todoItem}>
      <Text
        style={[style.todoText, item.completed && style.completedText]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
    </View>
  );
  return (
    <SafeAreaView style={style.container}>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          placeholder="Add a new todo"
          placeholderTextColor="black"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={style.addButton}>
          <Text style={style.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />

    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  input: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginRight: 10,
    fontSize: 18,
    minWidth: 0
  },
  addButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
    color: 'black',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

});
