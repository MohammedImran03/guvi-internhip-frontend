import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log("Account Created Successfully");
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-300 flex justify-center"
    >
      {error ? (<div className="mt-12 flex w-fit justify-center"><div role="alert">
  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex justify-center">
    Account Activation Failed
  </div>
  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>Your Vendor Bay Account Activation URL has been Expired, Please try to SignUp Again...</p>
    <p className="text-xs"><b>Note : </b><span className="ml-1">Account Activation Link Expires in 15minutes.</span></p>
  </div>
</div></div>
      ) : (<div className="mt-12 flex w-fit justify-center"><div role="alert">
      <div class="bg-teal-600 text-white font-bold rounded-t px-4 py-2 flex justify-center">
        Welcome To Vendor Bay. 
      </div>
      <div class="border border-t-0 border-green-400 rounded-b bg-teal-100 px-4 py-3 text-green-700">
        <p>Your Account has been Created Successfully, You can experience our Platform Now.</p>
      </div>
    </div></div>
      )}
    </div>
  );
};

export default ActivationPage;