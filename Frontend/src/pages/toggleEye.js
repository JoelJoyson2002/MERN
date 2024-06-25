window.onclick=(e)=>{
    let y=e.target.className.split(' ')
    if(y.includes("cmp")){
      if(y.includes("bi-eye-slash")){
        e.target.className="cmp bi bi-eye"
        document.getElementsByClassName("psw")[0].type="password"
      }
      else{
        e.target.className="cmp bi bi-eye-slash"
        document.getElementsByClassName("psw")[0].type="text"
      }
    }
  }