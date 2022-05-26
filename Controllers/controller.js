const { Teacher, User, UserTeacher, UserDetail } = require('../models');
const formatDate = require('../helpers/formatDate');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

class Controller {


    static landingPage(req, res) {
        res.render('landingPage');
    }

    static register(req, res) {
        res.render('register');
    }

    static registerStudent(req, res) {
        let error;
        // console.log(req.query);
        if (req.query.error) {
            error = req.query.error.split(',');
        }
        res.render('registerStudent', { error });
    }

    static insertStudent(req, res) {
        let theUser;
        User.create({
            username: req.body.user,
            password: req.body.pass,
            email: req.body.email,
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date,
            status: 'inactive'
        })
            .then(newUser => {
                theUser = newUser;
                return UserDetail.create({
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    UserId: newUser.id
                });
            })
            .then((user) => {
                // console.log(user);
                let rand = Math.floor((Math.random() * 999999) + 54);
                // console.log(rand);

                let identifier = theUser.id + '-' + rand;
                let email = theUser.email;
                // console.log(identifier);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'pojandummy@gmail.com',
                        pass: 'pojan123'
                    }
                });

                var mailOptions = {
                    from: 'admin@cariguru.com',
                    to: `${email}`,
                    subject: 'Verifikasi CariGuru',
                    html: `Press <a href=http://localhost:3000/verify/${identifier}>this link</a> to verify your email`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                // console.log(err);
                // res.send(err);
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message);
                }
                res.redirect(`/registerStudent?error=${err}`);
            });
    }

    static registerTeacher(req, res) {

        let error;
        console.log(req.query);
        if (req.query.error) {
            error = req.query.error.split(',');
        }
        res.render('registerTeacher', { error });
    }

    static insertTeacher(req, res) {

        let theNewUser;

        User.create({
            username: req.body.user,
            password: req.body.pass,
            role: 'teacher',
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date,
            status: 'inactive'
        })
            .then(newUser => {
                theNewUser = newUser;
                return UserDetail.create({
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    UserId: newUser.id,
                    createdAt: new Date(),
                    updatedAt: new Date,
                });
            })
            .then(() => {
                return Teacher.create({
                    fullName: req.body.fullName,
                    field: req.body.field,
                    yearOfExperience: req.body.yearOfExperience,
                    fee: req.body.fee,
                    UserId: theNewUser.id,
                    createdAt: new Date(),
                    updatedAt: new Date,
                });
            })
            .then((teacher) => {
                // console.log(teacher);
                return User.findByPk(teacher.UserId);
            })
            .then((user) => {
                // console.log(user);
                let rand = Math.floor((Math.random() * 999999) + 54);
                // console.log(rand);

                let identifier = user.id + '-' + rand;
                let email = user.email;
                // console.log(identifier);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'pojandummy@gmail.com',
                        pass: 'pojan123'
                    }
                });

                var mailOptions = {
                    from: 'admin@cariguru.com',
                    to: `${email}`,
                    subject: 'Verifikasi CariGuru',
                    html: `Press <a href=http://localhost:3000/verify/${identifier}>this link</a> to verify your email`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                // console.log(err);
                // res.send(err);
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message);
                }
                res.redirect(`/registerTeacher?error=${err}`);
            });
    }

    static cancelAppointment(req, res) {
        UserTeacher.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect('/studentCard');
            })
            .catch(err => {
                res.send(err);
            });
    }

    static verify(req, res) {
        const identifier = req.params.identifier;
        let id = +identifier.split('-')[0];

        // console.log(id);
        // console.log('HEREEEEEEEEE');

        User.update({
            status: 'active'
        }, {
            where: {
                id: +id
            }
        })
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                res.send(err);
            });

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
                        if (user.status === 'active') {
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
                        } else {
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

        let { field, sort } = req.query;
        let { user } = req.session;
        // console.log(sort);

        Teacher.getTeacherByField(field, sort)
            .then(teachers => {
                // console.log(teachers);
                res.render('findTeachers', { teachers, user, field, sort });
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

        let error = req.query.error;

        Teacher.findByPk(teacherId)
            .then(teacher => {
                res.render('hireTeacher', { teacher, userId, error });
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
                // res.send(err);
                res.redirect(`/hireTeacher/${TeacherId}?error=${err}`);
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