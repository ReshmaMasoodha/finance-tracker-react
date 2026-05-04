import {useState, useEffect} from 'react';
export default function TransactionForm ({onAdd,editData,onUpdate,onCancel}){
  const [amount,setAmount] = useState('');
  const [description,setDescription] = useState('');
  const [date,setDate] = useState();
  const [type,setType] = useState('expense');
  const [category,setCategory] = useState('groceries');
  const [account,setAccount] = useState('cash');
  const [errorAmount,setErrorAmount] = useState(false);
  const [errorDes,setErrorDes] = useState(false);
  
  useEffect(()=> {
    if(editData){
      setAmount(editData.amount);
      setDescription(editData.description);
      setType(editData.type);
      setCategory(editData.category);
      setAccount(editData.account);
    }
    else{
      setAmount('');
      setDescription('');
      setType('');
      setCategory('');
      setAccount('');
    }
  },[editData]);
  const handleChange = (event) => {
    const value=event.target.value;
    if(value==''){
      setErrorAmount(true);
    }
    else{
      setErrorAmount(false);
    setAmount(event.target.value);
    }
  }
  const handleChangeText = (event) => {
    setType(event.target.value);
    if(event.target.value=="income"){
      setCategory("salary")
    }
  }
  const handleDescription = (event) => {
    const value=event.target.value;
    if(value==''){
      setErrorDes(true);
    }
    else{
      setErrorDes(false);
      setDescription(event.target.value);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (amount==''||description==''){
      if(amount==''){
        setErrorAmount(true);
      }
      if(description==''){
        setErrorDes(true);
      }
    }
    else{
    const data = {
      id: Date.now(),
      date: new Date(),
      amount: amount,
      type: type,
      category: category,
      account: account,
      description: description
    }
    if(editData){
      onUpdate(data, editData.id)
    }
    else{
      onAdd(data);
    }
    setAmount('');
    setType('expense');
    setCategory('groceries');
    setAccount('cash');
    setDescription('');
  }}
  const clearForm = ()=>{
    setAmount('');
    setType('expense');
    setCategory('groceries');
    setAccount('cash');
    setDescription('');
    setErrorAmount(false);
    setErrorDes(false);
  }
  const isValid = errorAmount || errorDes;
  return(
     <form onSubmit = {handleSubmit}>
      <h3>Amount (₹)</h3>
      <input 
      type="number" 
      value= {amount}
      placeholder= "Enter Amount"
      onChange= {handleChange}
      ></input>
      {errorAmount && <p style={{color: 'red'}}>Amount can't be empty</p>}
      <h3>Type</h3>
      <select style={{marginBottom:"10px",marginTop:"10px"}} onChange ={handleChangeText}>
        <option value = "expense">
          Expense
        </option>
        <option value = "income">
          Income
        </option>
      </select>
      <h3>Category</h3>
      {type == "income"?
        <select style={{marginBottom:"10px"}} onChange= {(e) => setCategory(e.target.value)}>
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
        <select style={{marginBottom:"10px"}} onChange={(e) => setCategory(e.target.value)}>
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
      <select style={{marginBottom:"10px"}} onChange = {(e) => setAccount(e.target.value)}>
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
      placeholder="Enter Description"
      onChange = {handleDescription}/>
      {errorDes && <p style={{color: 'red'}}>Description canct be empty!</p>}
    
      <button disabled={isValid}type = "submit" style={{backgroundColor:'blue'}}>Submit</button>
      <button type="button" onClick={clearForm}> clear form</button>
      {editData && 
        <button type="button" onClick={onCancel} >Cancel</button>
      }
    </form>
  )
}