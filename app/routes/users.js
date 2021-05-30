const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// POST request for creating a new user
router.post('/', usersController.create_user);

// GET request to show all users
router.get('/', usersController.show_all_users);

// POST request for creating a new user
router.post('/roles', usersController.add_new_role);

// PUT request for adding role to user
router.put('/:userId', usersController.edit_user_role);


// Delete request for removing a user
router.delete('/:userId', usersController.delete_user);


module.exports = router;
