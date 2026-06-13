import SQLite from 'react-native-sqlite-storage';

// Открываем или создаём БД
const db = SQLite.openDatabase(
  {
    name: 'HomeSmart.db',
    location: 'default',
  },
  () => console.log('DB opened'),
  error => console.error('DB error:', error)
);

// Тип товара
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  specs: string; 
  image: string;
}

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Таблица товаров
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price INTEGER NOT NULL,
          description TEXT,
          specs TEXT,
          image TEXT
        );`,
        [],
        () => {},
        error => reject(error)
      );
    
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS cart_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        );`,
        [],
        () => {},
        error => reject(error)
      );

      tx.executeSql(
        `SELECT COUNT(*) as count FROM products;`,
        [],
        (_, result) => {
          const count = result.rows.item(0).count;
          if (count === 0) {
            const cameras = [
              ['Камера TTH+', 15000, 'Станет отличным дополнением для системы умного дома.', JSON.stringify({ camera: '58 м²', memory: '16 Гб', battery: '4 ч.' }), 'https://chipgifts.ru/image/cache/Nest%20Labs/Nest%20Cam%20Indoor/-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%BE%D0%BC%D0%B0-Nest-Cam-Indoor_1-1000x1000.jpg'],
              ['Камера TTH-175', 15000, 'Компактная камера для наблюдения.', JSON.stringify({ camera: '48 м²', memory: '8 Гб', battery: '3 ч.' }), 'https://chipgifts.ru/image/cache/Nest%20Labs/Nest%20Cam%20Indoor/-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%BE%D0%BC%D0%B0-Nest-Cam-Indoor_1-1000x1000.jpg'],
              ['Уличная камера HomeCam Pro', 23900, 'Защита от влаги, ночное видение.', JSON.stringify({ camera: '120 м²', memory: '32 Гб', battery: '6 ч.' }), 'https://chipgifts.ru/image/cache/Nest%20Labs/Nest%20Cam%20Indoor/-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%BE%D0%BC%D0%B0-Nest-Cam-Indoor_1-1000x1000.jpg'],
              ['Камера-звонок SmartBell', 8900, 'Видеодомофон с ИК-подсветкой.', JSON.stringify({ camera: '15 м²', memory: '4 Гб', battery: '2 ч.' }), 'https://chipgifts.ru/image/cache/Nest%20Labs/Nest%20Cam%20Indoor/-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%BE%D0%BC%D0%B0-Nest-Cam-Indoor_1-1000x1000.jpg'],
              ['PTZ-камера HomeRotate', 19900, 'Поворотная с панорамным обзором.', JSON.stringify({ camera: '360°', memory: '64 Гб', battery: '8 ч.' }), 'https://chipgifts.ru/image/cache/Nest%20Labs/Nest%20Cam%20Indoor/-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%BE%D0%BC%D0%B0-Nest-Cam-Indoor_1-1000x1000.jpg'],
            ];
            cameras.forEach(cam => {
              tx.executeSql(
                `INSERT INTO products (name, price, description, specs, image) VALUES (?, ?, ?, ?, ?);`,
                cam,
                () => {},
                error => console.error('Insert error', error)
              );
            });
          }
        },
        error => reject(error)
      );
    }, reject, resolve);
  });
};


export const getAllProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM products;`,
        [],
        (_, result) => {
          const products: Product[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            products.push(result.rows.item(i));
          }
          resolve(products);
        },
        error => reject(error)
      );
    });
  });
};

export const getProductById = (id: number): Promise<Product> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM products WHERE id = ?;`,
        [id],
        (_, result) => {
          if (result.rows.length > 0) resolve(result.rows.item(0));
          else reject('Product not found');
        },
        error => reject(error)
      );
    });
  });
};


export const getCartItems = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT cart_items.id as cartId, products.*, cart_items.quantity 
         FROM cart_items 
         JOIN products ON cart_items.product_id = products.id;`,
        [],
        (_, result) => {
          const items = [];
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
          }
          resolve(items);
        },
        error => reject(error)
      );
    });
  });
};


export const addToCartDb = (productId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Проверяем, есть ли уже такой product_id
      tx.executeSql(
        `SELECT * FROM cart_items WHERE product_id = ?;`,
        [productId],
        (_, result) => {
          if (result.rows.length > 0) {
            const existing = result.rows.item(0);
            const newQuantity = existing.quantity + 1;
            tx.executeSql(
              `UPDATE cart_items SET quantity = ? WHERE product_id = ?;`,
              [newQuantity, productId],
              () => getCartItems().then(resolve),
              error => reject(error)
            );
          } else {
            tx.executeSql(
              `INSERT INTO cart_items (product_id, quantity) VALUES (?, 1);`,
              [productId],
              () => getCartItems().then(resolve),
              error => reject(error)
            );
          }
        },
        error => reject(error)
      );
    });
  });
};


export const removeFromCartDb = (cartId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM cart_items WHERE id = ?;`,
        [cartId],
        () => getCartItems().then(resolve),
        error => reject(error)
      );
    });
  });
};


export const clearCart = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(`DELETE FROM cart_items;`, [], () => resolve(), error => reject(error));
    });
  });
};