const connection = require('../db/db-connection');
const express = require('express');
const router = express.Router();
const secretKey = 'amine';
const jwt = require('jsonwebtoken');
// get Menu
router.get('/api/getItems',verifyToken, (req, res) => {

    // Execute the MySQL query with a WHERE clause
    const query = `
            SELECT i.id,i.label,i.parent_id,i.link,i.icon,
            GROUP_CONCAT(r.name) AS roles
        FROM items i
        LEFT JOIN
            item_roles ir ON i.id = ir.item_id
        LEFT JOIN
            roles r ON ir.role_id = r.id
        GROUP BY
            i.id, i.label; 
        `;
    connection.query(query, (err, results) => {
        let items = []
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Error executing query');
            return;
        } else {

            results.forEach(function (element) {
                element.items = []
                element.link = [element.link]
                if (element.parent_id != null) {
                    items = setItem(element, items)
                } else {
                    items.push(element)
                    items.forEach(function (element) {
                        if (element.roles.includes(',')) {
                            let roles = element.roles.split(",");
                            element.roles = roles;
                        }else {
                            element.roles = Array.isArray(element.roles) ? element.roles : [element.roles];
                        }

                    })

                }

            });
        }

        res.json(items);
    });
});

function setItem(item, items) {
    if (items.filter(el => el.id == item.parent_id).length) {
        if (items.filter(el => el.id == item.parent_id).length) {
            let parent_item = items.filter(el => el.id == item.parent_id)[0]
            parent_item.items.push(item);
            parent_item.items.forEach(function (element) {
                if (element.roles.includes(',')) {
                    let roles = element.roles.split(",");
                    element.roles = roles;
                } else {
                    element.roles = Array.isArray(element.roles) ? element.roles : [element.roles];
                }
            })

        }

    } else {
        items.forEach(function (element) {
            setItem(item, element.items)
        })

    }


    return items
}
// Middleware to verify JWT token
function verifyToken(req, res, next) {
    var tokenold = req.headers.authorization;
    const token = tokenold!=null ? tokenold.substr(7) : null;
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