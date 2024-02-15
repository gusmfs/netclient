import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
export const clientContext = createContext({});
export function ClientProvider({ children }) {
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("@TOKEN");
  
  
  async function getClient() {
    try {
      const { data } = await api.get(`/client/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClient(data);
      navigate("/dashboard")
    } catch (err) {
      console.log(err);
    }
    if (token) {
    getClient();
    }
  }
  useEffect(()=> {
    async function getClient() {
      try {
        const { data } = await api.get(`/client`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClient(data);
        navigate("/dashboard")
      } catch (err) {
        console.log(err);
      }
    }
    if (token) {
    getClient();
    }else{
      navigate('/')
    }
  },[])
  function clientLogout() {
    setClient(null);
    localStorage.removeItem("@TOKEN");
    navigate("/");
  }

  async function clientLogin(formData) {
    try {
      const {data} = await api.post("/session/login", formData)
      getClient()
      localStorage.setItem("@TOKEN", data.token)
      navigate("/dashboard")
      toast("Login successfully!");
    } catch (error) {
      toast.error("Login failed!");
    }
  }
  async function clientRegister(data) {
    try {
      const response = await api.post("/client", data);
      console.log(response);
      //setClient(response.data)
      console.log(data);
      toast.success("Account registered successfully!");
      navigate('/')
    }catch (error) {
      console.log(error);
      toast.error("Ops, Something went wrong!");
      if (error.response?.data === "Email already exists") {
        toast.error("Email already exists!");
      }}
      if(error.response?.data === "Number already exists") {
        toast.error("Email already exists!");

    }
  }

  return (
    <clientContext.Provider
      value={{
        clientRegister,
        client,
        setClient,
        clientLogout,
        clientLogin,
        navigate,
        
      }}
    >
      {children}
    </clientContext.Provider>
  );
}
