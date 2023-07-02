const connection = require('./db-connection');

// Connexion à la base de données MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err.message);
    return;
  }
  //DROP TABLES
  const QUERYDROP_ITEM_ROLES = `DROP TABLE  IF EXISTS item_roles`;
  const QUERYDROP_ITEMS = `DROP TABLE IF EXISTS items`;
  connection.query(QUERYDROP_ITEM_ROLES, (err) => {});
  connection.query(QUERYDROP_ITEMS, (err) => {});
  // Création de la table users
  const ITEMS = `
    CREATE TABLE items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      label VARCHAR(255) NOT NULL,
      link VARCHAR(255),
      icon VARCHAR(255),
      parent_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES items(id)
    )`;

  connection.query(ITEMS, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table ITEMS :', err.message);
    } else {
      console.log('Table ITEMS créée avec succès.');
    }
  });


  // Création de la table ITEM_ROLES 
  const ITEM_ROLES = `
      CREATE TABLE item_roles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        item_id INT NOT NULL,
        role_id INT NOT NULL,
        FOREIGN KEY (item_id) REFERENCES items(id),
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )`
    ;

  connection.query(ITEM_ROLES, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table ITEM_ROLES :', err.message);
    } else {
      console.log('Table ITEM_ROLES créée avec succès.');
    }
  });

  // insert 
  const INSERTUSERADMIN = `INSERT INTO items (label, link,icon, parent_id,created_at)
    VALUES 
    ('item1', null, 'fas fa-database',NULL, NOW()),
    ('item2', null, 'fas fa-database',NULL, NOW()),
    ('item3', null, 'fas fa-database',NULL, NOW()),
    ('item4', null, 'fas fa-database',1, NOW()),
    ('item5', null, 'fas fa-database',4, NOW()),
    ('item6', 'https://www.google.com', 'fas fa-database',5, NOW()),
    ('item7', null, 'fas fa-database',2, NOW()),
    ('item8', null, 'fas fa-database',7, NOW()),
    ('item9', 'https://www.google.com', 'fas fa-database',8, NOW()),
    ('item10', null, 'fas fa-database',3, NOW()),
    ('item11', null, 'fas fa-database',10, NOW()),
    ('item12', 'https://www.google.com', 'fas fa-database',11, NOW())
    `
    ;

  connection.query(INSERTUSERADMIN, (err) => {
    if (err) {
      console.error('Erreur lors de la insertion dans la table user :', err.message);
    } else {
      console.log('insertion avec succès.');
    }
  });


  // insert 
  const item_roles_VALUE = `
    INSERT INTO item_roles (item_id, role_id)
    VALUES (1, 1),(1, 2),(1, 3),
           (2, 2),
           (3, 3),
           (4, 1),
           (5, 2),
           (5, 3),
           (6, 1),
           (7, 3),
           (8, 3),
           (9, 3),
           (10, 3),
           (11, 3),
           (12, 3)
    `
    ;

  connection.query(item_roles_VALUE, (err) => {
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
