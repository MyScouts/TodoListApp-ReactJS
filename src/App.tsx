import { useEffect } from "react";
import { SideBar } from "./resources/components/sidebar/sidebar";
import { HomePage } from "./resources/pages/home/homePage";
import { useDispatch } from 'react-redux'
import { loadTodosAction } from "./resources/redux/actions/todoActions";
import { loadTodoColumnsAction } from "./resources/redux/actions/todoColumnAction";


function App() {
  const dispatch = useDispatch()
  useEffect(() => initialData(), [])
  const initialData = () => { dispatch(loadTodosAction()); dispatch(loadTodoColumnsAction()) }
  return (
    <div className="App">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="wrapper">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
