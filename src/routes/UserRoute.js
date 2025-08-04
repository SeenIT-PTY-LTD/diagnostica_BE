const UserRouter = require('express').Router();
const UserController = require('../controller/UserController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/UserValidations')

// registor user
UserRouter.post('/registration', validate(Validations.RegistrationValidation), UserController.CreateEntery);

// login
UserRouter.post('/login',validate(Validations.Login), UserController.Login);

// doctor forgot  password
UserRouter.post('/forgot-password',validate(Validations.DoctorForgotPasswordByEmail), UserController.ForgotPasswordWithEmail);

// doctor reset password
UserRouter.put('/reset-password',validate(Validations.ResetPassword), UserController.ResetPassword);

// verify email
UserRouter.post('/check-exist',validate(Validations.VerifyPhone), UserController.Varify);

// verify email
UserRouter.get('/get-dashboard-counts', UserController.GetUserDashboardCounts)

UserRouter.get('/auth/info',  UserController.GetAuthInfo)
// update user by id
UserRouter.put('/:id',validate(Validations.Update), UserController.UpdateEntery);

// delete user by id
UserRouter.delete('/:id',validate(Validations.idParamsModel), UserController.DeleteEntery);

// get single user
UserRouter.get('/:id',validate(Validations.idParamsModel), UserController.GetSingleEntery);

// get all user
UserRouter.get('/',validate(Validations.GetAllEnteries), UserController.GetAllEnteries);



module.exports = UserRouter;