exports.mapToGroupList = (groupDTO) => {
  return groupDTO.map((group) => {
    const { dataValues } = group;

    const mappedGroup = {
      ...dataValues,
      Topic: dataValues.groupTraining.trainingTopic.Topic,
      Subject: dataValues.groupTraining.trainingTopic.topicsSubject.Subject,
    };

    mappedGroup.groupTraining.trainingTopic = null;

    return mappedGroup;
  });
};
