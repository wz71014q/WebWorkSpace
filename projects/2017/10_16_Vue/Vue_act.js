// JavaScript Document
function employee(name, job, born) {
	"use strict";
	this.name = name;
	this.job = job;
	this.born = born;
}

var bill = new employee("Bill Gates", "Engineer", 1985);

employee.prototype.salary = null;
bill.salary = 20000;

document.write(bill.salary);