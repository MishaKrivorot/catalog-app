import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import ProductCard from '../../components/ProductCard';
import { CATEGORIES, PRODUCTS } from '../../constants/data';

const SORT_OPTIONS = [
  { id: 'rating', label: 'За рейтингом' },
  { id: 'price_asc', label: 'Від дешевих до дорогих' },
  { id: 'price_desc', label: 'Від дорогих до дешевих' },
  { id: 'discount', label: 'За розміром знижки' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('rating');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSearchQuery('');
      setActiveCategory('Всі');
      setSortMode('rating');
      setIsRefreshing(false);
    }, 1500);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('Всі');
    setSortMode('rating');
  };

  const filteredAndSortedProducts = useMemo(() => {
    // ВАЖЛИВИЙ ФІКС: Створюємо копію масиву замість прямого посилання
    let result = [...PRODUCTS]; 

    // 1. Фільтрація за категорією
    if (activeCategory !== 'Всі') {
      result = result.filter(product => product.category === activeCategory);
    }

    // 2. Фільтрація за пошуком
    if (searchQuery.trim() !== '') {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 3. Сортування
    result.sort((a, b) => {
      const getFinalPrice = (p: typeof a) => p.price * (1 - p.discount / 100);
      
      switch (sortMode) {
        case 'rating': return b.rating - a.rating; 
        case 'price_asc': return getFinalPrice(a) - getFinalPrice(b); 
        case 'price_desc': return getFinalPrice(b) - getFinalPrice(a); 
        case 'discount': return b.discount - a.discount; 
        default: return 0;
      }
    });

    return result;
  }, [searchQuery, sortMode, activeCategory]);

  const selectedOptionLabel = SORT_OPTIONS.find(opt => opt.id === sortMode)?.label;

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
        </View>

        <View style={styles.categoriesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  activeCategory === category && styles.categoryChipActive
                ]}
                onPress={() => {
                  setActiveCategory(category);
                  setIsDropdownOpen(false); 
                }}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sortContainer}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.dropdownHeaderText}>{selectedOptionLabel}</Text>
            <Text style={styles.dropdownIcon}>{isDropdownOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {SORT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSortMode(option.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText, 
                    sortMode === option.id && styles.activeDropdownItemText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <FlatList
          data={filteredAndSortedProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          style={{ flex: 1 }}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => setIsDropdownOpen(false)} 
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>😔</Text>
              <Text style={styles.emptyTitle}>Нічого не знайдено</Text>
              <Text style={styles.emptySubtitle}>Спробуйте змінити запит або категорію</Text>
              <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                <Text style={styles.clearButtonText}>Очистити фільтри</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
  },
  header: { marginBottom: 10 },
  searchInput: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoriesWrapper: { height: 40, marginBottom: 10 },
  categoriesContainer: { paddingRight: 20, gap: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  categoryText: { fontSize: 14, color: '#666', fontWeight: '500' },
  categoryTextActive: { color: '#fff', fontWeight: 'bold' },
  sortContainer: { marginBottom: 10 },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007BFF', 
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownHeaderText: { fontSize: 16, color: '#333' },
  dropdownIcon: { fontSize: 12, color: '#666' },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: { fontSize: 15, color: '#333' },
  activeDropdownItemText: { color: '#007BFF', fontWeight: 'bold' },
  listContainer: { paddingBottom: 20, flexGrow: 1 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: { fontSize: 50, marginBottom: 10 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  emptySubtitle: { fontSize: 14, color: '#888', marginBottom: 20, textAlign: 'center' },
  clearButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});