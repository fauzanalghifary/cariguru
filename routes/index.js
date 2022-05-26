const router = require('express').Router();
const Controller = require('../Controllers/controller');

router.get('/',);
router.get('/register', Controller.register);
router.post('/register',);
router.get('/login',);
router.post('/login',);

router.get('/studentCard/:userId', Controller.studentCard);
router.get('/findTeachers', Controller.findTeachers);

router.get('/hireTeacher/:teacherId', Controller.getHireTeacher);
router.post('/hireTeacher/:teacherId', Controller.postHireTeacher);

router.get('/teacherCard/:teacherId', Controller.teacherCard);

router.get('/approve/:id', Controller.approve);
router.get('/reject/:id', Controller.reject);

module.exports = router;