const Bank = require('./Bank')
const Account = require('./Account')
const Passbook = require('./Passbook')
const Invalid = require('./Invalid.js')
const Unauthorized = require('./Unauthorized.js')
const NotFound = require('./NotFound.js')

class User{
    static allCustomers = []
    static allBanks = []
    //static transactions = []
    
    static ID = 0
    constructor(fullName, isAdmin ){
        this.ID = User.ID++
        this.fullName = fullName
        this.isAdmin = isAdmin
        this.banks = []
        this.accounts = []
        this.transactions =[]
        
    }
    static newAdmin(fullName){
        try {
            if(typeof fullName != 'string'){
                throw new Invalid('Name must be a string.')
            }
            return new User(fullName, true)
        } catch (error) {
            return error
        }
    }
    newCustomer(fullName){
        try {
            if(!this.isAdmin){
                throw new Unauthorized('Not Admin')
            }
            let customerObj = new User(fullName, false)   
            User.allCustomers.push(customerObj)
            return customerObj
        } 
        catch (error) 
        {
           return error 
        }
    }
    getAllCustomers(){
        try {
            if(!this.isAdmin){
                throw ('Not admin')
            }
            return User.allCustomers
        } 
        catch (error) {
            return error
        }
    }
    static findCustomer(customerID){
       try {
        for (let index = 0; index < User.allCustomers.length; index++) {
            if(customerID == User.allCustomers[index].ID) {return index}
        }
        throw new NotFound("Customer not found")

       } catch (error) {
            throw error
       }
    }
    updateCustomers(customerID, newValue){
        try {
            if(typeof customerID != 'number'){throw new Invalid('ID must ne a number')}
            if(typeof newValue != 'string'){throw new Invalid('Name must ne a string')}
            if(!this.isAdmin){
                throw new Unauthorized('Not Admin')
            }
            let indexOfCustomer = User.findCustomer(customerID)
            User.allCustomers[indexOfCustomer].fullName = newValue
        } 
        catch (error) {
            return error
        }
    }
    deleteCustomer(customerID){
        try {
            if(!this.isAdmin){
               throw new Unauthorized('Not admin')
            }
            let indexOfCustomer = User.findCustomer(customerID)
            User.allCustomers.splice(indexOfCustomer,1)
        } 
        catch (error) {
            return error
        }
    }
    getNetWorth(){
            let indexOfCustomer = User.findCustomer(this.ID)
            let total = 0
            for (let index = 0; index < this.accounts.length; index++) {  
                total = total + User.allCustomers[indexOfCustomer].accounts[index].balance
            }
            return 'Net worth of User ' + this.ID + ' = ' + total
        }
    newBank(bankName){
        try{
            if(!this.isAdmin){
                throw new Unauthorized('Not admin')
            }
            let bankObj = new Bank(bankName)
            Bank.allBanks.push(bankObj)
            return Bank.allBanks
        }
        catch(error){
            return error
        }
    }
    getAllBanks(){
        try {
            if(!this.isAdmin){
                throw ('Not admin')
            }
            //console.log(this.banks)
            return Bank.allBanks
        } 
        catch (error) {
            return error
        }
    }
    findBank(bankID){
        try {
         for (let index = 0; index < Bank.allBanks.length; index++) {
             if(bankID == Bank.allBanks[index].ID) {return index}
         }
         throw new NotFound("Bank not found")
 
        } catch (error) {
             throw error
        }
     }

    //------------------------------------------------------------------------------------
      findBankName(bank){
        try {
         for (let index = 0; index < Bank.allBanks.length; index++) {
             if(bank == Bank.allBanks[index].bankName) {
                return true}
         }
         throw new NotFound("Bank not found :(")
 
        } catch (error) {
             throw error
        }
    }
    updateBank(bankID, newValue){
        try {
            if(!this.isAdmin){
                throw new Unauthorized('Not admin')
            }
            let indexOfBank = this.findBank(bankID)
            //let bank = new Bank()
            Bank.allBanks[indexOfBank].bankName = newValue
        } 
        catch (error) {
            return error.specMessage
        }
    }
    deleteBank(bankID){
        try {
            if(!this.isAdmin){
               throw new Unauthorized('Not admin')
            }
            let indexOfBank = this.findBank(bankID)
            Bank.allBanks.splice(indexOfBank,1)
        } 
        catch (error) {
            return error
        }
    }
    createAccount(bankID, accountName, balance){
        try {
            let indexOfBank = this.findBank(bankID)
            let account = new Account(indexOfBank, accountName, balance)
            this.accounts.push(account)
            Bank.allBanks[indexOfBank].accounts.push(account)
            //return this.accounts
        } 
        catch (error) {
            return error
        }
    }
    getAllaccounts(){
        return this.accounts
    }
    findAccount(accountID){
        try {
            for (let index = 0; index < this.accounts.length; index++) {
                if(accountID == this.accounts[index].ID) {
                   return index}
            }
            throw new NotFound("Account not found :(")
    
           } catch (error) {
                throw error
           }
    }
    updateAccount(accountID, newName){
        try{
            if(typeof accountID != 'number'){throw new Invalid("Invalid ID type, enter a number")}
            if(typeof newName != 'string'){throw new Invalid("Invalid name type, enter a string")}
            let indexOfAccount = this.findAccount(accountID)
            this.accounts[indexOfAccount].accountName = newName
            Bank.allBanks[indexOfAccount].accounts.accountName = newName
        }
        catch (error){
            return error
        }
    }
    deleteAccount(accountID){
        try {
            if(typeof accountID != 'number'){throw new Invalid("Invalid ID type, enter a number")}
            let indexOfAccount = this.findAccount(accountID)
            this.accounts.splice(indexOfAccount,1)
        } 
        catch (error) {
            return error
        }
    }
    depositInAccount(accountID, amount){
        try{
            console.log(accountID,amount)
            if(typeof accountID != 'number'){throw new Invalid("Invalid ID type, enter a number")}
            if(typeof amount != 'number'){throw new Invalid("Invalid amount type, enter a number")}
            if(amount < 0 ){throw new Invalid("Invalid amount entered, must be > 0")}
            let indexOfAccount = this.findAccount(accountID)
            this.accounts[indexOfAccount].balance += amount
            let passB = new Passbook(this.accounts[accountID].accountName, 'Deposit', amount,this.accounts[indexOfAccount].balance)
            this.transactions.push(passB)
            return passB
        }
        catch (error){
            return error
        }
    }
    withdrawFromAccount(accountID, amount){
        try{
            if(typeof accountID != 'number'){throw new Invalid("Invalid ID type, enter a number")}
            if(typeof amount != 'number'){throw new Invalid("Invalid amount type, enter a number")}
            if(amount < 0 ){throw new Invalid("Invalid amount entered, must be > 0")}
            let indexOfAccount = this.findAccount(accountID)
            if((this.accounts[indexOfAccount].balance -= amount) < 0 ){throw new Invalid("Insufficient balance!")}
            this.accounts[indexOfAccount].balance -= amount
            let passB = new Passbook(this.accounts[accountID].accountName, 'Withdrawal', amount,this.accounts[indexOfAccount].balance)
            this.transactions.push(passB)
            return passB
        }
        catch (error){
            return error
        }
    }
    transfer(senderAccountID, amount, recieverUserID, recieverAccountID ){
        try {
            console.log(this, '+++++')
            let indexOfSender = this.findAccount(senderAccountID)
            console.log('step 1')
            let indexOfReciever = User.findCustomer(recieverUserID)
            console.log('step 2')
            let reciever = User.allCustomers[indexOfReciever]
            console.log('step 3', reciever)
            let indexOfRecieverAccount = reciever.findAccount(recieverAccountID)
            console.log('step 4',indexOfReciever,indexOfRecieverAccount)

            this.withdrawFromAccount(senderAccountID, amount)
            reciever.depositInAccount(recieverAccountID, amount)
           

        } catch (error) {
            return error
        }
    }
    getPassbook(){
        return this.transactions
    }
}
let admin = User.newAdmin("Administrator")

let c1 = admin.newCustomer('Customer 1')
let c2 = admin.newCustomer('Customer 2')


// console.log(admin.updateCustomers(1,'UpdatedCust'))
// console.log(admin.getAllCustomers())
// console.log(admin.deleteCustomer(1))
// console.log(admin.getAllCustomers())

admin.newBank("HDFC Bank")
admin.newBank("SBI Bank")
admin.newBank("ICICI Bank")
console.log(admin.getAllBanks())

// admin.updateBank(0, "PMC Bank")

// console.log(admin.getAllBanks())

//admin.deleteBank(0)

c1.createAccount(2, 'Gareeb', 10000)
c2.createAccount(2, 'AmeerDost', 200000)
c2.createAccount(1, 'AmeerDost', 2000)

//console.log(admin.getAllBanks())
c1.createAccount(1, 'Gareeb', 90)
c1.createAccount(0, 'Gareeb',11000)
c1.updateAccount(0, 'Ameer')
//console.log(c1.getAllaccounts())
//console.log(c1.getNetWorth())

 c1.depositInAccount(3, 10)
// console.log(c1.getNetWorth())
console.log(c1.getAllaccounts())
console.log(c2.getAllaccounts())

console.log('***********************************')
console.log(c1.transfer(3, 100, 2 , 1))
console.log(c1.getAllaccounts())
console.log(c2.getAllaccounts())
// // console.log(c1.withdrawFromAccount(1,100))
//console.log(c1.getPassbook())
// console.log(admin.getAllCustomers())
