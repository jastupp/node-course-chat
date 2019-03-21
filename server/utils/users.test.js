const assert = require('expect');
const { Users } = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [ {id: 'id1', name: 'name1', room: 'room1'},
                        {id: 'id2', name: 'name2', room: 'room2'},
                        {id: 'id3', name: 'name3', room: 'room3'},
                        {id: 'id4', name: 'name4', room: 'room1'},
                        {id: 'id5', name: 'name5', room: 'room2'} ];
    });

    it('Sould create a new User', () => {
        const users = new Users();
        const user = { id: 'user_id', name: 'user_name', room: 'user_room'};

        users.add(user.id, user.name, user.room);

        assert(users.users.length).toBe(1);
        assert(users.users[0].id).toBe(user.id);
        assert(users.users[0].name).toBe(user.name);
        assert(users.users[0].room).toBe(user.room);
    });

    it('Should return users for the room', () => {
        // get the user names for room1
        const names1 = users.getAll('room1');
        const names2 = users.getAll('room2');
        const names3 = users.getAll('room3');

        assert(names1).toEqual(['name1', 'name4']);
        assert(names2).toEqual(['name2', 'name5']);
        assert(names3).toEqual(['name3']);
    });

    it('Should get a user from the array', () => {
        const user = users.get('id1');
        assert(user).toEqual(users.users[0]);
    });

    it('Should not get a user from the array', () => {
        const user = users.get('qqq');
        assert(user).toEqual(undefined);
    });

    it('Should remove a user from the array', () => {
        const user = users.remove('id1');
        const names = users.getAll('room1');

        assert(user).toEqual({id: 'id1', name: 'name1', room: 'room1'});
        assert(users.users.length).toBe(4);
        assert(names).toEqual(['name4']);
    });

    it('Should not remove a user from the array', () => {
        const user = users.remove('qqq');

        assert(user).toEqual(undefined);
        assert(users.users.length).toBe(5);
    });

});


