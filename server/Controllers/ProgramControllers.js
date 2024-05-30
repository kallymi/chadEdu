const Program = require('../Models/ProgramModel');
const Course = require('../Models/CourseModel');

// Créer un nouveau programme
exports.createProgram = async (req, res) => {
  try {
    const newProgram = new Program(req.body);
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les programmes
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Obtenir un programme par son ID
// exports.getProgramById = async (req, res) => {
//   try {
//       const program = await Program.findById(req.params.id).populate('courses');
//       res.status(200).json(program);
//   } catch (error) {
//       res.status(404).json({ message: 'Programme non trouvé' });
//   }
// };
// Obtenir un programme par son ID avec les détails complets des cours
exports.getProgramByIdWithCourses = async (req, res) => {
  try {
      const program = await Program.findById(req.params.id).populate('courses');
      // Si vous avez besoin des détails complets de chaque cours, vous pouvez également les récupérer ici
      const courses = await Course.find({ _id: { $in: program.courses } });
      // Ajoutez les détails des cours au programme
      const programWithCoursesDetails = { ...program.toObject(), courses };
      res.status(200).json(programWithCoursesDetails);
  } catch (error) {
      res.status(404).json({ message: 'Programme non trouvé' });
  }
};
// Mettre à jour un programme par son ID
exports.updateProgramById = async (req, res) => {
  try {
      const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedProgram);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Contrôleur pour supprimer un programme par son ID
exports.deleteProgram = async (req, res) => {
  try {
      const programId = req.params.id;
      
      // Vérifier si le programme existe
      const program = await Program.findById(programId);
      if (!program) {
          return res.status(404).json({ message: 'Programme non trouvé' });
      }

      // Supprimer le programme de la base de données
      await Program.findByIdAndDelete(programId);

      res.status(200).json({ message: 'Programme supprimé avec succès' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// exports.addCourseToProgram = async (req, res) => {
//   const { courseId, programId } = req.body; // Supposons que les ID sont envoyés dans le corps de la requête

//   try {
//       // Ajouter le cours au programme
//       const updatedProgram = await Program.findByIdAndUpdate(
//           programId,
//           { $push: { courses: courseId } },
//           { new: true }
//       );

//       // Vérifier si le programme a été trouvé et mis à jour
//       if (!updatedProgram) {
//           return res.status(404).json({ error: "Programme non trouvé." });
//       }

//       return res.status(200).json(updatedProgram);
//   } catch (error) {
//       console.error("Erreur lors de l'ajout du cours au programme :", error);
//       return res.status(500).json({ error: "Erreur lors de l'ajout du cours au programme." });
//   }
// };
// Contrôleur de programme
exports.addCourseToProgram = async (req, res) => {
  const { programId, courseId } = req.body;
  try {
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    program.courses.push(courseId);
    await program.save();
    res.status(200).json({ message: 'Cours ajouté avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
};


exports.getProgramCount = async (req, res) => {
  try {
      // Récupération du nombre de documents dans la collection Program
      const programCount = await Program.countDocuments();
      
      // Envoi de la réponse en format JSON avec le nombre de Programme
      res.json({ count: programCount });
  } catch (error) {
      // Log de l'erreur dans la console pour le débogage
      console.error('Erreur lors de la récupération du nombre de programmes:', error);

      // Envoi d'un message d'erreur avec le statut HTTP 500
      res.status(500).json({ message: 'Erreur lors de la récupération du nombre de programmes' });
  }
};