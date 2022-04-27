const { User } = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json(error);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body;

        const newUser = await User.create({
            name,
            email,
            password,
            role,
            status,
        });

        res.status(201).json({ newUser });
    } catch (error) {
        res.status(400).json(error);
    }
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const selectedUser = await User.findOne({ where: { id } });

        if (!selectedUser) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found given that id',
            });
        }

        res.status(201).json({ selectedUser });
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, status } = req.body;
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found given that id',
            });
        }

        await user.update({ name, email, password, role, status });

        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found given that id',
            });
        }

        await user.update({ status: 'disabled' });
        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    findById,
    updateUser,
    deleteUser,
};
