const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "..", "data", "users.json");

class User {
  static loadUsers() {
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
  }

  static saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  }

  static getAll() {
    return this.loadUsers();
  }

  static getById(id) {
    const users = this.loadUsers();
    return users.find((user) => user.id === id);
  }

  static getByUsername(username) {
    const users = this.loadUsers();

    return users.find((user) => user.username === username);
  }

  static create(newUser) {
    const users = this.loadUsers();
    newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static update(id, updatedData) {
    const users = this.loadUsers();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updatedData };
    this.saveUsers(users);
    return users[index];
  }

  static delete(id) {
    let users = this.loadUsers();
    const initialLength = users.length;
    users = users.filter((user) => user.id !== id);

    if (users.length === initialLength) return false;

    this.saveUsers(users);
    return true;
  }

  static validate(username, password) {
    const users = this.loadUsers();
    return users.find(
      (user) => user.username === username && user.password === password
    );
  }
}

module.exports = User;
