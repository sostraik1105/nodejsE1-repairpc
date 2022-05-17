const { Router } = require('express');

const { repairPending } = require('../middlewares/repairs.middleware');

const {
    protectToken,
    protectEmployee,
} = require('../middlewares/users.middlewares');

const {
    createRequireValidations,
    checkValidations,
} = require('../middlewares/validation.middlewares');

const {
    getPendingRepairs,
    getAllRepairs,
    createNewRepair,
    getPendingById,
    updateRepair,
    cancelRepair,
    getRepairById,
} = require('../controllers/repairController');

const router = Router();

router.use(protectToken, protectEmployee);
router.get('/all/:id', repairPending, getRepairById);
router.get('/all', getAllRepairs);
router.get('/', getPendingRepairs);
router.post('/', createRequireValidations, checkValidations, createNewRepair);
router
    .route('/:id')
    .get(repairPending, getPendingById)
    .patch(repairPending, updateRepair)
    .delete(repairPending, cancelRepair);

module.exports = { repairRoutes: router };
