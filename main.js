#! /usr/bin/env node
import inquirer from "inquirer";
//Bank acoount class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance ${this.balance}`);
        }
        else {
            console.log("Insufficient balance");
        }
    }
    // credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // 1$ fee charged
        }
        this.balance += amount;
        console.log(`Depoite of $${amount} successful. Remaining balance :$${this.balance}`);
    }
    // check balance 
    checkbalance() {
        console.log(`Current balnce :$${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lestName;
    gender;
    age;
    moblieNumber;
    account;
    constructor(firstName, lestName, gender, age, moblieNumber, account) {
        this.firstName = firstName;
        this.lestName = lestName;
        this.gender = gender;
        this.age = age;
        this.moblieNumber = moblieNumber;
        this.account = account;
    }
}
//Create bank accounts
const account = [
    new BankAccount(10001, 5000),
    new BankAccount(10002, 2000),
    new BankAccount(10003, 4000)
];
//create customers
const customers = [
    new Customer("Sania", "Naz", "Female", 22, 33451585913, account[0]),
    new Customer("amyma", "jak", "Female", 25, 31567897648, account[1]),
    new Customer("Amir", "Ali", "Male", 26, 34157997536678, account[2])
];
//funtion to interact with bank acoonut
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const Customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (Customer) {
            console.log(`Welcome, ${Customer.firstName} ${Customer.lestName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: " Enter tha amount to deposit:"
                    });
                    Customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withDralAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter tha amount to withdraw:"
                    });
                    Customer.account.withdraw(withDralAmount.amount);
                    break;
                case "Check Balance":
                    Customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for usung our bank service.Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalide acoount number.please try again.");
        }
    } while (true);
}
service();
