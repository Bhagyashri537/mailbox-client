import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { inboxAction } from "../store/inboxSlice"

function Inbox() {
    const dispatch = useDispatch()
    const inboxdata = useSelector(state=>state.inboxmail.inbox)
    //const showMsg = useSelector(state=>state.inboxmail.readmessage)
    console.log(inboxdata)


     
    const InboxHandler = ()=>{
        fetch(`https://mail-box-client-831b1-default-rtdb.firebaseio.com/mail/${localStorage.getItem('email')}/recieve.json`)
        .then((response)=>{
            if(response.ok){
                return response.json()
            }else{
                return response.json().then((data)=>{
                    if(data && data.error && data.error.message){
                        let errMsg = "Authentication Failed, " + data.error.message;
                        throw new Error(errMsg);
                    }
                })
            }
        }).then((data)=>{
            const arr = []

            for(let i in data){
                arr.push({
                    id:i,
                    email:data[i].email,
                    subject:data[i].subject,
                    message:data[i].message,
                    showMsg: data[i].showMsg
                    

                })
            }

            
           
            dispatch(inboxAction.setinbox(arr))
            console.log(arr)


        }).catch((err)=>{
            alert(err.message)
        })


       }

       useEffect(()=>{
        InboxHandler()
       },[])
       setInterval(() => {
        InboxHandler()
       }, 9000)

       const ReadingHandler = (id)=>{
        fetch(`https://mail-box-client-831b1-default-rtdb.firebaseio.com/mail/${localStorage.getItem('email')}/recieve/${id}.json`,{
            method:"PATCH",
            body:JSON.stringify({
                showMsg : false
            }),

            headers:{
              'Content-Type':'application/json'
            }
          }).then((res)=>{
            if(res.ok){

                return res.json();
            }else{
                return res.json().then((data)=>{
                    if(data && data.error && data.error.message){
                        let errMessage = "Authentication Failed, " + data.error.message;
                        throw new Error(errMessage);
                    }
                })
            }
        }).then((data)=>{
                 console.log('hii')
             InboxHandler()
              
        }).catch((err)=>{
          alert(err.message);
        })

        

    }

     

       const deleteHandler = (id)=>{
        fetch(`https://mail-box-client-831b1-default-rtdb.firebaseio.com/mail/${localStorage.getItem('email')}/recieve/${id}.json`,{
          method:"DELETE",
          
          headers:{
            'Content-Type':'application/json'
          }
        }).then((res)=>{
          if(res.ok){
            
              return res.json();
          }else{
              return res.json().then((data)=>{
                  if(data && data.error && data.error.message){
                      let errMessage = "Authentication Failed, " + data.error.message;
                      throw new Error(errMessage);
                  }
              })
          }
      }).then((data)=>{
            InboxHandler()
        
      }).catch((err)=>{
        alert(err.message);
      })
    
      
    }
    
  return (

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Messages
                </th>
                
            </tr>
        </thead>
        <tbody>
        
        {inboxdata.map((item, index) => (
            <tr key={index} onClick={() => ReadingHandler(item.id)} className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {item.email}
                </th>
                <Link to={'/msg/' + item.id}>
                <td className="px-6 py-4" >
                  {item.subject} -- {item.message}
                </td>
                </Link>
                <td className="cursor-pointer" onClick={() => deleteHandler(item.id)}>delete</td> 
                {/* <td  onClick={() => ReadingHandler(item.id)}>{showMsg ?  '***' : ''} </td> */}
                {item.showMsg && <p>🎀</p>}
                {console.log(item.showMsg)}
            </tr>

             ))}
            </tbody>
      
      
      </table>
      </div>

     

  )
}

export default Inbox