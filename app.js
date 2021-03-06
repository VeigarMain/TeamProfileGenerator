const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');


const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



const render = require('./lib/htmlRenderer');


const wholeTeam = [{
		type: 'input',
		message: 'Whats the team members name?',
		name: 'name'
	},

	{
		type: 'input',
		message: 'Whats the team members id?',
		name: 'id'
	},

	{
		type: 'input',
		message: 'Whats the team members email?',
		name: 'email'
	}
];

const manager = [{
	type: 'input',
	message: 'Whats your office number?',
	name: 'officeNum'
}];

const engineerQ = [{
	type: 'input',
	message: 'Whats the team members github name?',
	name: 'githubName'
}];

const intern = [{
	type: 'input',
	message: "Whats the intern's school name?",
	name: 'school'
}];

const role = [{
	type: 'list',
	message: 'What type of team member would you like to add?',
	name: 'teamMember',
	choices: ['Engineer', 'Intern', ' Dont want to add another employee!']
}];

let employees = [];
let person;

async function init() {
	console.log('Manager details:');
	const memberA = await inquirer.prompt(wholeTeam);
	const managerAs = await inquirer.prompt(manager);
	person = new Manager(memberA.name, memberA.id, memberA.email, managerAs.officeNum);
	employees.push(person);
	console.log(employees);
	otherMembers();
}
init();

async function otherMembers() {
	// console.log("we are here")
	const chooseMem = await inquirer.prompt(role);
	if (chooseMem.teamMember === 'Engineer') {
		const engineerA = await inquirer.prompt(engineerQ);
		const generalEngQs = await inquirer.prompt(wholeTeam);
		person = new Engineer(generalEngQs.name, generalEngQs.id, generalEngQs.email, engineerA.githubName);
		employees.push(person);
		otherMembers();
	} else if (chooseMem.teamMember === 'Intern') {
		const internA = await inquirer.prompt(intern);
		const generalInQs = await inquirer.prompt(wholeTeam);
		person = new Intern(generalInQs.name, generalInQs.id, generalInQs.email, internA.school);
		employees.push(person);
		console.log("hello")
		otherMembers();
	} else if (chooseMem.teamMember === "dont want to add another employee!") {
		fs.writeFile(outputPath, render(employees), function (err) {
			if (err) {
				return console.log(err);
			}
	
			console.log(" The file is saved!")
		})
		return;
	}
};