const Registration = require('../Models/RegistretionModel');
const Class = require('../Models/ClassModel');
const User = require('../Models/Users');

// Controller pour l'inscription d'un utilisateur à une classe
exports.registerUserToClass = async (req, res) => {
    try {
        const { userId, classId } = req.body;

        // Vérifier si l'utilisateur et la classe existent
        const user = await User.findById(userId);
        const classObj = await Class.findById(classId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (!classObj) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }

        // Créer une nouvelle inscription
        const registration = new Registration({
            user: userId,
            class: classId
        });

        // Enregistrer l'inscription dans la base de données
        await registration.save();

        res.status(201).json({ message: 'Inscription réussie' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
};
// Controller pour afficher tous les inscrits d'une classe
exports.getAllClassRegistrations = async (req, res) => {
    try {
        const classId = req.params.classId;

        // Trouver toutes les inscriptions de la classe donnée
        const registrations = await Registration.find({ class: classId }).populate('user');

        res.json(registrations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la récupération des inscriptions de la classe' });
    }
};

// Controller pour supprimer un utilisateur inscrit à une classe
exports.deleteUserFromClass = async (req, res) => {
    try {
        const { userId, classId } = req.body;

        // Supprimer l'inscription de l'utilisateur à la classe
        await Registration.findOneAndDelete({ user: userId, class: classId });

        res.json({ message: 'Utilisateur supprimé de la classe avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur de la classe' });
    }
};
