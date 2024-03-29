import { BACK_Url } from "../utils/Img";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import { useRef } from "react";
const Mail = () => {
 // const [value, setValue] = useState("");
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [msg, setMsg] = useState("");


const emailref = useRef()
const subjectref = useRef()
const msgref = useRef()


  const submithandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailref.current.value;
    const enteredSubject = subjectref.current.value;
    const enteredMsg = msgref.current.value;
    const replacedmail = enteredEmail.replace('@','').replace('.','')
   localStorage.setItem('replacedmail',replacedmail)
    
   const maildata1 = {email: localStorage.getItem('key'), message:enteredMsg, subject:enteredSubject,  showMsg : true }
   const maildata = {email: enteredEmail, message:enteredMsg, subject:enteredSubject,  showMsg : true}

    // const maildata = {
    //     email: enteredEmail,
    //     subject: enteredSubject,
    //     msg: enteredMsg,
    //   };
    


    fetch(
      `https://mail-box-client-831b1-default-rtdb.firebaseio.com/mail/${localStorage.getItem("email")}/sent.json`,
      {
        method: "POST",
        body: JSON.stringify(maildata),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              console.log(data);
              let errMessage = "Authentication Failed, " + data.error.message;
              throw new Error(errMessage);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        
        alert('data added successfully')
      })
      .catch((err) => {
        alert(err.message);
      });

      fetch(
        `https://mail-box-client-831b1-default-rtdb.firebaseio.com/mail/${localStorage.getItem("replacedmail")}/recieve.json`,
        {
          method: "POST",
          body: JSON.stringify(maildata1),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              if (data && data.error && data.error.message) {
                console.log(data);
                let errMessage = "Authentication Failed, " + data.error.message;
                throw new Error(errMessage);
              }
            });
          }
        })
        .then((data) => {
          console.log(data);
          
          alert('data added successfully')
        })
        .catch((err) => {
          alert(err.message);
        });
    
  };

  return (
    <>
      <div className="relative w-full h-screen bg-zinc-600">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay "
          src={BACK_Url}
          alt="/"
        />
        <form onSubmit={submithandler}>
          <div className="pt-28 pl-80 pr-80 ">
            <div className="flex flex-col items-start bg-white pl-9 pr-9 border-2 border-slate-300 rounded-2xl shadow-2xl ">
              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <label className="pr-4 p-2 ">To:</label>
                <input
                  type="email"
                  placeholder="Enter your EmailId here"
                  className="w-full p-2 border border-blue-700 rounded-xl"
                  ref={emailref}
                 
                />
              </div>
              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <label className="pr-4 p-2">Subject:</label>
                <input
                  type="text"
                  placeholder="subject of an email"
                  className="w-full p-2 border border-blue-700 rounded-xl"
                 ref={subjectref}
                />
              </div>
              <div className="relative flex w-full flex-wrap items-stretch mb-3 h-48">
                <label className="pr-4 ">Input:</label>
               
                {/* <input type="textarea" ref={msgref}  className=" relative w-full row-span-6 indent-8 h-20 border border-blue-500 " /> */}
                <textarea ref={msgref} className=" relative w-full h-36 border border-blue-500 rounded-xl shadow-xl " rows={10} cols={5} />
                
                <div className=" relative flex w-full flex-wrap items-stretch  ">
                  {/* <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    className="w-full h-72"
                    placeholder="write a message here"
                    ref={msgref}
                  /> */}
                </div>
              </div>
              <div className="content-center  pt-2">
                <button className="relative  bg-blue-500 rounded-lg p-2 pb-2 hover:to-blue-900 text-white ">
                  Send
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Mail;
