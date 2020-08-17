// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager {
  constructor(role, name, id, email, officeNumber) {
    this.role = role;
    this.name = name;
    this.id = id;
    this.email = email;
    this.officeNumber = officeNumber;
  }

  getName() {
    console.log("this is name: ", this.name);
    return this.name;
  }

  getRole() {
    console.log("this is role: ", this.role);
    return this.role;
  }

  getEmail() {
    console.log("this is email: ", this.email);
    return this.email;
  }

  getId() {
    console.log("this is id: ", this.id);
    return this.id;
  }

  getOfficeNumber() {
    console.log("this is office number: ", this.officeNumber);
    return this.officeNumber;
  }
}

module.exports = Manager;

