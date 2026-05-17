import { useEffect, useState } from 'react';
import Popup from './Popup.jsx';
import TransactionItem from './TransactionItem';
import TransactionForm from './TransactionForm';
import TransactionTotal from './TransactionTotal';

export default function Transactions({display,newTrans,deleteTrans,updateTrans,totals}){
  const [sort,setSort] = useState("all");
  const [sortCat,setSortCat] = useState("all");
  const [button,setButton] = useState(false);
  const [checked,setChecked] = useState(false);
  const [deleteId,setDeleteId] = useState();
  const [editId,setEditId] = useState(0);
  var filter1 = [];
  const [sortAmount,setSortAmount] = useState('descending');
  const [search,setSearch] = useState('');
  const handleDateChange = () => {
    setChecked(!checked);
  }
  const deleteTransaction = (event) => {
    deleteTrans(event.target.value);
  }
  const editButton = (id) => {
    setEditId(id);
  }
  const editData = display.find(item => item.id==editId);
  const sortByType = (event) => {
    setSort(event.target.value);
  }
  const sortByCategory = (event) => {
    setSortCat(event.target.value);
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
  const getFilteredTransaction = () =>{
    let filteredList=[];
      if(sort!="all"){
    //filtering based on sort type
    filteredList = display.filter(e => (e.type== sort));
    }else{
      filteredList = display;
    }
    if(sortCat!="all"){
     filter1 = filteredList.filter(e=> (e.category == sortCat));
     filteredList = filter1;
    }
    else{
      filteredList=filteredList;
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
  if(search != ''){
    filteredList = filteredList.filter(e => e.description.toLowerCase().includes(search.trim().toLowerCase()));
  }
  return filteredList;
  }
 const filteredList = getFilteredTransaction();
  
  return(
    <div style={{padding: '0',margin:'0',maxWidth:'1200px'}}>
      <div>
        <div style={{border: '1px solid #ccc',
padding: '15px',
marginBottom: '20px'}}>
          <h3>Search</h3>
          <input type="text"
          value={search}
          onChange ={(e)=>{setSearch(e.target.value)}}></input>
   <TransactionForm 
   onAdd={newTrans}
   onUpdate={updateTrans}
   editData={editData}
   onCancel={()=> setEditId(0)}
   />
    </div>
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
    {sort == "income" ?
    <select onChange ={sortByCategory}>
      <option value = "all">
        All
      </option>
      <option value = "💰salary">
            Salary
          </option>
          <option value = "💻freelance">
            Freelance
          </option>
          <option value = "📈investmentReturn">
            Investment Return
          </option>
          <option value = "🎁gift">
            Gift
          </option>
    </select>
    : 
    <select onChange = {sortByCategory}>
      <option value = "all">
        All
      </option>
      <option value = "🛒groceries">
            Groceries
          </option>
          <option value = "🏠rent">
            Rent
          </option>
          <option value = "💡utilities">
            Utilities
          </option>
          <option value = "🚗transport">
            Transport
          </option>
          <option value = "🎬entertainment">
            Entertainment
          </option>
    </select>
    }
    <select onChange = {handleSort}>
      <option value = 'ascending'>
        Ascending
      </option>
      <option value = 'descending'>
        Descending
      </option>
    </select>
    {search &&
    <button onClick = {()=>setSearch('')}>Clear Search</button>
    }
      <p>Date Sort</p>
      <input type="checkbox"
      checked ={checked}
      onChange = {handleDateChange}/>
    </div>
    <div>
      <p>Category Totals:</p>   
    <p>Total Income {totals.totalIncome}</p>
    <p>Total Expense {totals.totalExpense}</p>
    <p>Net Balance {totals.netBalance>0? 
    <span style={{color: 'green'}}> {totals.netBalance}</span> :
    <span style={{color: 'red'}}> {totals.netBalance}</span> 
    }</p>
    <TransactionTotal filteredList={filteredList} />
    </div>
    <div>
    {filteredList.length <=0?
    <div style={{border: '1px solid #ccc',
padding: '20px',
marginBottom: '20px',
      textAlign: 'center',
    }}>
      <p>{search ? "No Results Found" : "Add your First Transaction"}</p>
      </div>
      :
      <div style={{border: '1px solid #ccc',
padding: '15px',
marginBottom: '20px'}}>
    <ul style ={{padding: "0"}}>
      {filteredList.map((dis)=> ( 
      <>
      <TransactionItem dis={dis} EditButton={editButton} DeleteButton ={deleteButton} />
      
      </>
      ))}
    </ul>
    {search ?
    <p>Total Transacrion = {filteredList.length} results found</p> :
    <p>Total Transcation = {filteredList.length}</p>
    }
    </div>
    }
    {button &&
      <Popup confirm = {handleConfirm} id={setDeleteId}>
        <h3>Delete</h3>
      </Popup>
    }
    </div>
    </div>
  )
}