import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { inboxAction } from "../store/inboxSlice"

function Inbox() {
    const dispatch = useDispatch()
    const inboxdata = useSelector(state=>state.inboxmail.inbox)
    console.log(inboxdata)

    const submitHandler = ()=>{
        fetch(`https://mail-box-client-831b1-default-rtdb.firebaseio.com/mail/${localStorage.getItem('email')}/Recieve.json`).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((data)=>{
                    if(data && data.error && data.error.message){
                        let errMessage = "Authentication Failed, " + data.error.message;
                        throw new Error(errMessage);
                    }
                })
            }
        }).then((data)=>{
            const myarr = []

            for(let i in data){
                myarr.unshift({
                    id:i,
                    email:data[i].email,
                    subject:data[i].subject,
                    msg:data[i].msg

                })
            }

            //console.log(data)
            console.log(myarr)
            dispatch(inboxAction.setinbox(myarr))


        }).catch((err)=>{
            alert(err.message)
        })




       }

       useEffect(()=>{
        submitHandler()
       },[])


  return (



      <div>
        <Link to ='/welcome'>Compose email</Link>

    {inboxdata.map((item,index)=>(
        <div key={index} >
           
           <h2> {item.email}</h2>
            <h2>{item.subject}</h2>
                <h2>{item.message}</h2>

           
           


        </div>
    ))}
    </div>

  )
}

export default Inbox