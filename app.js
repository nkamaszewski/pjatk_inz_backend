require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { verifyJWT } = require('./auth/verifyJWT');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const passwordRouter = require('./routes/password');
const divApiRouter = require('./routes/api/DivisionAPIRoute');
const depApiRouter = require('./routes/api/DepartmentAPIRoute');
const posApiRouter = require('./routes/api/PositionAPIRoute');
const empApiRouter = require('./routes/api/EmploymentAPIRoute');
const subApiRouter = require('./routes/api/SubjectAPIRoute');
const topApiRouter = require('./routes/api/TopicAPIRoute');
const partiApiRouter = require('./routes/api/ParticipationAPIRoute');
const questApiRouter = require('./routes/api/QuestionnaireAPIRoute');
const questisApiRouter = require('./routes/api/QuestionnaireIssueAPIRoute');
const issueApiRouter = require('./routes/api/IssueAPIRoute');
const roomApiRouter = require('./routes/api/RoomAPIRoute');
const meetApiRouter = require('./routes/api/MeetingAPIRoute');
const univApiRouter = require('./routes/api/UniversityAPIRoute');
const studApiRouter = require('./routes/api/StudyAPIRoute');
const comApiRouter = require('./routes/api/CompanyAPIRoute');
const trnApiRouter = require('./routes/api/TrainingAPIRoute');
const perApiRouter = require('./routes/api/PersonAPIRoute');
const emplApiRouter = require('./routes/api/EmployeeAPIRoute');
const coachApiRouter = require('./routes/api/CoachAPIRoute');
const empGroupApiRouter = require('./routes/api/EmployeeGroupAPIRoute');
const groupApiRouter = require('./routes/api/GroupAPIRoute');
const eduApiRouter = require('./routes/api/EducationAPIRoute');
const gradDegApiRouter = require('./routes/api/GraduateDegreeAPIRoute');
const studModApiRouter = require('./routes/api/StudyModeAPIRoute');
const appForReasonsApiRouter = require('./routes/api/ApplicationForReasonsAPIRoute');
const appForRefundApiRouter = require('./routes/api/ApplicationForRefundAPIRoute');
const reasForRefundApiRouter = require('./routes/api/ReasonForRefundAPIRoute');
const statusApiRouter = require('./routes/api/StatusAPIRoute');
const offApiRouter = require('./routes/api/OfferAPIRoute');
const questOffApiRouter = require('./routes/api/QuestionnaireOfferAPIRoute');
const appForApiRouter = require('./routes/api/ApplicationForAPIRoute');
const roleApiRouter = require('./routes/api/RoleAPIRoute');
const oEduApiRouter = require('./routes/api/OtherEducationAPIRoute');
const inviteUserRouter = require('./routes/api/InviteUser');

const sequelizeInit = require('./config/sequelize/init');

sequelizeInit().catch((err) => {
  console.log(err);
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/api/password', passwordRouter);

app.use(verifyJWT);

app.use('/users', usersRouter);
app.use('/api/inviteUser', inviteUserRouter);
app.use('/api/divisions', divApiRouter);
app.use('/api/departments', depApiRouter);
app.use('/api/positions', posApiRouter);
app.use('/api/employments', empApiRouter);
app.use('/api/subjects', subApiRouter);
app.use('/api/topics', topApiRouter);
app.use('/api/participations', partiApiRouter);
app.use('/api/questionnaires', questApiRouter);
app.use('/api/questionnaireissues', questisApiRouter);
app.use('/api/issues', issueApiRouter);
app.use('/api/rooms', roomApiRouter);
app.use('/api/meetings', meetApiRouter);
app.use('/api/universities', univApiRouter);
app.use('/api/studies', studApiRouter);
app.use('/api/companies', comApiRouter);
app.use('/api/trainings', trnApiRouter);
app.use('/api/persons', perApiRouter);
app.use('/api/employees', emplApiRouter);
app.use('/api/coaches', coachApiRouter);
app.use('/api/employeegroups', empGroupApiRouter);
app.use('/api/groups', groupApiRouter);
app.use('/api/education', eduApiRouter);
app.use('/api/graduatedegrees', gradDegApiRouter);
app.use('/api/studymodess', studModApiRouter);
app.use('/api/appforreasons', appForReasonsApiRouter);
app.use('/api/appforrefund', appForRefundApiRouter);
app.use('/api/reasforrefund', reasForRefundApiRouter);
app.use('/api/status', statusApiRouter);
app.use('/api/offer', offApiRouter);
app.use('/api/questoffer', questOffApiRouter);
app.use('/api/appfor', appForApiRouter);
app.use('/api/roles', roleApiRouter);
app.use('/api/othereducation', oEduApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
