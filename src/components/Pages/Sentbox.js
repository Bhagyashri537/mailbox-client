import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/sentemailSlice";
import { Link } from "react-router-dom";

const Sentbox =  () => {
  const data = useSelector((store) => store.mailbox.sentmail);
  const dispatch = useDispatch();

  const getSavedata = () => {
    fetch(
      `https://mail-box-client-831b1-default-rtdb.firebaseio.com/mail/${localStorage.getItem("email")}/sent.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      })
      .then((data) => {
        console.log(data);
        const myarr = [];

        for (let i in data) {
          myarr.unshift({
            id: i,
            email: data[i].email,
            subject: data[i].subject,
            message: data[i].message,
          });
        }

        dispatch(mailActions.addSentMail(myarr));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getSavedata();
  }, []);

  return (
   
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Messages
                </th>
                
            </tr>
        </thead>
        <tbody>
        
         {data.map((item, index) => (
            <tr key={index} class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {item.email}
                </th>
                <td class="px-6 py-4">
                {item.subject} -- {item.message}
                </td>
                
            </tr>

             ))}
            </tbody>
      
      
      </table>
      </div>
    
  );
};
export default Sentbox;
