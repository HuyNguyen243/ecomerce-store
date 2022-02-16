import React, { useEffect } from 'react';
import Header from "../header/Header";
import { useSelector, useDispatch } from "react-redux";
import { getDeliveryUser } from './../../../redux/actions/index';
import Auth from '../../../_services/auth';
import { useHistory } from 'react-router';
import { getParentInformationDeviveryUser } from './../../../redux/actions/index';
import { deleteDeliveryUSer } from './../../../redux/actions/index';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from "react-i18next";

function UserAddress() {
    const MySwal = withReactContent(Swal)
    const history = useHistory()
    const dispatch = useDispatch();
    const userID = Auth.get().user_id
    const userAddress = useSelector(state => state.userAddress);
    const isLoading = useSelector(state => state.isLoading);
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const checkGetDeliveryUser = useSelector(state => state.checkGetDeliveryUser);
    const delDeliveryUser = useSelector(state => state.delDeliveryUser)
    const getUserAddress = React.useCallback(() => {
        dispatch(getDeliveryUser(userID))
    }, [dispatch, userID]);
    const { t } = useTranslation();
    
    useEffect(() => {
        if(!userAddress?.isLoaded) {
            getUserAddress()
        }else{
            if(oneDeliveryUser?.length === 0){
                if(userAddress?.data.length > 0){
                    for (let i = 0; i < userAddress?.data.length; i++) {
                    if(userAddress?.data[i].is_default === 1){
                        dispatch(getParentInformationDeviveryUser(userAddress?.data[i]))
                    }else{
                        dispatch(getParentInformationDeviveryUser(userAddress?.data[0]))
                            }
                        }
                    }
            }else{
                    if(delDeliveryUser?.isLoaded){
                        if(userAddress?.data.length > 0){
                            for (let i = 0; i < userAddress?.data.length; i++) {
                                dispatch(getParentInformationDeviveryUser(userAddress?.data[0]))
                                delDeliveryUser.isLoaded = false
                            }
                        }
                    }
            }
        }
    }, [getUserAddress,userAddress,dispatch,oneDeliveryUser,delDeliveryUser]);

    const handleFixUserAddress = (e)=>{
        const DeliveryUser = userAddress.data[e.target.id]
        dispatch(getParentInformationDeviveryUser(DeliveryUser))
        history.push("/news-address")
    }

    const handleAddNewAddress = ()=>{
        dispatch(getParentInformationDeviveryUser(""))
        history.push("/news-address")
    }

    const handleGetDelivery = (e)=>{
        const DeliveryUser = userAddress?.data[e.target.id]
        dispatch(getParentInformationDeviveryUser(DeliveryUser))
       if( checkGetDeliveryUser === true){
            history.goBack()
       }
    }

    const handleConfirm=(e)=>{
        let name = e.target.className
        if(name === "cancelBtn"){
          MySwal.close()
        }else{
          MySwal.clickConfirm()
        }
      }

    const handleDelDeliver = (e) =>{
        let getId = e.target.id
        MySwal.fire({
            icon: 'info',
            showCancelButton: false,
            showConfirmButton: false,
            html : <div className="swal_deleteProduct">
                    <div>
                      <p className="text-title">{t("userAddress.deleteAdress")}</p>
                    </div>
                    <div className="group-btn">
                      <button className="cancelBtn" onClick={handleConfirm}>{t("cart.CancelDeleteProduct")}</button>
                      <button className="confirmBtn" onClick={handleConfirm}>{t("cart.SubmitButton")}</button>
                    </div>
                  </div>
          }).then((result)=>{
            if(result.isConfirmed){
              dispatch(deleteDeliveryUSer(getId))
            }
        })
    }

    const showUserAddress = (item, key)=>{
        if(userAddress?.isLoaded){
            return(
                <div className="form-group" key={key} id={key} >
                    <div className="information"  id={key} >
                        <div className="infor-user newstyle" id={key} onClick={handleGetDelivery}>
                            <div className='is_default' id={key}>
                            <p id={key}>
                                {item["fullname"]} {" "}
                            </p>
                            { item["is_default"] === 1 && <span id={key}>{t("userAddress.default")}</span>}
                            </div>
                            <p id={key}>{item["phone"]}</p>
                            <p id={key}> {item?.address}
                            {parseInt(item?.ward.code) === -1 ? "" : `,${item?.ward?.name}`},{item?.district?.name},{item?.province?.name}
                            </p>
                        </div>
                        <div className="infor-icon newstyle" id={key}>
                            <div>
                                <img  src="/images/fix.png" alt="menu_icon" id={key} onClick={handleFixUserAddress}/>
                            <img src="/images/delete.svg" alt="menu_icon" id={item._id} onClick={handleDelDeliver}/>
                            </div>
                            <img src="/images/tickV.svg" alt="menu_icon" id={key} 
                            className={oneDeliveryUser?._id !== undefined && oneDeliveryUser?._id === item._id ? "show" : "hide"}/>
                        </div>
                    </div>
                </div>
            ) 
        }
    }

    return (
        <div id='list_cart_nav' className='body_wrapper'>
            <Header
                hasNavigation={true}
                title= {t("userAddress.title")}
            />
            <div className='display-flex'>
                <div className="main_container">
                    {
                        isLoading
                        ? <div className="overlay-spinner"></div>
                        : 
                            <form className="basic-form ">
                            {(userAddress.data).length === 0 ? <span>{t("userAddress.error")}</span>:""}
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
                <div className="fix-bottom ">
                        <div className="btn-with-icon right-icon">
                            <button type="submit" className="btn btn-primary" onClick={handleAddNewAddress}>{t("newAddress.newButton")}</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default UserAddress;