const express = require('express');
const router = require("express").Router();
const Auth = require("../Controllers/Auth");
const classController = require('../Controllers/ClassControllers');
const programController = require('../Controllers/ProgramControllers');
const courseController = require('../Controllers/CourseControllers');
const registrationController = require('../Controllers/RegistrationControllers');
const userController = require('../Controllers/UserControllers');
//Authentication with JWT
router.post("/signup", Auth.signUP) ;
router.post("/signin", Auth.signIn);

router.get('/api/user/me', userController.getUserById);
// ************** Routes pour les Classes ***************

// Route pour créer une nouvelle classe
router.post('/classes', classController.createClass);
// Route pour obtenir toutes les classes
router.get('/classes', classController.getAllClasses);
// Route pour obtenir une classe par son ID
router.get('/classes/:id', classController.getClassById);
router.get('/classe/:id', classController.getClassByIdWithPrograms);
// ROute qui renvoie le nombre de course de programe
router.get('/class/:id', classController.getClassByIdWithCourseCount);
// Route pour mettre à jour une classe par son ID
router.put('/classes/:id', classController.updateClass);
// Route pour supprimer une classe par son ID
router.delete('/classes/:id', classController.deleteClass);
// Route pour ajouter un programme à une classe
router.post('/classes/:classId/programs', classController.addProgramToClass);
// Route pour récupérer les programmes d'une classe spécifique
router.get('/class/:classId/programs', classController.getProgramsByClassId);
// router.get('/:id/programs', classController.getProgramsByClassId);
// ************** Routes pour les Programmes ***************

// Route pour créer un nouveau programme
router.post('/programs', programController.createProgram);
// Route pour obtenir tous les programmes
router.get('/programs', programController.getAllPrograms);
// Route pour obtenir un programme par son ID
router.get('/programs/:id', programController.getProgramByIdWithCourses);
// Route pour mettre à jour un programme par son ID
router.put('/programs/:id', programController.updateProgramById);
// Route pour supprimer un programme par son ID
router.delete('/programs/:id', programController.deleteProgram);
// Route pour ajouter un cours à un programme
router.post('/programs/add-course', programController.addCourseToProgram);

// ************** Routes pour les Cours ***************

// Route pour créer un nouveau cours
router.post('/courses', courseController.createCourse);
// Route pour obtenir tous les cours
router.get('/courses', courseController.getAllCourses);
// Route pour obtenir un cours par son ID
router.get('/courses/:id', courseController.getCourseById);
// Route pour mettre à jour un cours par son ID
router.put('/courses/:id', courseController.updateCourse);
// Route pour supprimer un cours par son ID
router.delete('/courses/:id', courseController.deleteCourse);

// ************** Routes pour les inscription ***************

// Route pour inscrire un utilisateur à une classe
router.post('/register', registrationController.registerUserToClass);

// Route pour obtenir tous les inscrits d'une classe
router.get('/registrations/:classId', registrationController.getAllClassRegistrations);

// Route pour supprimer un utilisateur inscrit à une classe
router.delete('/registrations/delete', registrationController.deleteUserFromClass);

router.get('/count', userController.getUserCount);
router.get('/users', userController.getAllUsers);
module.exports = router;
