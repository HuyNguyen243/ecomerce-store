import React, { useState } from 'react';
import Header from "../header/Header";
import { useHistory } from "react-router-dom";

function Newaddress() {
    const [checked,setChecked]=useState(false)
    const history = useHistory()

    const handleBack=()=>{
        history.push("/OderForm")
    }

    const setDefaultAddress=(value)=>{
        setChecked(value)
        console.log(checked)
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
                                    <option value="0">Tỉnh/Thành phố </option>
                                    <option value="1">Đà Nẵng </option>
                                    <option value="2">Quảng nam </option>
                                    <option value="3">Hà Nội</option>
                                </select>
                                <select>
                                    <option value="0">Quận/Huyện</option>
                                    <option value="1">Quận 1</option>
                                    <option value="1">Quận 2</option>
                                    <option value="1">Quận 3</option>
                                </select>
                                <select>
                                    <option value="0">Phường/Xã</option>
                                    <option value="1">Phường Bến Nghé</option>
                                    <option value="2">Phường Ông Lãnh</option>
                                    <option value="3">Phường Tân Định</option>
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