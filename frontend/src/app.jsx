import List from "./pages/list";
import Details from "./pages/details";
import Form from "./components/form";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/add" element={<Form />} />
            <Route path="/edit/:id" element={<Form />}/>
            <Route path="/hotels/:id" element={<Details />} />
            <Route path="*" element={<h2>Page not Found</h2>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App;