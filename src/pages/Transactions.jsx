import { useEffect, useState } from 'react';

export default function Transactions({display,newTrans,deleteTrans,updateTrans}){
  const [amount,setAmount] = useState(0);
  const [description,setDescription] = useState('');
  const [type,setType] = useState('expense');
  const [category,setCategory] = useState('groceries');
  const [account,setAccount] = useState('cash');
  const [sort,setSort] = useState('all');
  var filteredList = [];
  const [sortAmount,setSortAmount] = useState('descending');
  const handleChange = (event) => {
    setAmount(Number(event.target.value));
  }
  const handleChangeText = (event) => {
    setType(event.target.value);
    if(event.target.value=="income"){
      setCategory("salary")
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      id: Date.now(),
      date: new Date(),
      amount: amount,
      type: type,
      category: category,
      account: account,
      description: description
    }
    newTrans(data);
  }
  const deleteTransaction = (event) => {
    deleteTrans(event.target.value);
  }
  const sortByType = (event) => {
    setSort(event.target.value);
  }
  const handleSort = (event) => {
    setSortAmount(event.target.value);
  }
  const totalExpense = display.reduce((accumulator, currentValue)=>{
    if (currentValue.type == "expense"){
      return accumulator+currentValue.amount;
    }
    return accumulator;
  },0);
  const totalIncome = display.reduce((accumulator, currentValue)=>{
    if (currentValue.type == "income"){
      return accumulator+currentValue.amount;
    }
    return accumulator;
  },0);
  const netBalance = totalIncome - totalExpense;
  if(sort!="all"){
    filteredList = display.filter(e => (e.type== sort));
    }else{
      filteredList = display;
    }
  if (sortAmount=='ascending'){
      filteredList.sort((a, b) => a.amount - b.amount);
    }
    else{
      filteredList.sort((a, b) => b.amount - a.amount);
    }
  return(
    <>
      <div>
    <form onSubmit = {handleSubmit}>
      <h3>Amount</h3>
      <input 
      type="number" 
      value= {amount}
      onChange= {handleChange}></input>
      <h3>Type</h3>
      <select onChange ={handleChangeText}>
        <option value = "expense">
          Expense
        </option>
        <option value = "income">
          Income
        </option>
      </select>
      <h3>Category</h3>
      {type == "income"?
        <select onChange= {(e) => setCategory(e.target.value)}>
          <option value = "salary">
            Salary
          </option>
          <option value = "freelance">
            Freelance
          </option>
          <option value = "investmentReturn">
            Investment Return
          </option>
          <option value = "gift">
            Gift
          </option>
        </select> :
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value = "groceries">
            Groceries
          </option>
          <option value = "rent">
            Rent
          </option>
          <option value = "utilities">
            Utilities
          </option>
          <option value = "transport">
            Transport
          </option>
          <option value = "entertainment">
            Entertainment
          </option>
        </select>
      }
      <h3>Account</h3>
      <select onChange = {(e) => setAccount(e.target.value)}>
        <option value = "cash">
          Cash
        </option>
        <option value = "bank">
          Bank
        </option>
        <option value = "savings">
          Savings
        </option>
      </select>
      <h3>Description</h3>
      <input type = "text"
      value = {description}
      onChange = {(e)=>setDescription(e.target.value)} />
      <button type = "submit">Submit</button>
    </form>
    <h3>Sort by Type</h3>
    <select onChange= {sortByType}>
      <option value = "all">
        All
      </option>
      <option value = "income">
        Income
      </option>
      <option value = "expense">
        Expense
      </option>
    </select>
    <select onChange = {handleSort}>
      <option value = 'ascending'>
        Ascending
      </option>
      <option value = 'descending'>
        Descending
      </option>
    </select>
    </div>
    <div>
    <p>Total Income {totalIncome}</p>
    <p>Total Expense {totalExpense}</p>
    <p>Net Balance {netBalance>0? 
    <span style={{color: 'green'}}> {netBalance}</span> :
    <span style={{color: 'red'}}> {netBalance}</span> 
    }</p>
    </div>
    <div>
    <ul>
      {filteredList.map((dis)=> (
      <li key={dis.id}>
        {dis.amount} - 
        {dis.type} - 
        {dis.category} - 
        {dis.account} - 
        {dis.description} 
        <button onClick={() => deleteTrans(dis.id)}>X</button>
      </li>
      ))}
    </ul>
    </div>
    </>
  )
}