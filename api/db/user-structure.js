const connection = require('./db-connection');

// Connexion à la base de données MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err.message);
    return;
  }
  //DROP TABLES
  const QUERYDROPUSERS = `DROP TABLE IF EXISTS users`;
  const QUERYDROPROLES = `DROP TABLE  IF EXISTS roles`;
  const QUERYDROPUSERS_ROLES = `DROP TABLE  IF EXISTS user_roles `;
  connection.query(QUERYDROPUSERS_ROLES, (err) => {});
  connection.query(QUERYDROPROLES, (err) => {});
  connection.query(QUERYDROPUSERS, (err) => {});
  // Création de la table users
  const USERS = `
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

  connection.query(USERS, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table users :', err.message);
    } else {
      console.log('Table users créée avec succès.');
    }
  });

  // Création de la table ROLES
  const ROLES = `
    CREATE TABLE roles (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL
    )`
    ;

  connection.query(ROLES, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table roles :', err.message);
    } else {
      console.log('Table roles créée avec succès.');
    }
  });

  // Création de la table USERS_ROLES
  const USERS_ROLES = `
    CREATE TABLE user_roles (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      role_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (role_id) REFERENCES roles(id)
    )`
    ;

  connection.query(USERS_ROLES, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table USERS_ROLES :', err.message);
    } else {
      console.log('Table USERS_ROLES créée avec succès.');
    }
  });

  // insert user admin
  const INSERTUSERADMIN = `INSERT INTO users (username, email, password, created_at)
    VALUES ('admin', 'admin@admin.com', 'password123', NOW())`
    ;

  connection.query(INSERTUSERADMIN, (err) => {
    if (err) {
      console.error('Erreur lors de la insertion dans la table user :', err.message);
    } else {
      console.log('insertion avec succès.');
    }
  });

  // insert RolesValues 
  const ROLES_VALUES = `
  INSERT INTO roles (name)
  VALUES ('admin'), ('user'), ('webmaster')`
    ;

  connection.query(ROLES_VALUES, (err) => {
    if (err) {
      console.error('Erreur lors de la l"insertion de la table ROLES :', err.message);
    } else {
      console.log('insertion avec succès.');
    }
  });


  // insert Roles into user Admin 
  const ADMIN_ROLES_VALUE = `
    INSERT INTO user_roles (user_id, role_id)
    VALUES (1, 1), (1, 2), (1, 3)`
    ;

  connection.query(ADMIN_ROLES_VALUE, (err) => {
    if (err) {
      console.error('Erreur lors de la l"insertion de la table user_roles :', err.message);
    } else {
      console.log('insertion avec succès.');
    }
  });
  // Fermeture de la connexion à la base de données
  connection.end((err) => {
    if (err) {
      console.error('Erreur lors de la fermeture de la connexion à la base de données :', err.message);
    } else {
      console.log('Connexion à la base de données fermée avec succès.');
    }
  });
});
