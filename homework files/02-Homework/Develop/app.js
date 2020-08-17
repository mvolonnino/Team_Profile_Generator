const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer");
const fs = require("fs");
const path = require("path");

var teamMembers = [];
var output_dir = path.resolve(__dirname, "output");
var output_path = path.join(output_dir, "index.html"); //fs.writeFile

function startTeamBuild() {
  console.log("Please build your team: ");
  inquirer
    .prompt([
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
    ])
    .then(function (managerAnswers) {
      console.log("managerAnswers: ", managerAnswers);
      const { name, id, email, officeNumber } = managerAnswers;
      const manager = new Manager(name, id, email, officeNumber);
      console.log("Manager: ", manager);
      teamMembers.push(manager);
      console.log("teamMembers: ", teamMembers);
      addTeamMember();
    });
}
startTeamBuild();

function addTeamMember() {
  inquirer
    .prompt([
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
    ])
    .then(function (nextTeamMember) {
      switch (nextTeamMember.teamMember) {
        case "Intern":
          addIntern(); //create function to prompt intern questions
          break;
        case "Engineer":
          addEngineer(); //create function to prompt engineer questions
          break;
        default:
          buildTeam();
      }
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your intern's email?",
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
        message: "What school did your intern attend?",
        name: "school",
      },
    ])
    .then(function (internAnswers) {
      console.log("internAnswers :", internAnswers);
      const { name, id, email, school } = internAnswers;
      const intern = new Intern(name, id, email, school);
      console.log("Intern: ", intern);
      teamMembers.push(intern);
      console.log("teamMembers: ", teamMembers);
      addTeamMember();
    });
}

// build team() if there is no output dir then create one or if there is one then write it to the output dir .. that shows html of the answers to the prompts. if there is already an output dir then DONT add a new one
