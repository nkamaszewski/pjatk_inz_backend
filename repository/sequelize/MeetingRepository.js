const Room = require('../../model/sequelize/Room');
const Meeting = require('../../model/sequelize/Meeting');
const Group = require('../../model/sequelize/Group');
const Training = require('../../model/sequelize/Training');
const Topic = require('../../model/sequelize/Topic');

exports.getMeetings = (query) => {
  const { idGroup, idRoom } = query;

  return Meeting.findAll({
    attributes: ['IdMeeting', 'From', 'To'],
    include: [
      {
        model: Group,
        as: 'meetingGroup',
        where: idGroup ? { IdGroup: idGroup } : {},
        include: {
          model: Training,
          as: 'groupTraining',
          include: {
            model: Topic,
            as: 'trainingTopic',
          },
        },
      },
      {
        model: Room,
        as: 'meetingRoom',
        where: idRoom ? { IdRoom: idRoom } : {},
      },
    ],
  });
};

exports.createMeeting = (newMeetingData) => {
  return Meeting.create({
    From: newMeetingData.From,
    To: newMeetingData.To,
    IdRoom: newMeetingData.IdRoom,
    IdGroup: newMeetingData.IdGroup,
  });
};

exports.deleteMeeting = (meetingId) => {
  return Meeting.destroy({
    where: { IdMeeting: meetingId },
  });
};

exports.updateMeeting = (meetingId, data) => {
  const meeting = data.Meeting;
  const idRoom = data.IdRoom;
  const idGroup = data.IdGroup;
  const from = data.From;
  const to = data.To;
  return Meeting.update(data, { where: { IdMeeting: meetingId } });
};

exports.getMeetingById = (meetId) => {
  return Meeting.findByPk(meetId);
};
