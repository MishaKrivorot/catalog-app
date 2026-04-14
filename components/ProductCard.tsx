import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  // Змінили тип з string на ImageSourcePropType для підтримки локальних файлів
  image: ImageSourcePropType; 
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.card}>
      {/* ЗМІНА ТУТ: Замість source={{ uri: product.image }} тепер просто source={product.image} */}
      <Image source={product.image} style={styles.image} />
      
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>{product.price} ₴</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    // Додаємо resizeMode, щоб картинки пропорційно вписувалися у квадрат
    resizeMode: 'contain', 
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: 'bold',
  },
});

export default ProductCard;