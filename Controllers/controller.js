const { Teacher, User, UserTeacher } = require('../models');
const formatDate = require('../helpers/formatDate');
const formatRupiah = require('../helpers/formatRupiah');

class Controller {


    static studentCard(req, res) {
        let userId = +req.params.userId;

        User.findByPk(userId, {
            include: Teacher
        })
            .then(user => {
                // console.log(user.Teachers);
                console.log(user.Teachers[0].UserTeacher); //array
                // console.log(user.Teachers.UserTeacher); //undefined
                // user.Teachers.forEach(el => {
                // console.log(el.UserTeacher);
                // });
                res.render('studentCard', { user, formatDate });
            })
            .catch(err => {
                // console.log(err);
                res.send(err);
            });
    }

    static findTeachers(req, res) {
        // console.log(req.query);
        // let userId = +req.query.user;

        let option = {};
        let { userId, field, sort } = req.query;
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
                res.render('findTeachers', { teachers, formatRupiah, userId, field, sort });
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }

    static getHireTeacher(req, res) {
        let teacherId = +req.params.teacherId;
        let userId = req.query.userId;

        Teacher.findByPk(teacherId)
            .then(teacher => {
                res.render('hireTeacher', { teacher, userId });
            })
            .catch(err => {
                res.send(err);
            });
    }

    static postHireTeacher(req, res) {
        // console.log(req.body);
        ;
        let UserId = +req.query.userId;
        let TeacherId = +req.params.teacherId;
        let date = req.body.date;

        UserTeacher.create({ date, TeacherId, UserId })
            .then(() => {
                res.redirect(`/studentCard/${UserId}`);
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
        let teacherId = +req.params.teacherId;

        Teacher.findByPk(teacherId, {
            include: User
        })
            .then(teacher => {
                // console.log(teacher.Users[1].UserTeacher);
                // console.log(teacher.Users[0].UserTeacher.dataValues);
                res.render('teacherCard', { teacher, formatDate });
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
            .then((data2) => {
                // console.log(data2);
                let teacherId = data2.TeacherId;
                res.redirect(`/teacherCard/${teacherId}`);
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
            .then((data2) => {
                // console.log(data2);
                let teacherId = data2.TeacherId;
                res.redirect(`/teacherCard/${teacherId}`);
            });
    }


}

module.exports = Controller;