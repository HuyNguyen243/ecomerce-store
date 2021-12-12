import React, { useState } from 'react';
import Header from "../header/Header";
import{Link} from "react-router-dom"

const user =[  {id:1,name:"Nguyễn Văn A", number:"(+84) 987654321" ,address :"200 Nguyễn Đình Chính, phường 6, quận Phú Nhuận, Hồ Chí Minh"},
                {id:2, name:"Nguyễn Văn B", number:"(+84) 987654321" ,address :"245 Nguyễn Đình Chính, phường 8, quận Phú Nhuận, Hồ Chí Minh"},
            ]

function UserAddress() {

    const[idUser,setidUser]=useState(1)
    const handleGetId=(e)=>{
        setidUser(e.target.id)
    }
    return (
        <div >
            <Header
                hasNavigation={true}
                title="ĐỊA CHỈ GIAO HÀNG"
            />
            <div className="main_container">
                <form className="basic-form">
                    {
                        user.map((item,value)=>{
                            return(
                                <div className="form-group" key={value} >
                                    <div className="information" onClick={handleGetId} id={item.id} >
                                        <div className="infor-user newstyle">
                                            <p>{item.name}<span>{item.id === 1 ? "[Mặc định]":""}</span></p>
                                            <p>{item.number}</p>
                                            <p>{item.address}</p>
                                        </div>
                                        <div className="infor-icon newstyle">
                                            <Link  to="/news-address"><img src="/images/fix.svg" alt="menu_icon" /></Link>
                                            <img src="/images/tickV.svg" alt="menu_icon" className={item.id == idUser ? "show":"hide"}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="fix-bottom">
                        <div className="btn-with-icon right-icon">
                            <Link to="/news-address"><button type="submit" className="btn btn-primary">Thêm địa chỉ mới</button></Link>
                            {/* <Icon name="east" /> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserAddress;