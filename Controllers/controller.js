const { Teacher, User, UserTeacher } = require('../models');

class Controller {
    static readTeachers(req, res) {
        Teacher.findAll()
            .then(teachers => {
                res.render('readTeachers', { teachers });
            })
            .catch(err => {
                res.send(err);
            });
    }

    static adminPage(req, res) {
        Teacher.findAll({
            include: User
        })
            .then(teachers => {
                // console.log(teachers);
                res.render('adminPage', { teachers });
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }
}

module.exports = Controller;