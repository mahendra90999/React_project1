import React, { useState, useEffect } from 'react'

const getLocalData = () => {
    const lists = localStorage.getItem("mytodlist")

    if(lists) {
        return JSON.parse(lists);
    }else{
        return [];
    }
};

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () => {
        if(!inputData) {
            alert("plz fill data");
        }
        else if(inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                      return { ...curElem, name: inputData };
                    }
                    return curElem;
                  })
            );
            
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items,myNewInputData])
        }
    };

    const editItem = (index) => {
        const item_todo_edit = items.find((curElem) => {
            return curElem.id  === index;
        });
        setInputData(item_todo_edit.name)
        setIsEditItem(index); 
        setToggleButton(true);   
    }

    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !==index;
        });
        setItems(updatedItem)
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items]);

  return (
    <div>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    {/* <img src="./componets/image/download.png" alt="todo logo"></img> */}
                    <figcaption>Add your list here✌</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder='✍add Item' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value) }/>
                    {toggleButton ? 
                        (<i className="far fa-edit add-btn " onClick={addItem}></i>) :
                        (<i className="fa fa-solid fa-plus " onClick={addItem}></i>)
                    }
                </div>
                <div className='showItems'>
                    {items.map((curElem) => {
                        return(
                            <div className='eachItem' key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className='todo-btn'>
                                <i className="far fa-edit add-btn  " onClick={() => editItem(curElem.id)} ></i>
                                <i className="far fa-trash-alt  add-btn " onClick={() => deleteItem(curElem.id)}></i>
                            </div>
                        </div>
                        )
                    })}
                </div>
                
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll}>
                        <span>CHECK LIST</span>        
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todo
