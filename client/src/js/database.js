import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1); // Open the existing database

    const tx = db.transaction('jate', 'readwrite'); // Start a transaction in 'readwrite' mode
    const store = tx.objectStore('jate'); // Get the object store

    // Add the content to the database
    const id = await store.add({ content }); // You can use content as an object property

    await tx.done; // Complete the transaction
    db.close(); // Close the database

    console.log(`Content with ID ${id} added to the database.`);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1); // Open the existing database
    const tx = db.transaction('jate', 'readonly'); // Start a read-only transaction
    const store = tx.objectStore('jate'); // Get the object store

    const allContent = await store.getAll(); // Retrieve all content from the object store

    await tx.done; // Complete the transaction
    db.close(); // Close the database

    return allContent;
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return [];
  }
};

initdb();
