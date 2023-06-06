const User = require('../models/user.model');

// Traer todos los users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where:{
        status: 'available',
      }
      });
       res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'fail', message: 'Something went wrong 😢' });
  }
};

// Traer un usuario por id

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} not found 😒` });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};

// Crear un nuevo usuario

exports.createUsers = async (req, res) => {
  try {
    const users = req.body;

    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const createdUser = await User.create(user);
        return createdUser;
      })
    );

    res.status(201).json({ message: 'Users created 👌', users: createdUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};

// Actualizar datos de un usuario

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByPk({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} not found 😒` });
    }

    await user.update({ name, email });

    res.json({ message: 'User updated ✌️', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};

// Eliminar por completo un usuario

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    await user.destroy();

    res.json({ message: 'User deleted ❎' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};

// Deshabilitar un usuario

exports.disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    await user.update({ status: 'disabled' });

    res.json({ message: 'User disabled ➖' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong 😢' });
  }
};