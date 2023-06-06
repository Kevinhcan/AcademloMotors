const Repair = require('../models/repair.model');
const User = require('../models/user.model');

// Traer todas las reparaciones pendientes
const getRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: 'pending'
      },
    });
    res.json(repairs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};

// Traer una reparación pendiente por id
const getRepairById = async (req, res) => {
  try {
    const repairId = req.params.id;
    const repair = await Repair.findByPk(repairId, {
      
    });

    if (!repair || repair.status !== 'pending') {
      return res.status(404).json({ message: 'Repair not found 😒' });
    }
    res.json(repair);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};

// Crear una cita nueva
const createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found 😒' });
    }

    const repair = await Repair.create({
      date,
      userId
    });

    res.json(repair);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};

// Actualizar el estado de una reparación a completado
const completeRepair = (req, res) => {
  const repairId = req.params.id;

  Repair.update({ status: 'completed' }, { where: { id: repairId, status: 'pending' } })
    .then(result => {
      if (result[0] === 0) {
        return res.status(404).json({ message: 'Repair not found or not pending 🤔' });
      }
      res.json({ message: 'Repair completed 👌' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Something went wrong 😢' });
      console.log(error);
    });
};

// Cancelar una reparación por id
const cancelRepair = (req, res) => {
  const repairId = req.params.id;

  Repair.update({ status: 'cancelled' }, { where: { id: repairId, status: 'pending' } })
    .then(result => {
      if (result[0] === 0) {
        return res.status(404).json({ message: 'Repair not found or not pending 🤔' });
      }
      res.json({ message: 'Repair cancelled 😥' });
    })
    .catch(error => {
      res.status(500).json({ message: 'Something went wrong 😢' });
      console.log(error);
    });

};

module.exports = {
  getRepairs,
  getRepairById,
  createRepair,
  completeRepair,
  cancelRepair
};
