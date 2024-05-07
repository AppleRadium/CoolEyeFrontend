import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import ListView from "./components/ListView"
import TandH from "./components/TandH"
import LatestImage from './components/LatestImage';

function App() {
  const [inventory, setInventory] = useState([])
  const [Item, setFoodItem] = useState('')
  const [Count, setCount] = useState('')
  
  
  const fetchInventory = () => {
    axios.get('https://protected-dawn-61147-56a85301481c.herokuapp.com/fooditem/')
      .then(res => {
        console.log("Received data:", res.data);
        setInventory(res.data); 
      })
      .catch(error => console.error('Fetching inventory error:', error));
  };
 
  const refreshInventory = async () => {
    try {
        const response = await axios.get('https://protected-dawn-61147-56a85301481c.herokuapp.com/fooditem/');
        setInventory(response.data);
    } catch (error) {
        console.error("Error fetching items list:", error);
    }
};
useEffect(() => {
  refreshInventory();  // Load the initial data
}, []);

  useEffect(() => {
    fetchInventory();
  }, []);

 
  const addFoodItem = () => {
    axios.post('https://protected-dawn-61147-56a85301481c.herokuapp.com/fooditem/', {"Item": Item, "Count": Count})
    .then(() => {
      console.log("Item added successfully");
      fetchInventory();
    })
    .catch(err => console.error('Error adding item:', err));
};
  return (
    <div className="App">
       <div className = "App list-group-item justify-content-center align-items-center mx-auto"style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}></div>
      <h1 className = "card text-white bg-primary mb-1" >
        CoolEye</h1>
      <div className = "card-body"> 
      <h4 className = "card text-white bg-dark mb-3"> Latest Image</h4>
      <LatestImage/>
      <h4 className = "card text-white bg-dark mb-3"> Temperature and Humidity</h4>
      <TandH/>
      <h4 className = "card text-white bg-dark mb-3"> Input</h4>
      <h5>NOTE: Refresh upon every add and delete to see the updated item list!</h5>
      <span>
        <input className = "mb-2 form-control titleIn" onChange ={event =>setFoodItem(event.target.value)} placeholder='Name of Food Item'/>
        <input className = "mb-2 form-control titleIn" onChange ={event =>setCount(event.target.value)} placeholder='Item Count'/>
         <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px',"fontWeight":"bold"}} onClick={addFoodItem}>Add Food Item</button>
      </span>
      <h4 className = "card text-white bg-dark mb-3"> Inventory</h4>
      <div className="inventory-list">
      <ListView inventory={inventory} />
      </div>
      </div>
    </div>
  );
}

export default App;
