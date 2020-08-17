const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer");

function promptUser() {
  return inquirer.prompt([
    {
      message: "Please build your team: ",
      name: "title",
    },
    {
      type: "list",
      message: "Which type of team member would you like to add?",
      choices: [
        "Manager",
        "Engineer",
        "Intern",
        "I dont want to add anymore team members",
      ],
      name: "role",
    },
  ]);
}

function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your manager's name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is your manager's id?",
      name: "id",
    },
    {
      type: "input",
      message: "What is your manager's email?",
      name: "email",
      default: () => {},
      validate: function (email) {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (valid) {
          return true;
        } else {
          console.log(". Please enter a valid email");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "What is your manager's office number?",
      name: "officeNumber",
    },
    {
      type: "list",
      message: "Which type of team member would you like to add?",
      choices: [
        "Intern",
        "Engineer",
        "I dont want to add anymore team members",
      ],
      name: "teamMember",
    },
  ]);
}
promptUser().then(function (userAnswers) {
  console.log("userAnswers: ", userAnswers);
  const { role } = userAnswers;
  if (role === "Manager") {
    promptManager().then(function (managerAnswers) {
      console.log("managerAnswers: ", managerAnswers);
      const { name, id, email, officeNumber } = managerAnswers;
      const manager = new Manager(role, name, id, email, officeNumber);
      console.log("Manager: ", manager);
      render([manager]);
    });
  }
});
