// user.controller.js
const User = require('../Models/Users');
const express = require('express');
const router = express.Router();
exports.getUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({ count: userCount });
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'utilisateurs:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du nombre d\'utilisateurs' });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ userId: user._id });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};