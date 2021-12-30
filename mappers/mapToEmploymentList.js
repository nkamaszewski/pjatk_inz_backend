exports.mapToEmploymentList = (employmentDTO) => {
  return employmentDTO.map((employment) => {
    const { dataValues } = employment;

    const mappedEmployment = {
      ...dataValues,
      FirstName: dataValues.employmentEmployee.employeePerson.FirstName,
      LastName: dataValues.employmentEmployee.employeePerson.LastName,
      Department: dataValues.employmentsDepartment,
      Division: dataValues.employmentsDepartment.departmentsDivision,
      Position: dataValues.emplymentPosition,
    };

    delete mappedEmployment.employmentEmployee;
    delete mappedEmployment.employmentsDepartment;
    delete mappedEmployment.Department.departmentsDivision;
    delete mappedEmployment.emplymentPosition;

    return mappedEmployment;
  });
};
