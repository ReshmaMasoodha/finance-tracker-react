export default function TransactionItem({dis,EditButton,DeleteButton}){
  return(
    <li key={dis.id} style={{display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc' }}>
        <span style={{color:'blue',padding:'5px'}}>
          {dis.date.getDate()}-
          {dis.date.getMonth()} -
          {dis.date.getFullYear()}
        </span>
       <span>₹ {dis.amount.toLocaleString('en-US')} </span> 
        <span>{dis.type} </span>
        <span>{dis.category} </span>
        <span>{dis.account}  </span>
        <span>{dis.description} </span>
        <span><button onClick = {() => {EditButton(dis.id)}}>✏</button>
        </span>
        <span>
        <button onClick={() => DeleteButton(dis.id)}>X</button>
        </span>
      </li>
  )
}