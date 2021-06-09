const Room = require('../../model/sequelize/Room');
const Meeting = require('../../model/sequelize/Meeting');
// do poprawy
exports.getMeetings = () => {
    return Meeting.findAll();
    // return Meeting.findAll({
    //     attributes: ['IdMeeting', 'Meeting', 'IdRoom'],
    //     include: [{
    //         model: Room,
    //         as: 'meetingsRoom'
    //     }]
    // });
};

exports.createMeeting = (newMeetingData) => {
    return Meeting.create({
        From: newMeetingData.From,
        To: newMeetingData.To,
        IdRoom: newMeetingData.IdRoom,
        IdGroup: newMeetingData.IdGroup
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
    const idGroup = data.IdGroup;
    const from = data.From;
    const to = data.To;
    return Meeting.update(data, { where: { IdMeeting: meetingId } });
}

exports.getMeetingById = (meetId) => {
    return Meeting.findByPk(meetId);
};

