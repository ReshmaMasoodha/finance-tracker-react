export default function TransactionItem({dis,EditButton,DeleteButton}){
  return(
    <li key={dis.id} style={{display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc' }}>
        <span style={{color:'blue',padding:'5px'}}>
          {dis.date.getDate()}    {dis.date.toLocaleString('default', {month: 'short' })}   {dis.date.getFullYear()}
        </span>
        {dis.type== "income"?
       <span style={{color:'green'}}>₹ {dis.amount.toLocaleString('en-US')} </span> 
       :
       <span style={{color:'red'}}>{dis.amount.toLocaleString('en-US')}</span>}
        <span>{dis.type} </span>
        <span>{dis.category} </span>
        <span>{dis.account}  </span>
        <span>{dis.description} </span>
        <span><button onClick = {() => {EditButton(dis.id)}} style={{backgroundColor:'grey'}}>✏</button>
        </span>
        <span>
        <button onClick={() => DeleteButton(dis.id)} style={{backgroundColor:'red'}}>X</button>
        </span>
      </li>
  )
}