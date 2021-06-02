const Room = require('../../model/sequelize/Room');
const Meeting = require('../../model/sequelize/Meeting');

exports.getRooms = () => {
    return Room.findAll();
};

exports.createRoom = (newRoomData) => {
    return Room.create({
        Room: newRoomData.Room
    });
};

exports.deleteRoom = (roomId) => {
    return Room.destroy({
        where: { IdRoom: roomId }
    });
};

exports.updateRoom = (roomId, data) => {
    const room = data.Room;
    return Room.update(data, { where: { IdRoom: roomId } });
}
// do poprawy
exports.getRoomById = (roomId) => {
    return Room.findByPk(roomId,
        {
            include: [{
                model: Meeting,
                as: 'roomMeetings'
            }]
        });
};

