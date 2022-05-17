const { Router } = require('express');

const {
    userExists,
    protectToken,
    protectEmployee,
    protectOwnerAccount,
} = require('../middlewares/users.middlewares');

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
    login,
} = require('../controllers/usersController');

const router = Router();

router.post('/', createUsersValidations, checkValidations, createUser);
router.post('/login', login);

router.use(protectToken);

router.get('/', protectEmployee, getAllUsers);
router
    .route('/:id')
    .get(userExists, findById)
    .patch(userExists, protectOwnerAccount, updateUser)
    .delete(userExists, protectOwnerAccount, deleteUser);

module.exports = { userRoutes: router };
