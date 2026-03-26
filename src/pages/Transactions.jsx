import { useEffect, useState } from 'react';
import Popup from './Popup.jsx';
import TransactionItem from './TransactionItem';
export default function Transactions({display,newTrans,deleteTrans,updateTrans,totals}){
  const [amount,setAmount] = useState(0);
  const [description,setDescription] = useState('');
  const [type,setType] = useState('expense');
  const [category,setCategory] = useState('groceries');
  const [account,setAccount] = useState('cash');
  const [sort,setSort] = useState('all');
  const [button,setButton] = useState(false);
  const [checked,setChecked] = useState(false);
  const [deleteId,setDeleteId] = useState();
  const [editId,setEditId] = useState(0);
  var filteredList = [];
  const [sortAmount,setSortAmount] = useState('descending');
  const handleChange = (event) => {
    setAmount(Number(event.target.value));
  }
  const handleDateChange = () => {
    setChecked(!checked);
  }
  const handleChangeText = (event) => {
    setType(event.target.value);
    if(event.target.value=="income"){
      setCategory("salary")
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(amount==0||description==null){
      window.alert("Amount and description can't be empty")
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
    newTrans(data);
    }
    setAmount('');
    setType('expense');
    setCategory('groceries');
    setAccount('cash');
    setDescription('');
  }
  const deleteTransaction = (event) => {
    deleteTrans(event.target.value);
  }
  const editButton = (id) => {
    setEditId(id);
    const editTrans = display.find(item => item.id==id);
    setAmount(editTrans.amount);
    setType(editTrans.type);
    setCategory(editTrans.category);
    setAccount(editTrans.account);
    setDescription(editTrans.description);
  }
  const sortByType = (event) => {
    setSort(event.target.value);
  }
  const handleSort = (event) => {
    setSortAmount(event.target.value);
  }
  const deleteButton = (id) => {
    setDeleteId(id)
    setButton(true);
  }
  const handleConfirm = (value) => {
    if(value){
      deleteTrans(deleteId);
      setButton(false);
    }
    else{
      setButton(false);
    }
  }
  const handleEditChange = () => {
    const editData = {
      id: editId,
      date: new Date(),
      amount: amount,
      type: type,
      category: category,
      account: account,
      description: description
    }
    updateTrans(editData,editId);
    setEditId(0);
    setAmount('');
    setType('expense');
    setCategory('groceries');
    setAccount('cash');
    setDescription('');
  }
  const handleCancel = () => {
    setEditId(0);
    setAmount('');
    setType('expense');
    setCategory('groceries');
    setAccount('cash');
    setDescription('');
  }
  if(sort!="all"){
    //filtering based on sort type
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
const sortByDate = (a, b) => {
    return a.date - b.date;}
if(checked){
  filteredList.sort(sortByDate);
};

  return(
    <div style={{padding: '0',margin:'0',maxWidth:'1200px'}}>
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
      {editId != 0 ? <>
      <button onClick = {handleCancel}>Cancel</button>
      <button onClick = {handleEditChange}>Update</button> </>
      :
      <button type = "submit">Submit</button>
      }
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
      <p>Date Sort</p>
      <input type="checkbox"
      checked ={checked}
      onChange = {handleDateChange}/>
    </div>
    <div>
    <p>Total Income {totals.totalIncome}</p>
    <p>Total Expense {totals.totalExpense}</p>
    <p>Net Balance {totals.netBalance>0? 
    <span style={{color: 'green'}}> {totals.netBalance}</span> :
    <span style={{color: 'red'}}> {totals.netBalance}</span> 
    }</p>
    </div>
    <div>
    {display.length <=0 ?
      <p>Empty List. Add Transcation</p>
      :
    <ul style ={{padding: "0"}}>
      {filteredList.map((dis)=> ( 
      <>
      <TransactionItem dis={dis} EditButton={editButton} DeleteButton ={deleteButton} />
      
      </>
      ))}
    </ul>}
    {button &&
      <Popup confirm = {handleConfirm} id={setDeleteId}>
        <h3>Delete</h3>
      </Popup>
    }
    </div>
    </div>
  )
}