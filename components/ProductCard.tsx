import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../constants/data';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const discountedPrice = Math.round(product.price * (1 - product.discount / 100));

  return (
    <View style={styles.card}>
      {product.discount > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{product.discount}%</Text>
        </View>
      )}

      <Image source={product.image} style={styles.image} />
      
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      
      <Text style={styles.rating}>⭐ {product.rating}</Text>
      
      <View style={styles.priceContainer}>
        {product.discount > 0 ? (
          <>
            {}
            <Text style={styles.oldPrice}>{product.price} ₴</Text>
            {}
            <Text style={styles.newPrice}>{discountedPrice} ₴</Text>
          </>
        ) : (
          <Text style={styles.newPrice}>{product.price} ₴</Text>
        )}
      </View>
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
    resizeMode: 'contain', 
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
    height: 40,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E53935',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1, 
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  }
});

export default ProductCard;