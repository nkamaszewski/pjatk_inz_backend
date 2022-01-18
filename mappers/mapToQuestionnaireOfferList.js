exports.mapToQuestionnaireOfferList = (qoDTO) => {
  return qoDTO.map((qo) => {
    const { dataValues } = qo;

    const mappedQo = {
      ...dataValues,
      person: {
        FirstName:
          dataValues.questionnaireOfferEmployee.employeePerson.FirstName,
        LastName: dataValues.questionnaireOfferEmployee.employeePerson.LastName,
      },
    };

    delete mappedQo.questionnaireOfferEmployee;

    return mappedQo;
  });
};
