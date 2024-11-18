import * as SQLite from 'expo-sqlite';

// Abrir o banco de dados local
export const db = SQLite.openDatabase('appdb.db');
