

class Users {
  constructor () {
    this.usersArray = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.usersArray.push(user);
    return user;
  }

  getUser (id) {
    return this.usersArray.filter((user) => user.id === id)[0];
  }

  removeUser (id) {
    var user = this.getUser(id);
    
    if (user) {
      this.usersArray = this.usersArray.filter((user) => user.id !== id);
    }

    return user;
  }

  getUserList (room) {
    var users = this.usersArray.filter( (user) => user.room === room );
    var namesArray = users.map( (user) => user.name );

    return namesArray;
  }

}


module.exports = {Users};
