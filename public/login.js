// const useHistory          = ReactRouterDOM.useHistory;

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');   
  const [user, setUser]     = React.useState('');
  const useHistory          = ReactRouterDOM.useHistory;

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus} user={user}/>}
    />
  ) 
}

function LoginMsg(props){
  const currentUser = props.user.email;
  window.alert("You are logged in!");
  return(<>
    <h5>{`Welcome ${currentUser}!`}</h5>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const useHistory          = ReactRouterDOM.useHistory;

  function handle(){
    console.log(email, password);
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`user: ${user.email}`);
      props.setUser(user);
      props.setStatus("");
      props.setShow(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("one");
      // console.log(`Error logging in ${errorCode}: ${errorMessage}`);
      props.setStatus("fail!");
    });  

     let history = useHistory();
    history.push('/logout')
   
  }

  function handleGoogle(){
    // console.log(user);
    // console.log(email, password);
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      const user = userCredential.user;
      // const currentUser = user.email;
      // console.log(`user: ${user.email}`);
      props.setUser(user);
      props.setStatus("");
      props.setShow(false);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("one");
      // console.log(`Error logging in ${errorCode}: ${errorMessage}`);
      props.setStatus("fail!");
    });  
  }

  // function handleLogout() {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       console.log("User successfuly logs out");
  //     })
  //     .catch((error) => {
  //       console.log(`Error logging out ${errorCode}: ${errorMessage}`);
  //     });
  // }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button><br></br><br></br>
    <button type="submit" className="btn btn-light" onClick={handleGoogle}>Google Login</button>
  </>);

}