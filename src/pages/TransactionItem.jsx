export default function TransactionItem({dis,EditButton,DeleteButton}){
  return(
    <li key={dis.id}>
        <span style={{color:'blue'}}>
          {dis.date.getDate()}-
          {dis.date.getMonth()} -
          {dis.date.getFullYear()}
        </span>
        ₹ {dis.amount.toLocaleString('en-US')} - 
        {dis.type} - 
        {dis.category} - 
        {dis.account} - 
        {dis.description} 
        <button onClick = {() => {EditButton(dis.id)}}>✏</button> 
        <button onClick={() => DeleteButton(dis.id)}>X</button>
      </li>
  )
}