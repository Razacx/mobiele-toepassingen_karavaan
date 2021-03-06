import { Person } from './Person';

/**
* A Debt is an object that keeps track of how much a Person owes another Person.  
* A Debt consists of an ID, a debtor, a creditor, an amount, a description and an "isPaid" flag/boolean that conveys if the Debt has been paid or not.
*/
export class Debt
{
    id : number;
    debtor : Person;
    creditor : Person;
    amount : number;
    description : string;
    isPaid : boolean;
    
    /**
    * Initialise a new Debt.
    *
    * @param {number} [id=-1] - The ID of the new Debt.
    * @param {Person} [debtor=new Person()] - The debtor of the Debt. (e.g.: Who needs to pay?)
    * @param {Person} [creditor=new Person()] - The creditor of the Debt. (e.g.: Who needs to be paid?)
    * @param {number} [amount=0] - The amount of the Debt. (e.g.: How much needs to be paid?)
    * @param {string} [description=""] - The description of the Debt. (e.g.: What needs to be paid?)
    * @param {boolean} [isPaid=false] - The boolean to keep track of the "paystate" of the Debt. (e.g.: Has it been paid already?)
    * 
    * @class Debt
    */
    constructor(id : number = -1, debtor : Person = new Person(), creditor : Person = new Person(), amount : number = 0, description : string = "New Debt.", isPaid : boolean = false)
    {
        this.id = id;
        this.debtor = debtor;
        this.creditor = creditor;
        this.amount = amount;
        this.description = description;
        this.isPaid = isPaid;
    }
}