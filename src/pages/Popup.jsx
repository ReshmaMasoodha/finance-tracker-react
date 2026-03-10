export default function Popup({confirm,id,children}){
  const handleconfirm = () => {
    confirm(true)
    
  }
  const handleCancel = () => {
    confirm(false)
  }
  return(
    <div style ={{position:"fixed", z-index: 1,}}>
      {children}
    
    <button onClick={handleconfirm}>
      Confirm
    </button>
    <button onClick={handleCancel}>
      Cancel
    </button> 
    </div>
    )
}