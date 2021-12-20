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
    const isLoading = useSelector(state => state.isLoading);

    const getUserAddress = React.useCallback(() => {
        dispatch(getDeliveryUser(userID))
    }, [dispatch, userID]);

    useEffect(() => {
        if(!userAddress.isLoaded) {
            getUserAddress()
        }
    }, [getUserAddress, userAddress]);


    const handleFixUserAddress = (e)=>{
        const DeliveryUser = userAddress.data[e.target.id]
        dispatch(getParentInformationDeviveryUser(DeliveryUser))
        history.push("/news-address")
    }

    const handleClick = ()=>{
        dispatch(getParentInformationDeviveryUser(""))
        history.push("/news-address")
    }

    const handleGetDelivery = (e)=>{
        const DeliveryUser = userAddress.data[e.target.id]
        dispatch(getParentInformationDeviveryUser(DeliveryUser))
        history.goBack()
    }
    
    const showUserAddress = (item, key)=>{
        console.log(item)
        return(
            <div className="form-group" key={key} id={key} onClick={handleGetDelivery}>
                <div className="information"  id={key}>
                    <div className="infor-user newstyle" id={key}>
                        <p id={key}>
                            {item["fullname"]}
                            { item["is_default"] === 1 && <span>[Mặc định]</span>}
                        </p>
                        <p id={key}>{item["phone"]}</p>
                        <p id={key}>{item["address"]},phường {item["ward"]["name"]},
                        quận {item["district"]["name"]}
                        , {item["province"]["name"]}
                        </p>
                    </div>
                    <div className="infor-icon newstyle" id={key}>
                        <div>
                        <img  src="/images/fix.png" alt="menu_icon" id={key} onClick={handleFixUserAddress}/>
                        <img src="/images/delete.svg" alt="menu_icon" />
                        </div>
                        <img src="/images/tickV.svg" alt="menu_icon" id={key} 
                        className={"hide"}/>
                    </div>
                </div>
            </div>
        ) 
    }

    return (
        <div >
            <Header
                hasNavigation={true}
                title="ĐỊA CHỈ GIAO HÀNG"
            />
            <div className="main_container main-relative">
                {
                    isLoading
                    ? <div className="overlay-spinner"></div>
                    : 
                        <form className="basic-form ">
                        {
                            userAddress?.data.map((item,key)=> {
                                if(item.is_default) {
                                    return showUserAddress(item, key)
                                }
                                return ''
                            })
                        }
                        {
                            userAddress?.data.map((item,key)=> {
                                if(!item.is_default) {
                                    return showUserAddress(item, key)
                                }
                                return ''
                            })
                        }
                    </form>
                }
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