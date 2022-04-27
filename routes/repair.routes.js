const { Router } = require('express');
const {
    getPendingRepairs,
    getAllRepairs,
    createNewRepair,
    getPendingById,
    updateRepair,
    cancelRepair,
} = require('../controllers/repairController');

const router = Router();

router.get('/', getPendingRepairs);
router.get('/all', getAllRepairs);
router.post('/', createNewRepair);
router
    .route('/:id')
    .get(getPendingById)
    .patch(updateRepair)
    .delete(cancelRepair);

module.exports = { repairRoutes: router };
