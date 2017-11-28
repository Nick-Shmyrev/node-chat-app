const expect = require('expect');
const {Users} = require('./users.js');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.usersArray = [
      {
        id: '1',
        name: 'Mike',
        room: 'Test room'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'Test room2'
      },
      {
        id: '3',
        name: 'John',
        room: 'Test room'
      }
    ];
  });



  it('should add new user', () => {
    var usersInstance = new Users();
    var seed = {
      id: '123',
      name: 'testUser',
      room: 'testRoom'
    };

    var resUser = usersInstance.addUser(seed.id, seed.name, seed.room);

    expect(usersInstance.usersArray).toEqual([seed]);

  });

  it('should return names for "Test room"', () => {
    var userList = users.getUserList('Test room');

    expect(userList).toEqual(['Mike','John']);
  });

  it('should return names for "Test room2"', () => {
    var userList = users.getUserList('Test room2');

    expect(userList).toEqual(['Jen']);
  });

  it('should remove user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.usersArray.length).toBe(2);
  });

  it('should not remove non-existing user', () => {
    var userId = 'invalid';
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.usersArray.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find non-existing user', () => {
    var userId = 'invalid';
    var user = users.getUser(userId);

    expect(user).toBeFalsy();
  });
});
