import { useState } from 'react';

export default function Transactions({newTrans,deleteTrans,updateTrans}){
  const [amount,setAmount] = useState(0);
  const [description,setDescription] = useState('');
  const [type,setType] = useState('');
  const [category,setCategory] = useState('');
  const [account,setAccount] = useState('');
  const handleChange = (event) => {
    setAmount(Number(event.target.value));
  }
  const handleChangeText = (event) => {
    setDescription(event.target.value);
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
  return(
    <form onSubmit = {handleSubmit}>
      <h3>Amount</h3>
      <input 
      type="number" 
      value= {amount}
      onChange= {handleChange}></input>
      <h3>Type</h3>
      <select onChange ={(e) => setType(e.target.value)}>
        <option value = "expense">
          Expense
        </option>
        <option value = "income">
          income
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
      onChange = {handleChangeText} />
      <button type = "submit">Submit</button>
    </form>
  )
}