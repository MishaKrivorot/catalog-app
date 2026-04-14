import { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  rating: number;   
  discount: number; 
  category: string; // Додано: Категорія товару
}

// Список категорій для меню
export const CATEGORIES = ['Всі', 'Комп\'ютери', 'Смартфони', 'Аудіо', 'Гаджети', 'Периферія', 'Мережі'];

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Ноутбук Ігровий 15.6"', price: 35000, rating: 4.8, discount: 10, category: 'Комп\'ютери',
    image: require('../assets/images/laptop.jpg') // Тут і далі залишай свої шляхи
  },
  {
    id: '2', name: 'Смартфон 12GB/512GB', price: 70000, rating: 4.9, discount: 5, category: 'Смартфони',
    image: require('../assets/images/phone.webp') 
  },
  {
    id: '3', name: 'Бездротові навушники', price: 2100, rating: 4.5, discount: 15, category: 'Аудіо',
    image: require('../assets/images/earbuds.webp')
  },
  {
    id: '4', name: 'Смарт-годинник', price: 28000, rating: 4.7, discount: 0, category: 'Гаджети',
    image: require('../assets/images/watch.webp')
  },
  {
    id: '5', name: 'Планшет', price: 40000, rating: 4.6, discount: 8, category: 'Смартфони', // Можна віднести до смартфонів або гаджетів
    image: require('../assets/images/tablet.webp')
  },
  {
    id: '6', name: 'Павербанк 60000mAh', price: 4500, rating: 4.3, discount: 0, category: 'Гаджети',
    image: require('../assets/images/powerbank.webp')
  },
  {
    id: '7', name: 'Механічна клавіатура', price: 5600, rating: 4.8, discount: 12, category: 'Периферія',
    image: require('../assets/images/keyboard.webp')
  },
  {
    id: '8', name: 'Ігрова миша', price: 3200, rating: 4.4, discount: 20, category: 'Периферія',
    image: require('../assets/images/mouse.webp')
  },
  {
    id: '9', name: 'Монітор 27" 144Hz', price: 20999, rating: 4.9, discount: 10, category: 'Периферія',
    image: require('../assets/images/monitor.webp')
  },
  {
    id: '10', name: 'Веб-камера 1080p', price: 4200, rating: 4.1, discount: 0, category: 'Периферія',
    image: require('../assets/images/webcam.webp')
  },
  {
    id: '11', name: 'Мікрофон студійний', price: 4200, rating: 4.7, discount: 5, category: 'Аудіо',
    image: require('../assets/images/microphone.webp')
  },
  {
    id: '12', name: 'Wi-Fi Роутер 6', price: 700, rating: 4.2, discount: 0, category: 'Периферія',
    image: require('../assets/images/router.webp')
  }
];