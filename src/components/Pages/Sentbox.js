import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/sentemailSlice";

const Sentbox = () => {
  const data = useSelector((store) => store.mailbox.sentmail);
  const dispatch = useDispatch();

  const getSavedata = () => {
    fetch(
      `https://mailbox-32314-default-rtdb.firebaseio.com/mail/${localStorage.getItem(
        "key"
      )}.json`
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
            msg: data[i].msg,
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
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.email}</h3>
          <h2>{item.subject}</h2>
          <h2>{item.msg}</h2>
        </div>
      ))}
    </div>
  );
};
export default Sentbox;
