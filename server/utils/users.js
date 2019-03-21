
class Users {

    constructor() {
        this.users = [];
    }

    add(id, name, room) {
        const user = { id: id, name: name, room: room };
        this.users.push(user);
        return user;
    }

    remove(id) {
        const user = this.get(id);
        const index = this.users.indexOf(user);
        this.users.splice( index, (index === -1) ? 0 : 1 );
        return user;
    }

    get(id) {
        return this.users.find((next) => next.id === id );
    }

    getAll(room) {
        const users = this.users.filter((next) => next.room === room );
        return users.map((user) => user.name );
    }
}

module.exports = {
  Users: Users
};