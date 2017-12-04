import { Person } from './Person';

/**
* A BillItem is an entry from any sort of bill, like a receipt or a sales ticket.  
* A BillItem contains an ID, a description, a debtor (who should pay the BillItem) and the amount of the item.
*/
export class BillItem
{
    private _id: number;
    private _description: string;
    private _debtor: Person;
    private _amount: number;
    
    /**
    * Initialise a new BillItem.
    *
    * @param {number} [id=-1] - The ID of the new BillItem.
    * @param {string} [description=""] - The description of the new BillItem.
    * @param {Person} [debtor=new Person()] - The debtor of the new BillItem.
    * @param {number} [amount=0] = The price of the new BillItem.
    *
    * @class BillItem
    */
    constructor(id : number = -1, description : string = "", debtor : Person = new Person(), amount : number = 0)
    {
        this.id = id;
        this.description = description;
        this.debtor = debtor;
        this.amount = amount;
    }
    
    /**
    * Get or set the ID of the BillItem.
    * 
    * @returns {number} The ID of the BillItem.
    */
    get id() : number
    {
        return this._id;
    }
    
    set id(newId : number)
    {
        this._id = newId;
    }
    
    /**
    * Get or set the description of the BillItem.
    *
    * @returns {string} The description of the BillItem.
    */
    get description() : string
    {
        return this._description;
    }
    
    set description(newDescription : string)
    {
        this._description = newDescription;
    }
    
    /**
    * Get or set the debtor of the BillItem.
    *
    * @returns {Person} The Person instance that owes the debt.
    */
    get debtor() : Person
    {
        return this._debtor;
    }
    
    set debtor(newDebtor : Person)
    {
        this._debtor = newDebtor;
    }
    
    /**
    * Get or set the amount (price) of the BillItem.
    * 
    * @returns {number} The amount (price) of the BillItem.
    */
    get amount() : number
    {
        return this._amount;
    }
    
    set amount(newAmount : number)
    {
        this._amount = newAmount;
    }
    
}