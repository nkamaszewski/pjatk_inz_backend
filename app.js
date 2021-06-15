var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const divApiRouter = require('./routes/api/DivisionApiRoute');
const depApiRouter = require('./routes/api/DepartmentApiRoute');
const posApiRouter = require('./routes/api/PositionApiRoute');
const empApiRouter = require('./routes/api/EmploymentApiRoute');
const subApiRouter = require('./routes/api/SubjectApiRoute');
const topApiRouter = require('./routes/api/TopicApiRoute');
const partiApiRouter = require('./routes/api/ParticipationApiRoute');
const questApiRouter = require('./routes/api/QuestionnaireApiRoute');
const questisApiRouter = require('./routes/api/QuestionnaireIssueApiRoute');
const issueApiRouter = require('./routes/api/IssueApiRoute');
const roomApiRouter = require('./routes/api/RoomApiRoute');
const meetApiRouter = require('./routes/api/MeetingApiRoute');
const univApiRouter = require('./routes/api/UniversityApiRoute');
const studApiRouter = require('./routes/api/StudyApiRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit().catch((err) => {
  console.log(err);
});

var app = express();

// view engine setup
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
app.use('/users', usersRouter);
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
app.use('/api/universitys', univApiRouter);
app.use('/api/studys', studApiRouter);

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
