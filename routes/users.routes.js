const { Router } = require('express');
const {
    createUser,
    findById,
    getAllUsers,
    updateUser,
    deleteUser,
} = require('../controllers/usersController');

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.route('/:id').get(findById).patch(updateUser).delete(deleteUser);

module.exports = { userRoutes: router };
