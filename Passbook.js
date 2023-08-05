class Passbook{
    static NO = 1
    constructor(accountName, transactionType, amount, balance){
        this.srNo = Passbook.NO++
        this.dateOfTransaction = new Date().toString()
        this.accountName = accountName
        this.transactionType = transactionType
        this.amount = amount
        this.balance = balance
    }
}
module.exports = Passbook