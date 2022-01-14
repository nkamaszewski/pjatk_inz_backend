exports.mapToQuestionnaireList = (questionnaireDTO) => {
  return questionnaireDTO.map((qDTO) => {
    const { dataValues } = qDTO;

    const mappedQuestionnaires = {
      ...dataValues,
      FirstName:
        dataValues.questionnairesParticipation.participationEmployee
          .employeePerson.FirstName,
      LastName:
        dataValues.questionnairesParticipation.participationEmployee
          .employeePerson.LastName,
    };

    if (
      dataValues.questionnairesParticipation.participationEducation
        .educationStudy
    ) {
      mappedQuestionnaires.Name =
        dataValues.questionnairesParticipation.participationEducation.educationStudy.FieldOfStudy;
    }
    if (
      dataValues.questionnairesParticipation.participationEducation
        .educationOtherEducation
    ) {
      mappedQuestionnaires.Name =
        dataValues.questionnairesParticipation.participationEducation.educationOtherEducation.Name;
    }
    if (
      dataValues.questionnairesParticipation.participationEducation
        .educationTraining
    ) {
      mappedQuestionnaires.Name =
        dataValues.questionnairesParticipation.participationEducation.educationTraining.trainingTopic.Topic;
    }

    mappedQuestionnaires.questionnairesParticipation = null;

    return mappedQuestionnaires;
  });
};
