function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [validTransaction, setValidTransaction] = React.useState(false);
  const accessToken = localStorage.getItem('token');


  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
  
}

function WithdrawForm(props){
  const [name, setName]     = React.useState('');
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');  

  function handle(){
    console.log(name, email,amount);
    const url = `http://localhost:3000/account/withdraw/${name}/${email}/${amount}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('data'+ data);
        })
  }

  return (<>

    Name<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter name" 
          value={name} 
          onChange={e => setName(e.currentTarget.value)}/><br/>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
  }
