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
    const putDeliveryUser = useSelector(state => state.putDeliveryUser)
    const getUserAddress = React.useCallback(() => {
        dispatch(getDeliveryUser(userID))
    }, [dispatch, userID]);

    useEffect(() => {
        if(!userAddress?.isLoaded) {
            getUserAddress()
        }else{
                if(oneDeliveryUser.length === 0){
            if(userAddress?.data.length > 0){
                for (let i = 0; i < userAddress?.data.length; i++) {
                if(userAddress?.data[i].is_default === 1){
                    dispatch(getParentInformationDeviveryUser(userAddress?.data[i]))
                }else{
                    dispatch(getParentInformationDeviveryUser(userAddress?.data[0]))
                        }
                    }
                }
            }
        }
    }, [getUserAddress,userAddress,dispatch,oneDeliveryUser]);

   
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
        const DeliveryUser = userAddress.data[e.target.id]
        dispatch(getParentInformationDeviveryUser(DeliveryUser))
       if( checkGetDeliveryUser === true){
            history.goBack()
       }
    }

    const handleDelDeliver = (e) =>{
        let getId = e.target.id
        MySwal.fire({
            text: "Bạn có đồng ý xóa thông tin địa chỉ này?",
            icon: 'info',
            confirmButtonText: 'Đồng ý',
            showCancelButton: true,
            cancelButtonText: "Huỷ bỏ"
          }).then((result)=>{
              if(result.isConfirmed){
                dispatch(deleteDeliveryUSer(getId))
              }
          })
    }

    const showUserAddress = (item, key)=>{
        if(putDeliveryUser?.isLoaded){
            if(item.is_default === 1 ){
                item.is_default = 0
            }
            if(putDeliveryUser.data._id === item._id){
                (userAddress?.data).splice((userAddress?.data).indexOf(item),1,putDeliveryUser.data)
                putDeliveryUser.isLoaded = false
            }
        }

        if(delDeliveryUser?.isLoaded){
            if(delDeliveryUser.data.data.id === item._id){
                (userAddress?.data).splice((userAddress?.data).indexOf(item),1)
            }
            if(item.is_default === 1){
                dispatch(getParentInformationDeviveryUser(""))
                putDeliveryUser.isLoaded = false
            }else{
                dispatch(getParentInformationDeviveryUser(userAddress?.data[0]))
            }
        }

        if(userAddress?.isLoaded){
            return(
                <div className="form-group" key={key} id={key} >
                    <div className="information"  id={key} >
                        <div className="infor-user newstyle" id={key} onClick={handleGetDelivery}>
                            <div className='is_default' id={key}>
                            <p id={key}>
                                {item["fullname"]} {" "}
                            </p>
                            { item["is_default"] === 1 && <span id={key}>[Mặc định]</span>}
                            </div>
                            <p id={key}>{item["phone"]}</p>
                            <p id={key}>{item["address"]},phường {item["ward"]["name"]},
                            quận {item["district"]["name"]}
                            , {item["province"]["name"]}
                            </p>
                        </div>
                        <div className="infor-icon newstyle" id={key}>
                            <div>
                                <img  src="/images/fix.png" alt="menu_icon" id={key} onClick={handleFixUserAddress}/>
                            <img src="/images/delete.svg" alt="menu_icon" id={item._id} onClick={handleDelDeliver}/>
                            </div>
                            <img src="/images/tickV.svg" alt="menu_icon" id={key} 
                            className={oneDeliveryUser._id !== undefined && oneDeliveryUser._id === item._id ? "show" : "hide"}/>
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
                title="THÔNG TIN ĐẶT HÀNG"
            />
            <div className='display-flex'>
                <div className="main_container">
                    {
                        isLoading
                        ? <div className="overlay-spinner"></div>
                        : 
                            <form className="basic-form ">
                            {(userAddress.data).length === 0 ? <span>Vui lòng tạo thông tin đặt giao hàng</span>:""}
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
                            <button type="submit" className="btn btn-primary" onClick={handleAddNewAddress}>Thêm địa chỉ mới</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default UserAddress;