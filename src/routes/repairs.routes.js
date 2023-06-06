const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repairs.controller');

// Rutas de reparaciones
router.get('/', repairController.getRepairs);
router.get('/:id', repairController.getRepairById);
router.post('/', repairController.createRepair);
router.patch('/:id', repairController.completeRepair);
router.delete('/:id', repairController.cancelRepair);

module.exports = router;
