const { Router } = require('express');

const { repairPending } = require('../middlewares/repairs.middleware');

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

router.get('/', getPendingRepairs);
router.get('/all', getAllRepairs);
router.get('/all/:id', repairPending, getRepairById);
router.post('/', createRequireValidations, checkValidations, createNewRepair);
router
    .route('/:id')
    .get(repairPending, getPendingById)
    .patch(repairPending, updateRepair)
    .delete(repairPending, cancelRepair);

module.exports = { repairRoutes: router };
