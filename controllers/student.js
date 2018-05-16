module.exports = (app) => {
    const StudentModel = app.models.student;
    const JWTManager = app.utils.jwt;
    return {
        create: (req, res) => {
            const student = new StudentModel(req.body);
            student.save()
            .then(() => {
                res.json({
                    status: 'success',
                    data: 'Student successfully registered'
                });
            }).catch(error => {
                 res.json({
                    status: 'error',
                    data: 'Unexpected error',
                    error: error.message
                });
            });
        },
        findAll: (req, res) => {
            StudentModel.find(req.query)
            .then((result) => {
                res.json({
                    status: 'success',
                    data: result
                });
            }).catch(error => {
                res.json({
                    status: 'error',
                    data: 'Unexpected error',
                    error: error.message
                });
            });
        },
        findById: (req, res) => {

            const { id } = req.params;

            StudentModel.findById(id)
            .then((result) => {
                res.json({
                    status: 'success',
                    data: result
                });
            }).catch(error => {
                res.json({
                    status: 'error',
                    data: 'Student not found'
                });
            });
        },
        update: (req, res) => {
            const { id } = req.params;
            const { name, age, email, password } = req.body;

            StudentModel.updateOne({
                _id: id
            }, {
                name,
                age,
                email,
                password
            }).then((result) => {
                if (result.nModified > 0) {
                    res.json({
                        status: 'success',
                        data: 'Student successfully updated'
                    });
                } else {
                    res.json({
                        status: 'error',
                        data: 'Error updating student'
                    });
                }
            }).catch(error => {
                res.json({
                    status: 'error',
                    data: 'Unexpected error',
                    error: error.message
                });
            });
        },
        delete: (req, res) => {
            const { id } = req.params;

            StudentModel.remove({
                _id: id
            }).then((result) => {
                if (result.n > 0) {
                    res.json({
                        status: 'success',
                        data: 'Student successfully removed'
                    });
                } else {
                    res.json({
                        status: 'error',
                        data: 'Error removed student'
                    });
                }
            }).catch(error => {
                res.json({
                    status: 'error',
                    data: 'Unexpected error',
                    error: error.message
                });
            });
        },
        login: (req, res) => {
            const { email, password } = req.body;
            StudentModel.findOne({
                email
            }).then((result) => {
                if (result.password === password) {
                    const payload = {id: result._id, name: result.name, accessLvl: result.accessLvl};
                    const studentToken = JWTManager.generateAuthToken(payload);
                    return res.json({token: studentToken});
                } else {
                    res.json({
                        status: 'error',
                        data: 'Authentication failed. Invalid credentials'
                    });
                }
            }).catch(error => {
                console.log(error);
                res.json({
                    status: 'error',
                    data: 'Student not found'
                });
            });
        }
    };
}