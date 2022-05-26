const router = require('express').Router();
const { register } = require('../Controllers/controller');
const Controller = require('../Controllers/controller');

router.get('/',);
router.get('/register', Controller.register);
router.get('/registerStudent', Controller.registerStudent)
router.post('/registerStudent', Controller.insertStudent)
router.get('/registerTeacher', Controller. registerTeacher)
router.post('/registerTeacher', Controller.insertTeacher)
router.get('/login', Controller.login);
router.post('/login', Controller.sessionMake);

router.use((req, res, next)=>{
    if(!req.session.user){
        let error = 'silahkan login terlebih dahulu'
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})


router.get('/studentCard', Controller.studentCard);
router.get('/findTeachers', Controller.findTeachers);

router.get('/hireTeacher/:teacherId', Controller.getHireTeacher);
router.post('/hireTeacher/:teacherId', Controller.postHireTeacher);

router.get('/teacherCard/:teacherId', Controller.teacherCard);

router.get('/approve/:id', Controller.approve);
router.get('/reject/:id', Controller.reject);

module.exports = router;