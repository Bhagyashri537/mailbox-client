import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Message = () => {
  const inboxdata = useSelector((state) => state.inboxmail.inbox);
 
  const params = useParams();
  const navigate = useNavigate()

  const data = inboxdata.find((value) => value.id === params.id);

  const backHandler = () => {
     navigate('/welcome')
  }
  
  return (
    <div className="px-14 py-20">
      <h2 className="font-bold">Message Details</h2>
      <img
        className="h-10"
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1W-_M51h_sKl6PZJTYiCATQgqJeG23kQDrQ&usqp=CAU"
        }
        alt="/"
      />
      <div className=" p-10">
        <div className="p-3 shadow-2xl">
          <h1 className="font-bold text-lg text-blue-900">FROM </h1>
          <h2>{data.email}</h2>
        </div>
        <div className="p-3 pt-10 h-40 shadow-lg">
          <h1 className="font-bold text-blue-900">Subject</h1>
          <h2> {data.subject}</h2>
          <h2 className="font-bold text-blue-900">Message</h2>
          <h1>{data.message}</h1>
        </div>
      </div>
      <div  className="flex justify-end ">
      <button className="bg-zinc-800 p-1 rounded-lg text-white" onClick={() => backHandler()}>Back</button>
      </div>
    </div>
  );
};
export default Message;
