exports.mapToEmploymentList = (employmentDTO) => {
  return employmentDTO.map((employment) => {
    const { dataValues } = employment;

    const mappedEmployment = {
      ...dataValues,
      FirstName: dataValues.employmentEmployee.employeePerson.FirstName,
      LastName: dataValues.employmentEmployee.employeePerson.LastName,
      Department: dataValues.employmentsDepartment,
      Position: dataValues.emplymentPosition,
    };

    delete mappedEmployment.employmentEmployee;
    delete mappedEmployment.employmentsDepartment;
    delete mappedEmployment.emplymentPosition;

    return mappedEmployment;
  });
};
