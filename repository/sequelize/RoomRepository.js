const Room = require('../../model/sequelize/Room');
const Meeting = require('../../model/sequelize/Meeting');

exports.getRooms = () => {
    return Room.findAll();
};

exports.createRoom = (newRoomData) => {
    return Room.create({
        Name: newRoomData.Name,
        Area: newRoomData.Area,
        CapacitySet1: newRoomData.CapacitySet1,
        CapacitySet2: newRoomData.CapacitySet2,
        CapacitySet3: newRoomData.CapacitySet3,
        CapacitySet4: newRoomData.CapacitySet4,

    });
};

exports.deleteRoom = (roomId) => {
    return Room.destroy({
        where: { IdRoom: roomId }
    });
};

exports.updateRoom = (roomId, data) => {
    const name = data.Room;
    const area = data.Area;
    const capacitySet1 = data.CapacitySet1;
    const capacitySet2 = data.CapacitySet2;
    const capacitySet3 = data.CapacitySet3;
    const capacitySet4 = data.CapacitySet4;
    return Room.update(data, { where: { IdRoom: roomId } });
}
// do poprawy
exports.getRoomById = (roomId) => {
    return Room.findByPk(roomId,
        {
            include: [{
                model: Meeting,
                as: 'roomMeeting'
            }]
        });
};

