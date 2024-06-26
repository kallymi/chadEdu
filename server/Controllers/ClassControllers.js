const Class = require('../Models/ClassModel');
const Program = require('../Models/ProgramModel');
// Créer une nouvelle classe
exports.createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir toutes les classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('programs');
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour obtenir toutes les classes avec leurs programmes
exports.getAllClassesWithPrograms = async (req, res) => {
    try {
        const classes = await Class.find().populate('programs');
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Obtenir une classe par son ID avec les détails des programmes et le nombre de cours pour chaque programme
exports.getClassByIdWithPrograms = async (req, res) => {
    try {
        const classId = req.params.id;

        // Récupérer les détails de la classe
        const classDetails = await Class.findById(classId);

        // Récupérer les programmes associés à la classe avec le nombre de cours pour chaque programme
        const programsWithCourseCount = await Program.find({ class: classId }).populate('courses');
        const programsWithCourseCountAndDetails = programsWithCourseCount.map(program => ({
            ...program.toObject(),
            courseCount: program.courses.length
        }));

        // Renvoyer les détails de la classe avec les détails des programmes
        res.status(200).json({ classDetails, programs: programsWithCourseCountAndDetails });
    } catch (error) {
        res.status(404).json({ message: 'Classe non trouvée' });
    }
};

// Obtenir une classe par son ID
exports.getClassById = async (req, res) => {
    try {
        const classe = await Class.findById(req.params.id);
        res.status(200).json(classe);
    } catch (error) {
        res.status(404).json({ message: 'Classe non trouvée' });
    }
};

// Mettre à jour une classe par son ID
exports.updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Contrôleur pour supprimer une classe
exports.deleteClass = async (req, res) => {
    try {
        const classe = await Class.findById(req.params.id);
        if (!classe) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }

        await Class.findByIdAndDelete(req.params.id); // Utilisation de findByIdAndDelete pour supprimer la classe
        res.status(200).json({ message: 'Classe supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Affecter ou ajouter un Programme à une classe
exports.addProgramToClass = async (req, res) => {
    try {
        const { classId, programId } = req.body; // Utiliser la destructuration pour extraire les valeurs

        console.log('classId:', classId);
        console.log('programId:', programId);

        if (!classId || !programId) {
            return res.status(400).json({ message: 'classId et programId sont requis' });
        }

        // Recherchez la classe par son ID
        const classe = await Class.findById(classId);
        if (!classe) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }

        // Vérifiez si le programme existe
        const program = await Program.findById(programId);
        if (!program) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }

        // Ajoutez le programme à la liste des programmes de la classe
        classe.programs.push(programId);
        await classe.save();

        res.status(200).json({ message: 'Programme ajouté à la classe avec succès', classe });
    } catch (error) {
        console.error('Error adding program to class:', error); // Log l'erreur
        res.status(500).json({ message: error.message });
    }
};


// Fonction qui permet de récupérer le nombre total de documents dans la collection Class
exports.getClassCount = async (req, res) => {
    try {
        // Récupération du nombre de documents dans la collection Class
        const classCount = await Class.countDocuments();
        
        // Envoi de la réponse en format JSON avec le nombre de classes
        res.json({ count: classCount });
    } catch (error) {
        // Log de l'erreur dans la console pour le débogage
        console.error('Erreur lors de la récupération du nombre de classes:', error);

        // Envoi d'un message d'erreur avec le statut HTTP 500
        res.status(500).json({ message: 'Erreur lors de la récupération du nombre de classes' });
    }
};

exports.getClassByIdWithCourseCount = async (req, res) => {
    try {
        const classId = req.params.id;
        const classDetails = await Class.findById(classId).populate('programs');

        if (!classDetails) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }

        // Pour chaque programme de la classe, récupérez le nombre de cours associés
        const populatedPrograms = await Promise.all(
            classDetails.programs.map(async (program) => {
                // Utilisez la référence aux cours dans le modèle de programme pour compter les cours
                const courseCount = program.courses.length; // Supposant que chaque programme a un champ "courses" contenant des identifiants de cours
                return { ...program.toObject(), courseCount };
            })
        );

        classDetails.programs = populatedPrograms;

        res.status(200).json(classDetails);
    } catch (error) {
        console.error('Error fetching class details:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
// Obtenir les programmes associés à une classe spécifique
exports.getProgramsByClassId = async (req, res) => {
    try {
        const classId = req.params.classId;
        const classDetails = await Class.findById(classId).populate('programs');

        if (!classDetails) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }

        const programs = classDetails.programs; // Récupérer les programmes de la classe

        // Pour chaque programme de la classe, récupérer le nombre de cours associés
        const populatedPrograms = await Promise.all(
            programs.map(async (program) => {
                const courseCount = await Course.countDocuments({ program: program._id });
                return { ...program.toObject(), courseCount };
            })
        );

        res.status(200).json(populatedPrograms); // Renvoyer les programmes avec le nombre de cours associés
    } catch (error) {
        console.error('Error fetching programs by class ID:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
exports.addProgramToClass = async (req, res) => {
    const { classId, programId } = req.body;
    try {
    const classe = await Class.findById(classId);
    if (!classe) {
        return res.status(404).json({ message: 'Classe non trouvé' });
    }
    classe.program.push(programId);
    await classe.save();
    res.status(200).json({ message: 'Programme ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
