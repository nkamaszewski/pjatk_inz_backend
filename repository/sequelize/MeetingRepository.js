const Room = require('../../model/sequelize/Room');
const Meeting = require('../../model/sequelize/Meeting');
// do poprawy
exports.getMeetings = () => {
    return Meeting.findAll({
        attributes: ['IdMeeting', 'Meeting', 'IdRoom'],
        include: [{
            model: Room,
            as: 'meetingsRoom'
        }]
    });
};

exports.createMeeting = (newMeetingData) => {
    return Meeting.create({
        Meeting: newMeetingData.Meeting,
        IdRoom: newMeetingData.IdRoom
    });
};

exports.deleteMeeting = (meetingId) => {
    return Meeting.destroy({
        where: { IdMeeting: meetingId }
    });
};

exports.updateMeeting = (meetingId, data) => {
    const meeting = data.Meeting;
    const idRoom = data.IdRoom;
    return Meeting.update(data, { where: { IdMeeting: meetingId } });
}

exports.getMeetingById = (topId) => {
    return Meeting.findByPk(topId);
};

