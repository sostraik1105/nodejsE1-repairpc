const { Router } = require('express');

const { userExists } = require('../middlewares/users.middlewares');

const {
    createUsersValidations,
    checkValidations,
} = require('../middlewares/validation.middlewares');

const {
    createUser,
    findById,
    getAllUsers,
    updateUser,
    deleteUser,
} = require('../controllers/usersController');

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUsersValidations, checkValidations, createUser);
router
    .route('/:id')
    .get(userExists, findById)
    .patch(userExists, updateUser)
    .delete(userExists, deleteUser);

module.exports = { userRoutes: router };
