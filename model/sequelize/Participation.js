const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Participation = sequelize.define(
  'Participation',
  {
    IdParticipation: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    IdPerson: { type: Sequelize.INTEGER, allowNull: false },
    IdEducation: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
      	isAccepted(value, next) {
      		const personId = this.IdPerson;
      		sequelize.models.ApplicationFor.findOne({
      			where: {
      				IdPerson: personId,
      				IdEducation: value,
      				IdStatus: 5
      			}
      		})
      			.then(applications => {
            if(!applications) {
                next(new Error(`Wniosek na to szkolenie nie zaakceptowany!`));
              }
              next()
            })
      			.catch((onError) => console.log(onError));
      	}
      }
    },
    DateOfRegistration: { type: Sequelize.DATE, allowNull: false },
    EndDate: { type: Sequelize.DATE, allowNull: true },
    CertificateOfCompletion: { type: Sequelize.STRING, allowNull: true },
  },
  {
    timestamps: false,
    tableName: 'Participation',
    indexes: [
      {
        name: 'idx_participation_idPerson_idEducation',
        unique: true,
        fields: ['IdPerson', 'IdEducation'],
     },
    ],
  }
);
module.exports = Participation;
