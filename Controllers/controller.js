const { Teacher, User, UserTeacher, UserDetail } = require('../models');
const formatDate = require('../helpers/formatDate');
const formatRupiah = require('../helpers/formatRupiah');
const bcrypt = require('bcryptjs');

class Controller {


    static register(req, res) {
        res.render('register');
    }

    static registerStudent(req, res){
        res.render('registerStudent')
    }

    static insertStudent(req, res){
        User.create({
            username: req.body.user,
            password: req.body.pass,
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date,
            status: 'inactive'
        })
            .then(newUser=>{
                UserDetail.create({
                    email: req.body.email,
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    UserId: newUser.id
                })
            })
            .then(()=>{
                res.redirect('/login')
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static registerTeacher(req, res){
        res.render('registerTeacher')
    }

    static insertTeacher(req, res){
        User.create({
            username: req.body.user,
            password: req.body.pass,
            role: 'teacher',
            createdAt: new Date(),
            updatedAt: new Date,
            status: 'inactive'
        })
            .then(newUser=>{
                UserDetail.create({
                    email: req.body.email,
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    UserId: newUser.id,
                    createdAt: new Date(),
                    updatedAt: new Date,
                })
                Teacher.create({
                    fullName: req.body.fullName,
                    field: req.body.field,
                    yearOfExperience: req.body.yearOfExperience,
                    fee: req.body.fee,
                    UserId: newUser.id,
                    createdAt: new Date(),
                    updatedAt: new Date,
                })
            })
            .then(()=>{
                res.redirect('/login')
            })
            .catch(err=>{
                res.send(err)
            })
    }


    static login(req, res) {
        let error;
        if (req.query.error) {
            error = req.query.error;
        }
        res.render('login', { error });
    }

    static sessionMake(req, res) {
        User.findOne({
            where: {
                username: req.body.user
            }
        })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.pass, user.password)) {
                        // console.log(user.id);
                        if(user.status==='active'){
                            console.log('hereeee');
                            req.session.userId = user.id;
                            req.session.user = user.username;
                            req.session.role = user.role;
                            if (user.role === "student") {
                                res.redirect(`/studentCard`);
                            } else if (user.role === "teacher") {
                                Teacher.findOne({
                                    where: {
                                        UserId: user.id
                                    }
                                })
                                    .then(teacher => {
                                        console.log('masuk teacher');
                                        console.log(teacher);
                                        req.session.teacherId = teacher.id;
                                        res.redirect(`/teacherCard`);
                                    })
                                    .catch(err => {
                                        res.send(err);
                                    });
                            }
                        }else{
                            let error = 'User belum terverifikasi';
                            res.redirect(`/login?error=${error}`);
                        }
                    } else {
                        let error = 'Password salah';
                        res.redirect(`/login?error=${error}`);
                    }
                } else {
                    let error = 'User tidak terdaftar';
                    res.redirect(`/login?error=${error}`);
                }
            })
            .catch(err => {
                res.send(err);
            });
    }

    static studentCard(req, res) {
        let UserId = req.session.userId;
        let userTeachers;

        UserTeacher.findAll({
            include: Teacher,
            where: {
                UserId: UserId
            }
        })
            .then(UserTeachers => {
                // console.log(UserTeachers);
                userTeachers = UserTeachers;
                return User.findByPk(UserId);

            })
            .then((user) => {
                res.render('studentCard', { userTeachers, user, formatDate });
            })
            .catch(err => {
                // console.log(err);
                res.send(err);
            });
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }

    static findTeachers(req, res) {
        // console.log(req.query);
        // let userId = +req.query.user;

        let option = {};
        let { field, sort } = req.query;
        let { user } = req.session;
        // console.log(sort);
        if (field) {
            option.where = {
                field: field
            };
        }

        if (sort === 'fee') {
            option.order = [['fee', 'ASC']];
        }

        if (sort === 'experience') {
            option.order = [['yearOfExperience', 'DESC']];
        }


        Teacher.findAll(option)
            .then(teachers => {
                // console.log(teachers);
                res.render('findTeachers', { teachers, formatRupiah, user, field, sort });
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }

    static getHireTeacher(req, res) {
        let teacherId = +req.params.teacherId;
        console.log(teacherId);
        let userId = +req.session.userId;

        Teacher.findByPk(teacherId)
            .then(teacher => {
                res.render('hireTeacher', { teacher, userId });
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }

    static postHireTeacher(req, res) {
        // console.log(req.body);
        ;
        let UserId = +req.session.userId;
        let TeacherId = +req.params.teacherId;
        let date = req.body.date;

        UserTeacher.create({ date, TeacherId, UserId })
            .then(() => {
                res.redirect(`/studentCard/`);
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message);
                }
                // console.log(err);
                res.send(err);
            });
    }

    static teacherCard(req, res) {
        let teacherId = +req.session.teacherId;
        // let teacherId = 1;
        let userTeachers;

        UserTeacher.findAll({
            include: User,
            where: {
                TeacherId: teacherId
            },
            order: [['id', 'ASC']]
        })
            .then(UserTeachers => {
                userTeachers = UserTeachers;
                return Teacher.findByPk(teacherId);
            })
            .then((teacher) => {
                // console.log(userTeachers);
                res.render('teacherCard', { userTeachers, teacher, formatDate });
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }

    static approve(req, res) {
        let id = +req.params.id;

        UserTeacher.findByPk(id)
            .then(data => {
                return data.update({
                    status: 'approved'
                }, {
                    where: {
                        id
                    }
                });
            })
            .then(() => {
                res.redirect(`/teacherCard`);
            });

    }

    static reject(req, res) {
        let id = +req.params.id;
        UserTeacher.findByPk(id)
            .then(data => {
                return data.update({
                    status: 'rejected'
                }, {
                    where: {
                        id
                    }
                });
            })
            .then(() => {
                res.redirect(`/teacherCard/`);
            });
    }


}

module.exports = Controller;