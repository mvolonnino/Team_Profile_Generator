const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer");

const fs = require("fs");
const path = require("path");
const util = require("util");
const { error } = require("console");
const writeFileAsync = util.promisify(fs.writeFile);
// create arr to store each team member that user creates
var teamMembers = [];
// create output folder to hold the html file we create
var output_dir = path.resolve(__dirname, "output");
// create the path for the html file in the output folder
var output_path = path.join(output_dir, "team.html"); //fs.writeFile

const createDir = (output_dir) => {
  fs.mkdirSync(output_dir, { recursive: true }, (error) => {
    if (error) {
      console.log("error: ", error);
    } else {
      console.log("directory has been made!");
    }
  });
};

function buildTeam() {
  console.log("teamMembers: ", teamMembers);
  createDir(output_dir);
  const team = render(teamMembers);
  return writeFileAsync(output_path, team)
    .then(function () {
      console.log("Successfully created team.html!");
    })
    .catch(function (error) {
      console.log(error);
    });
}

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
            console.log(". Please delete and enter a valid email");
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
          buildTeam(); //create function to take teamMember array and output to html file
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

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your engineer's email?",
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
        message: "What is your engineer's GitHub username?",
        name: "github",
      },
    ])
    .then(function (engineerAnswers) {
      console.log("engineerAnswers: ", engineerAnswers);
      const { name, id, email, github } = engineerAnswers;
      const engineer = new Engineer(name, id, email, github);
      console.log("engineer: ", engineer);
      teamMembers.push(engineer);
      console.log("teamMembers: ", teamMembers);
      addTeamMember();
    });
}
