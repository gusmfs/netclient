import { RoutesMain } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ClientProvider} from "./providers/clientContext";
import { ContactProvider } from "./providers/contactContext";
function App(){

  return (
    <>
      <ToastContainer autoClose={2000}/>
      <ClientProvider>
        <ContactProvider>
          <RoutesMain/>
        </ContactProvider>
      </ClientProvider>
    </>
  )
}

export default App
