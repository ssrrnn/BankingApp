const { allBanks } = require("./Bank")

class Account{
    static ID = 0
    static allBanks = []
    constructor(bankID, accountName, balance){
        this.ID = Account.ID++
        this.accountName = accountName
        this.balance = balance
        this.bankID = bankID
    }
}
module.exports = Account
