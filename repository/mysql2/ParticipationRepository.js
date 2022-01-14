const { query } = require('../../config/mysql2/db');
const db = require('../../config/mysql2/db');

exports.getParticipationsWithoutQuest = (userId) => {
	const personId = userId;
	const sqlText = `
  SELECT p.IdParticipation, p.IdPerson, p.IdEducation, topic AS Name, q.IdQuestionnaire 
  FROM pjatk_inz_db.participation AS p INNER JOIN education AS e ON p.IdEducation=e.IdEducation
  INNER JOIN training AS t ON e.IdEducation=t.IdEducation
  INNER JOIN topic AS top ON t.IdTopic=top.IdTopic
  LEFT JOIN questionnaire AS Q ON p.IdParticipation=q.IdParticipation
  WHERE p.IdPerson=${personId} AND IdQuestionnaire IS NULL
  UNION
  SELECT p.IdParticipation, p.IdPerson, p.IdEducation, FieldOfStudy AS Name, q.IdQuestionnaire 
  FROM pjatk_inz_db.participation AS p INNER JOIN education AS e ON p.IdEducation=e.IdEducation
  INNER JOIN study  AS s ON e.IdEducation=s.IdEducation
  LEFT JOIN questionnaire AS Q ON p.IdParticipation=q.IdParticipation
  WHERE p.IdPerson=${personId} AND IdQuestionnaire IS NULL
  UNION
  SELECT p.IdParticipation, p.IdPerson, p.IdEducation, Name, q.IdQuestionnaire 
  FROM pjatk_inz_db.participation AS p INNER JOIN education AS e ON p.IdEducation=e.IdEducation
  INNER JOIN OtherEducation  AS o ON e.IdEducation=o.IdEducation
  LEFT JOIN questionnaire AS Q ON p.IdParticipation=q.IdParticipation
  WHERE p.IdPerson=${personId} AND IdQuestionnaire IS NULL
  `;
	return db
		.promise()
		.query(sqlText)
		.then((results) => {
			return results[0];
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};
