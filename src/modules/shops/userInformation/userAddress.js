import React, { useState ,useEffect } from 'react';
import Header from "../header/Header";
import{Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getDeliveryUser } from './../../../redux/actions/index';

function UserAddress() {

    const dispatch = useDispatch();
    const userID = sessionStorage.getItem("user_id")
    const userAddress = useSelector(state => state.userAddress);
    const getUserAddress = React.useCallback(() => {
        dispatch(getDeliveryUser(userID))
    }, [dispatch, userID]);
    useEffect(() => {
            getUserAddress()
      }, [getUserAddress,]);

    const[id,setid]=useState("")
    const handleGetId=(e)=>{
        setid(e.target.id)
    } 
    
    const showUserAddress = ()=>{
        const userData = userAddress.data
        return Object.keys(userData).map((item,value)=>{
            return(
                <div className="form-group" key={value}>
                    <div className="information" onClick={handleGetId} id={userData[item]["_id"]}>
                        <div className="infor-user newstyle" id={userData[item]["_id"]}>
                            <p id={userData[item]["_id"]}>{userData[item]["fullname"]}<span></span></p>
                            <p id={userData[item]["_id"]}>{userData[item]["phone"]}</p>
                            <p id={userData[item]["_id"]}>{userData[item]["address"]},phường {userData[item]["ward"]["name"]},
                            quận {userData[item]["district"]["name"]}
                            , {userData[item]["province"]["name"]}
                            </p>
                        </div>
                        <div className="infor-icon newstyle" id={userData[item]["_id"]}>
                            <Link to="/news-address"><img src="/images/fix.svg" alt="menu_icon" /></Link>
                            <img src="/images/tickV.svg" alt="menu_icon" id={userData[item]["_id"]} 
                            className={id === userData[item]["_id"] ? "show" : "hide" }/>
                        </div>
                    </div>
                </div>
            ) 
        })
    }

    return (
        <div >
            <Header
                hasNavigation={true}
                title="ĐỊA CHỈ GIAO HÀNG"
            />
            <div className="main_container main-relative">
                <form className="basic-form ">
                        {showUserAddress()}
                </form>
            </div>
            <div className="fix-bottom fixed">
                        <div className="btn-with-icon right-icon">
                            <Link to="/news-address"><button type="submit" className="btn btn-primary">Thêm địa chỉ mới</button></Link>
                            {/* <Icon name="east" /> */}
                        </div>
            </div>
        </div>
    );
}

export default UserAddress;