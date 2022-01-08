exports.mapToEmploymentList = (employmentDTO) => {
	return employmentDTO.map((employment) => {
		const { dataValues } = employment;
		const dep = employment.employmentsDepartment
			? employment.employmentsDepartment
			: { name: '-' };
		const mappedEmployment = {
			...dataValues,
			FirstName: dataValues.employmentEmployee.employeePerson.FirstName,
			LastName: dataValues.employmentEmployee.employeePerson.LastName,
			// Department: dataValues.employmentsDepartment,
			Department: dep,
			// Division: dataValues.employmentsDepartment.departmentsDivision,
			Division: dataValues.employmentsDivision,
			Position: dataValues.emplymentPosition,
		};

		delete mappedEmployment.employmentEmployee;
		delete mappedEmployment.employmentsDepartment;
		delete mappedEmployment.employmentsDivision;
		delete mappedEmployment.emplymentPosition;

		return mappedEmployment;
	});
};
