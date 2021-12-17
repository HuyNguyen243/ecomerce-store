import React, { useState } from 'react';
import Header from "../header/Header";
import { useHistory } from "react-router-dom";

function Newaddress() {
    const [checked,setChecked]=useState(false)
    const history = useHistory()
    const dataCity = [  {value :0 ,city: "Tỉnh/Thành phố "},
                        {value :1 ,city: "Đà Nẵng "},
                        {value :2 ,city: "Quảng nam "},
                        {value :3 ,city: "THà Nội "},
                        ]
    const dataDistrist = [  {value :0 ,district: "Quận/Huyện"},
                            {value :1 ,district: "Quận 1"},
                            {value :2 ,district: "Quận 2"},
                            {value :3 ,district: "Quận 3"},
                            ]
    const dataArea =     [  {value :0 ,area: "Phường/Xã"},
                            {value :1 ,area: "Phường Bến Nghé"},
                            {value :2 ,area: "Phường Ông Lãnh"},
                            {value :3 ,area: "Phường Tân Định"},
                            ]

    const handleBack=()=>{
        history.push("/OderForm")
    }

    const setDefaultAddress=(value)=>{
        setChecked(value)
        console.log(checked)
    }

    const showNameCity = () =>{
        return dataCity.map((item,value)=>{
            return(
                <option value= {item.value} key={value}>{item.city}</option>
            )
        })
    }

    const showDistrict = () =>{
        return dataDistrist.map((item,value)=>{
            return(
                <option value= {item.value} key={value}>{item.district}</option>
            )
        })
    }

    const showArea = () =>{
        return dataArea.map((item,value)=>{
            return(
                <option value= {item.value} key={value}>{item.area}</option>
            )
        })
    }

    return (
        <div >
            <Header
                hasNavigation={true}
                title="THÊM ĐỊA CHỈ GIAO HÀNG MỚI"
            />
            <div className="main_container">
                <form className="basic-form" >
                    <div className="form-group">
                            <div className="nav_label">
                                <span>Thông tin liên hệ</span>
                            </div>
                            <div className="user-information">
                                <input placeholder="Họ và tên" type="text" name="name"></input>
                                <input placeholder="Số điện thoại" type="number" name="phone"></input>
                            </div>
                            <div className="nav_label">
                                <span>Địa chỉ giao hàng</span>
                            </div>
                            <div className="user-information">
                                <select>
                                    {showNameCity()}
                                </select>
                                <select>
                                    {showDistrict()}
                                </select>
                                <select>
                                    {showArea()}
                                </select>
                            </div>
                            <div className="user-information">
                                <input placeholder="Tên đường, số nhà, toà nhà" type="text" name="address"></input>
                                <input placeholder="Ghi chú (chỉ giao giờ hành chính, giao cả tuần ...)" type="text" name="note"></input>
                            </div>
                            <div className="nav_label">
                                <span>Cài đặt</span>
                            </div>
                            <div className="setting">
                                <p>Cài đặt làm địa chỉ mặc định</p>
                                <input type="checkbox" name="scales" id="switch" onChange={(e)=>{setDefaultAddress(e.target.checked)}} />
                                <label htmlFor="switch"></label>
                            </div>
                    </div>
                    <div className="fix-bottom fix-style">
                        <div className="btn-with-icon right-icon">
                        <button  className="btn btn-primary" onClick={handleBack}>Thêm địa chỉ mới</button>
                        </div>
                    </div>
                </form>
        </div>
        </div>
    );
}

export default Newaddress;