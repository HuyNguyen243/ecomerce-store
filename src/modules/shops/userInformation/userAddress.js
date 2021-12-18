import React, { useState ,useEffect } from 'react';
import Header from "../header/Header";
import { useSelector, useDispatch } from "react-redux";
import { getDeliveryUser } from './../../../redux/actions/index';
import Auth from '../../../_services/auth';
import { useHistory } from 'react-router';
import { getParentInformationDeviveryUser } from './../../../redux/actions/index';

function UserAddress() {
    const history = useHistory()
    const dispatch = useDispatch();
    const userID = Auth.get().user_id
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

    const handleFixUserAddress = (e)=>{
        const DeliveryUser = userAddress.data[e.target.id]
        dispatch(getParentInformationDeviveryUser(DeliveryUser))
        history.push("/news-address")
    }

    const handleClick = ()=>{
        dispatch(getParentInformationDeviveryUser(""))
        history.push("/news-address")
    }
    
    const showUserAddress = ()=>{
        const userData = userAddress.data
        return Object.keys(userData).map((item,value)=>{
            return(
                <div className="form-group" key={value}>
                    <div className="information" onClick={handleGetId} id={value}>
                        <div className="infor-user newstyle" id={value}>
                            <p id={value}>{userData[item]["fullname"]}<span></span></p>
                            <p id={value}>{userData[item]["phone"]}</p>
                            <p id={value}>{userData[item]["address"]},phường {userData[item]["ward"]["name"]},
                            quận {userData[item]["district"]["name"]}
                            , {userData[item]["province"]["name"]}
                            </p>
                        </div>
                        <div className="infor-icon newstyle" id={value}>
                            <img  src="/images/fix.svg" alt="menu_icon" id={value} onClick={handleFixUserAddress}/>
                            <img src="/images/tickV.svg" alt="menu_icon" id={value} 
                            className={Number(id) === value ? "show" : "hide" }/>
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
                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Thêm địa chỉ mới</button>
                        </div>
            </div>
        </div>
    );
}

export default UserAddress;