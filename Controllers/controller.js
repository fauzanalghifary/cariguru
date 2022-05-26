const { Teacher, User, UserTeacher, UserDetail } = require('../models');
const formatDate = require('../helpers/formatDate');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

class Controller {


    static register(req, res) {
        res.render('register');
    }

    static registerStudent(req, res) {
        res.render('registerStudent');
    }

    static insertStudent(req, res) {
        User.create({
            username: req.body.user,
            password: req.body.pass,
            role: 'student',
            createdAt: new Date(),
            updatedAt: new Date,
            status: 'inactive'
        })
            .then(newUser => {
                return UserDetail.create({
                    email: req.body.email,
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    UserId: newUser.id
                });
            })
            .then((userDetails) => {
                // console.log(userDetails.UserId);
                return User.findByPk(userDetails.UserId, {
                    include: UserDetail
                });
            })
            .then((user) => {
                // console.log(user);
                let rand = Math.floor((Math.random() * 999999) + 54);
                // console.log(rand);

                let identifier = user.id + '-' + rand;
                let email = user.UserDetail.email;
                // console.log(identifier);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'pojandummy@gmail.com',
                        pass: 'pojan123'
                    }
                });

                var mailOptions = {
                    from: 'pojandummy@gmail.com',
                    to: `${email}`,
                    subject: 'Sending Email using Node.js',
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
                console.log(err);
                res.send(err);
            });
    }

    static registerTeacher(req, res) {
        res.render('registerTeacher');
    }

    static insertTeacher(req, res) {

        let theNewUser;

        User.create({
            username: req.body.user,
            password: req.body.pass,
            role: 'teacher',
            createdAt: new Date(),
            updatedAt: new Date,
            status: 'inactive'
        })
            .then(newUser => {
                theNewUser = newUser;
                return UserDetail.create({
                    email: req.body.email,
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
                return User.findByPk(teacher.UserId, {
                    include: UserDetail
                });
            })
            .then((user) => {
                // console.log(user);
                let rand = Math.floor((Math.random() * 999999) + 54);
                // console.log(rand);

                let identifier = user.id + '-' + rand;
                let email = user.UserDetail.email;
                // console.log(identifier);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'pojandummy@gmail.com',
                        pass: 'pojan123'
                    }
                });

                var mailOptions = {
                    from: 'pojandummy@gmail.com',
                    to: `${email}`,
                    subject: 'Sending Email using Node.js',
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
                if (err.name === 'SequelizeValidationError') {
                    err = err.errors.map(el => el.message);
                }
                res.send(err);
            });
    }


    static verify(req, res) {
        const identifier = req.params.identifier;
        let id = +identifier.split('-')[0];


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
                                    // console.log(teacher);
                                    req.session.teacherId = teacher.id;
                                    res.redirect(`/teacherCard`);
                                })
                                .catch(err => {
                                    res.send(err);
                                });
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