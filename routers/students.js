module.exports = app => {
    const StudentController = app.controllers.student;
    const Auth = app.middlewares.auth;
    
    app.post('/students', StudentController.create);
    app.post('/students/login', StudentController.login);
    app.get('/students',Auth.authorization , StudentController.findAll);
    app.get('/students/:id',Auth.authorization , StudentController.findById);
    app.put('/students/:id',Auth.authorization , StudentController.update);
    app.delete('/students/:id',Auth.authorization , StudentController.delete);
}