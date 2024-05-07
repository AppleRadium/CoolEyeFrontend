import axios from 'axios'
import React, {useState} from 'react'

function Inventory(props) {
    
    const { unique_id, Item, Count, expiration_date } = props.fooditem; 

    const [newExpirationDate, setNewExpirationDate] = useState(expiration_date);
    const [editing, setEditing] = useState(false);

    const updateExpirationDate = (unique_id) => {
       
        const dataToSend = {
            unique_id,             
            Item,                  
            Count,                 
            expiration_date: newExpirationDate ? new Date(newExpirationDate).toISOString() : expiration_date
        };

        
        console.log("Unique ID being sent:", unique_id);
        console.log("Data being sent:", dataToSend);

        
        axios.put(`https://protected-dawn-61147-56a85301481c.herokuapp.com/fooditem/${unique_id}`, dataToSend)
            .then(response => {
                console.log("Expiration date updated successfully", response.data);
                setEditing(false);  
                props.refreshItems();  
            })
            .catch(error => {
                console.error("Error updating expiration date", error);
            });
    };
    

    const deleteFoodItem = (unique_id) => {

        console.log(props.fooditem.Item)
        console.log(props.fooditem.Count)
        console.log(props.fooditem.unique_id)
        console.log(props.fooditem.expiration_date)

        axios.delete(`https://protected-dawn-61147-56a85301481c.herokuapp.com/fooditem/${unique_id}`)
            .then(response => {
                
                console.log("Item deleted successfully", response.data);
            })
            .catch(error => {
                
                console.error("Error deleting item", error);
            });
    };

    return (
        <div>
            <div>
                <span style={{ fontWeight: 'bold', underline: 'underline' }}>Item:</span> {props.fooditem.Item} <br /> 
                <span style={{ fontWeight: 'bold', underline: 'underline' }}>Count: </span> {props.fooditem.Count} <br />
                <span style={{ fontWeight: 'bold', underline: 'underline' }}> Expires on: </span>
                {editing ? (
                    <>
                        <input
                            type="date"
                            value={newExpirationDate}
                            onChange={(e) => setNewExpirationDate(e.target.value)}
                        />
                        <button onClick={() => updateExpirationDate(props.fooditem.unique_id)} className="btn btn-primary">Save</button>
                    </>
                ) : (
                    <>
                        {props.fooditem.expiration_date || <button onClick={() => setEditing(true)} className="btn btn-secondary">Set Date</button>}
                    </>
                )}
                <br />
                <button onClick={() => deleteFoodItem(props.fooditem.unique_id)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px'}}>Delete</button>
            </div>
            <hr />
        </div>
    );
}
export default Inventory;


