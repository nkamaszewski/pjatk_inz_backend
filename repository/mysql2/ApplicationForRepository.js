const { query } = require('../../config/mysql2/db');
const db = require('../../config/mysql2/db');
const Role = require('../../model/Role');

exports.getApplicationFor = (params, ...userData) => {
	const { iddepartment, iddivision, idstatus } = params;
	const depId = iddepartment;
	const divId = iddivision;
	const statId = idstatus;
	const [userId, userIdDepartment, userIdDivision, userIdRole] = userData;

	const whereText = `(employment.dateTo is NULL OR employment.dateTo >= curdate())
            AND ${statId ? 'applicationfor.IdStatus = ' + statId : 1} 
            AND ${depId ? 'employment.IdDepartment = ' + depId : 1} 
            AND ${divId ? 'employment.IdDivision = ' + divId : 1}  
            AND ${
							userIdRole == Role.PRACOWNIK
								? 'employee.IdPerson = ' + userId
								: userIdRole == Role.KIEROWNIK
								? 'employment.IdDepartment = ' + userIdDepartment
								: userIdRole == Role.DYREKTOR
								? 'employment.IdDivision = ' + userIdDivision
								: 1
						} `;
	const sqlText = `
    SELECT IdApplicationFor, DateOfSubmission, Status, Nazwa, Rodzaj, FirstName, LastName, Compatibility FROM (
        SELECT IdApplicationFor, DateOfSubmission, status.name as Status, topic.topic as Nazwa, 'Kurs' as Rodzaj, FirstName, LastName, Compatibility 
        FROM applicationfor INNER JOIN status ON applicationfor.IdStatus=status.IdStatus INNER JOIN education ON applicationfor.IdEducation=education.IdEducation INNER JOIN training ON education.IdEducation=training.IdEducation INNER JOIN topic ON training.IdTopic=topic.IdTopic INNER JOIN employee ON applicationfor.IdPerson=employee.IdPerson INNER JOIN employment ON employee.IdPerson=employment.IdPerson LEFT JOIN department ON employment.IdDepartment=department.IdDepartment INNER JOIN person ON person.IdPerson=employee.IdPerson
        WHERE  ${whereText}    
        
        UNION
        SELECT IdApplicationFor, DateOfSubmission, status.name, study.FieldOfStudy as Nazwa, 'Studia' as Rodzaj, FirstName, LastName, Compatibility  
        FROM applicationfor INNER JOIN status ON applicationfor.IdStatus=status.IdStatus INNER JOIN education ON applicationfor.IdEducation=education.IdEducation INNER JOIN study ON education.IdEducation=study.IdEducation INNER JOIN employee ON applicationfor.IdPerson=employee.IdPerson INNER JOIN employment ON employee.IdPerson=employment.IdPerson LEFT JOIN department ON employment.IdDepartment=department.IdDepartment INNER JOIN person ON person.IdPerson=employee.IdPerson
        WHERE  ${whereText}

        UNION 
        SELECT IdApplicationFor, DateOfSubmission, status.name, otherEducation.Name as Nazwa, 'Inna edukacja' as Rodzaj, FirstName, LastName, Compatibility  
        FROM applicationfor INNER JOIN status ON applicationfor.IdStatus=status.IdStatus INNER JOIN education ON applicationfor.IdEducation=education.IdEducation INNER JOIN otherEducation ON education.IdEducation=otherEducation.IdEducation INNER JOIN employee ON applicationfor.IdPerson=employee.IdPerson INNER JOIN employment ON employee.IdPerson=employment.IdPerson LEFT JOIN department ON employment.IdDepartment=department.IdDepartment INNER JOIN person ON person.IdPerson=employee.IdPerson
        WHERE  ${whereText} 
        ) as Edu
        ORDER BY IdApplicationFor DESC;
        `;
	return db
		.promise()
		.query(sqlText)
		.then((results, fields) => {
			return results[0];
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};
