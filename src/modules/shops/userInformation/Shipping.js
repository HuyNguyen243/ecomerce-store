import React, { useState } from 'react';
import Header from "../header/Header";

const showShip =[{id:1,name:"Giao hàng tiết kiệm 1"},
                 {id:2,name:"Giao hàng tiết kiệm 1"},
                 {id:3,name:"Giao hàng tiết kiệm 1"}
                ]


function Shipping() {

    const [id,setId]= useState(1)
    const handleGetId =(e)=>{
        setId(e.target.id)
    }

    return (
        <>
        <Header
            hasNavigation={true}
            title="PHƯƠNG THỨC VẬN CHUYỂN"
         />
         <div className="main_container">
            <form className="basic-form" >
               
                {showShip.map((item,value)=>{
                    return(
                        <div className="form-group" key={value}>
                            <div className="shipping" id={item.id} onClick={handleGetId}>
                                <span id={item.id} className="shiper"  href="#" >{item.name}</span>
                                <img id={item.id} src="/images/tickV.svg" alt="menu_icon" className={item.id === parseInt(id )? "show" : "hide"}/>
                            </div>
                        </div>
                    )
                })}
            </form>
        </div>
        </>
    );
}

export default Shipping;