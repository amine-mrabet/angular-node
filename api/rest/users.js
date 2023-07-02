const connection = require('../db/db-connection');
const express = require('express');
const router = express.Router();
const secretKey = 'amine';
const jwt = require('jsonwebtoken');
// authentication
router.get('/api/login', (req, res) => {
    // Validate user credentials and generate JWT token
    const username = req.query.username;
    const password = req.query.password;
    // Check username and password against the database or perform necessary operations
    const query = `
        SELECT u.id AS user_id, u.username, u.email,
        GROUP_CONCAT(r.name) AS roles
        FROM users u  JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        WHERE u.username = ? AND u.password = ?
        GROUP BY u.id, u.username, u.email`;
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        if (results.length) {
            let roles = results[0].roles.split(",");
            results[0].roles = roles;
            const token = jwt.sign({ username, roles: results[0].roles }, secretKey, { expiresIn: '3h' });

            return res.status(200).json({ token });
        }
        res.status(401).json({ message: 'Invalid credentials' });
    });


});

// find User by userId
router.get('/api/findUser', verifyToken,(req, res) => {
    const userId = req.query.userId; // Assuming the filter is based on userId

    // Execute the MySQL query with a WHERE clause
    const query = `
        SELECT u.id AS user_id, u.username, u.email,
        GROUP_CONCAT(r.name) AS roles
        FROM users u  JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        SELECT * FROM users WHERE id = ?
        GROUP BY u.id, u.username, u.email`;
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Error executing query');
            return;
        }

        res.json(results);
    });
});

// GET /api/users - Get all Users
router.get('/api/users', verifyToken, (req, res) => {
    const QUERYALLUSERS = 
    `SELECT u.id AS user_id, u.username, u.email,
    GROUP_CONCAT(r.name) AS roles
    FROM users u  JOIN user_roles ur ON u.id = ur.user_id
    JOIN roles r ON ur.role_id = r.id
    GROUP BY u.id, u.username, u.email
    `;
    connection.query(QUERYALLUSERS, (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        results.forEach(function(element) {
            let roles = element.roles.split(",");
            element.roles = roles;
          });

        res.send(results);
    });
});

// GET /api/user/save - save User
router.post('/api/user/save',verifyToken, (req, res) => {
    // Access the request body data
    const user = req.body;

    // Insert the data into the MySQL database
    connection.query('INSERT INTO users SET ?', user, (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.send(results);
    });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    var tokenold = req.headers.authorization;
    const token = tokenold.substr(7);
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }

        req.user = decoded.username;
        next();
    });
}

module.exports = router;