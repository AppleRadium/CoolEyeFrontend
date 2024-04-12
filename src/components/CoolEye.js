import axios from 'axios'
import React from 'react'

function Inventory(props) {
    
    const deleteFoodItem = (unique_id) => {

        console.log(props.fooditem.Item)
        console.log(props.fooditem.Count)
        console.log(props.fooditem.unique_id)

        axios.delete(`https://protected-dawn-61147-56a85301481c.herokuapp.com/fooditem/${unique_id}`)
            .then(response => {
                // Handle success
                console.log("Item deleted successfully", response.data);
            })
            .catch(error => {
                // Handle error
                console.error("Error deleting item", error);
            });
    };

    return (
        <div>
            <div>
                <span style={{ fontWeight: 'bold', underline: 'underline' }}>{props.fooditem.Item} : </span> {props.fooditem.Count}
               

                <button onClick={() => deleteFoodItem(props.fooditem.unique_id)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px'}}>Delete</button>
            </div>
            <hr />
        </div>
    );
}
export default Inventory;


