const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Study = sequelize.define(
  'Study',
  {
    IdEducation: {
      type: Sequelize.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    },
    FieldOfStudy: { type: Sequelize.STRING, allowNull: false },
    IdUniversity: { type: Sequelize.INTEGER, allowNull: false },
    IdStudyMode: { type: Sequelize.INTEGER, allowNull: false },
    IdGraduateDegree: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'Study',
  }
);
module.exports = Study;
