import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// Зверни увагу на змінені шляхи імпорту!
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../constants/data';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortAscending) {
        return a.price - b.price; 
      } else {
        return b.price - a.price; 
      }
    });

    return result;
  }, [searchQuery, sortAscending]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Пошук товарів..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={() => setSortAscending(!sortAscending)}
          >
            <Text style={styles.sortButtonText}>
              {sortAscending ? '⬆️ Дешевші' : '⬇️ Дорожчі'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredAndSortedProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Товарів не знайдено 😔</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sortButton: {
    height: 45,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});