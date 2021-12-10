exports.mapToMeetingList = (meetingDTO) => {
  return meetingDTO.map((meeting) => {
    const { dataValues } = meeting;
    const mappedGroup = {
      ...dataValues,
      Topic: dataValues.meetingGroup.groupTraining.trainingTopic.Topic,
    };

    mappedGroup.meetingGroup.groupTraining.trainingTopic = null;

    return mappedGroup;
  });
};
