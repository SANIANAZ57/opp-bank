#! /usr/bin/env node

import inquirer from "inquirer"


//Bank account interface 
interface BankAccount {
    accountNumber :number;
    balance :number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkbalance(): void
}
//Bank acoount class
 class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance:number){
        this.accountNumber = accountNumber;
        this.balance =balance
    }
// Debit money

withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log (`withdrawal of $${amount} successful. Remaining balance ${this.balance}`)              

    }else{
        console.log("Insufficient balance");
        
    }
}
// credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // 1$ fee charged
    }this.balance += amount;
    console.log(`Depoite of $${amount} successful. Remaining balance :$${this.balance}`);
}

// check balance 

checkbalance(): void {
    console.log(`Current balnce :$${this.balance}`);
}
}

// Customer class
class Customer{
    firstName:string;
    lestName:string;
    gender:string;
    age:number;
    moblieNumber:number;
    account: BankAccount;

    constructor(firstName:string,lestName:string, gender:string, age:number,  moblieNumber:number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lestName = lestName;
        this.gender = gender;
        this.age = age;
        this.moblieNumber =moblieNumber;
        this.account =account
    }    
}
//Create bank accounts

const account :BankAccount[]=[
    new BankAccount (10001, 5000),
    new BankAccount (10002,2000),
    new BankAccount (10003,4000)
];

//create customers
const customers:Customer[]=[
    new Customer ("Sania","Naz","Female",22,33451585913,account[0]),
    new Customer ("amyma","jak","Female",25,31567897648,account[1]),
    new Customer ("Amir","Ali","Male",26,34157997536678,account[2])
]

//funtion to interact with bank acoonut

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your account number:"
        })
        const Customer =customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(Customer){
            console.log(`Welcome, ${Customer.firstName} ${Customer.lestName}!\n`);
            const ans =await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"select an operation",
                choices:["Desposit","Withdraw","Check Balance","Exit"]
            }]);

            switch(ans.select){
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:" Enter tha amount to deposit:"
                    })
                    Customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                         const withDralAmount = await inquirer.prompt({
                            name:"amount",
                            type:"number",
                            message:"Enter tha amount to withdraw:"
                         })
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
            
        }else{
            console.log("Invalide acoount number.please try again.");
            
        }
    } while(true)
}

service()