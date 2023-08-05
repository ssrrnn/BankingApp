class Bank{
    static ID = 0
    static allBanks = []
    constructor(bankName){
        this.bankName = bankName
        this.ID = Bank.ID++
        this.accounts = []
    }
     static findBank(bankID){
        try {
         for (let index = 0; index < Bank.allBanks.length; index++) {
             if(bankID == Bank.allBanks[index].ID) {return index}
         }
         throw new NotFound("Bank not found")
 
        } catch (error) {
             throw error
        }
     }
     static findBankName(bank){
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
        updateBank(newValue){
            return this.bankName = newValue
    }
}

module.exports = Bank