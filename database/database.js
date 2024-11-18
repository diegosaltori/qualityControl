import * as SQLite from 'expo-sqlite';

// Abrir o banco de dados local
export const db = SQLite.openDatabase('appdb.db');

// Função para criar as tabelas
export const createTables = () => {
  db.transaction(tx => {
    // Tabela de usuários
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      )`,
      [],
      () => {
        console.log("Tabela 'users' criada ou já existe.");
      },
      (txObj, error) => {
        console.log('Erro ao criar tabela de usuários:', error);
      }
    );

    // Tabela para os itens cadastrados
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        status TEXT,
        origin TEXT,
        responsible_identification_name TEXT,
        responsible_identification_email TEXT,
        identification_date TEXT,
        immediate_action TEXT,
        cause_analysis TEXT,
        action_deadline TEXT,
        responsible_action_name TEXT,
        responsible_action_email TEXT,
        action_finish_date TEXT,
        effectiveness TEXT,
        responsible_effectiveness_name TEXT,
        responsible_effectiveness_email TEXT,
        critical_analysis_date TEXT,
        responsible_director_name TEXT,
        responsible_director_email TEXT
      )`,
      [],
      () => {
        console.log("Tabela 'items' criada ou já existe.");
      },
      (txObj, error) => {
        console.log('Erro ao criar tabela de itens:', error);
      }
    );
  });
};

// Função para inserir um usuário
export const insertUser = (name, email, password) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
      () => {
        console.log('Usuário cadastrado com sucesso!');
      },
      (txObj, error) => {
        console.log('Erro ao cadastrar usuário:', error);
      }
    );
  });
};

// Função para consultar um usuário por e-mail e senha
export const loginUser = (email, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (txObj, resultSet) => {
        if (resultSet.rows.length > 0) {
          callback(resultSet.rows.item(0)); // Retorna o primeiro usuário encontrado
        } else {
          callback(null); // Nenhum usuário encontrado
        }
      },
      (txObj, error) => {
        console.log('Erro ao consultar usuário:', error);
      }
    );
  });
};

// Função para inserir um item
export const insertItem = (title, description, status, origin, responsibleIdentificationName, responsibleIdentificationEmail, identificationDate, immediateAction, causeAnalysis, actionDeadline, responsibleActionName, responsibleActionEmail, actionFinishDate, effectiveness, responsibleEffectivenessName, responsibleEffectivenessEmail, criticalAnalysisDate, responsibleDirectorName, responsibleDirectorEmail) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (title, description, status, origin, responsible_identification_name, responsible_identification_email, identification_date, immediate_action, cause_analysis, action_deadline, responsible_action_name, responsible_action_email, action_finish_date, effectiveness, responsible_effectiveness_name, responsible_effectiveness_email, critical_analysis_date, responsible_director_name, responsible_director_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, status, origin, responsibleIdentificationName, responsibleIdentificationEmail, identificationDate, immediateAction, causeAnalysis, actionDeadline, responsibleActionName, responsibleActionEmail, actionFinishDate, effectiveness, responsibleEffectivenessName, responsibleEffectivenessEmail, criticalAnalysisDate, responsibleDirectorName, responsibleDirectorEmail],
      () => {
        console.log('Item cadastrado com sucesso!');
      },
      (txObj, error) => {
        console.log('Erro ao cadastrar item:', error);
      }
    );
  });
};

// Função para obter todos os itens cadastrados
export const getItems = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM items',
      [],
      (txObj, resultSet) => {
        const items = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
          items.push(resultSet.rows.item(i));
        }
        callback(items); // Retorna todos os itens
      },
      (txObj, error) => {
        console.log('Erro ao buscar itens:', error);
      }
    );
  });
};

// Função para atualizar um item
export const updateItem = (id, title, description, status, origin, responsibleIdentificationName, responsibleIdentificationEmail, identificationDate, immediateAction, causeAnalysis, actionDeadline, responsibleActionName, responsibleActionEmail, actionFinishDate, effectiveness, responsibleEffectivenessName, responsibleEffectivenessEmail, criticalAnalysisDate, responsibleDirectorName, responsibleDirectorEmail) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE items SET title = ?, description = ?, status = ?, origin = ?, responsible_identification_name = ?, responsible_identification_email = ?, identification_date = ?, immediate_action = ?, cause_analysis = ?, action_deadline = ?, responsible_action_name = ?, responsible_action_email = ?, action_finish_date = ?, effectiveness = ?, responsible_effectiveness_name = ?, responsible_effectiveness_email = ?, critical_analysis_date = ?, responsible_director_name = ?, responsible_director_email = ? WHERE id = ?',
      [title, description, status, origin, responsibleIdentificationName, responsibleIdentificationEmail, identificationDate, immediateAction, causeAnalysis, actionDeadline, responsibleActionName, responsibleActionEmail, actionFinishDate, effectiveness, responsibleEffectivenessName, responsibleEffectivenessEmail, criticalAnalysisDate, responsibleDirectorName, responsibleDirectorEmail, id],
      () => {
        console.log('Item atualizado com sucesso!');
      },
      (txObj, error) => {
        console.log('Erro ao atualizar item:', error);
      }
    );
  });
};

// Função para excluir um item
export const deleteItem = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM items WHERE id = ?',
      [id],
      () => {
        console.log('Item excluído com sucesso!');
        callback();
      },
      (txObj, error) => {
        console.log('Erro ao excluir item:', error);
      }
    );
  });
};
