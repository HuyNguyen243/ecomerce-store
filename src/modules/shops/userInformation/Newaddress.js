import React, { useState } from 'react';
import Header from "../header/Header";
import $ from "jquery"
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { postDeliveryUser, putDeliveryUser, resetPopup } from './../../../redux/actions/index';
import { useHistory } from 'react-router';
import ModalService from './../../../_services/modal';
import { useTranslation } from "react-i18next";

function Newaddress() {
    const history = useHistory()
    const dispatch = useDispatch();
    
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const modalPopup = useSelector(state => state.modalPopup);
    const isLoading = useSelector(state => state.isLoading);
    const UNSELECTED_KEY = -1;
    const { t } = useTranslation();
    async function readLocaleData(){
        return $.getJSON( "data/local.json", function( data ) {
            return data;
        });
    }
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")

    const { register, handleSubmit, errors } = useForm();
    let emptyErrorTxt = t("newAddress.emptyErrorTxt");
    let phoneErrorTxt = t("newAddress.phoneErrorTxt");
    let addressDeliveryErrorTxt = t("newAddress.addressDeliveryErrorTxt");
    const [checked,setChecked]=useState(0)
    const[note,setNote]=useState("")
    // show list select-option
    const [cityKey, setCityKey] = useState(UNSELECTED_KEY)
    const [city, setCity] = useState([])

    const [districtKey, setDistrictKey] = useState(UNSELECTED_KEY)
    const [district, setDistricts] = useState([])

    const [wardKey, setWardKey] = useState(UNSELECTED_KEY)
    const [ward, setWard] = useState([])
    // ------
    // slect one 
    const [selectCity,setSelectCity] = useState("")
    const [selectDistrict,setSelectDistrict] = useState("")
    const [selectWard,setSelectWard] = useState("")
    // ------
    const [addressDelivery,setAddressDelivery] = useState(true)
    const defaultAddressData = React.useCallback((data) => {
                setTimeout(()=>{
                            let cityKeyCode = Number(oneDeliveryUser?.province?.code);
                            let districtKeyCode = Number(oneDeliveryUser?.district?.code);
                            let wardKeyCode = Number(oneDeliveryUser?.ward?.code);
                            
                            setCityKey(cityKeyCode)
                            setSelectCity(data[cityKeyCode]?.name)
                               
                            setDistrictKey(districtKeyCode)
                            setDistricts(data[cityKeyCode]?.districts)
                            setSelectDistrict(data[cityKeyCode]?.districts[districtKeyCode]?.name)
                            setWardKey(wardKeyCode)
                            setWard(data[cityKeyCode]?.districts[districtKeyCode]?.wards)
                            setSelectWard(wardKeyCode !== -1 ? data[cityKeyCode]?.districts[districtKeyCode]?.wards[wardKeyCode]?.name : "")
                },100)
    }, [oneDeliveryUser])

    const setDefaultAddress=(value)=>{
        let isDefault = (value === true) ? 1 : 0
        setChecked(isDefault)
    }

    const getCityKey =(e)=>{
        let key = Number(e.target.value);
        setCityKey(key)
        if(key === UNSELECTED_KEY){
            setDistricts([])
            setWard([])
        }else{
            setDistricts(city[key].districts)
            setSelectCity(city[key].name)
        }
       //---------------------------------
            if(parseInt(key) === -1){
                setSelectCity("")
            }
            if(oneDeliveryUser?.province?.code !== key){
                setSelectDistrict("")
                setSelectWard("")
                setDistrictKey(UNSELECTED_KEY)
                setWardKey(UNSELECTED_KEY)
            }
    }

    const getDistrictKey =(e) =>{
        let key = Number(e.target.value);
        setDistrictKey(key)
        if(key === UNSELECTED_KEY){
            setWard([])
            setWardKey([])
        }else{
            setWard(district[key].wards)
            setSelectDistrict(district[key].name)
        }
            if(parseInt(key) === -1){
                setSelectDistrict("")
            }
            if(oneDeliveryUser?.province?.code !== key){
                setSelectWard("")
                setWardKey(UNSELECTED_KEY)
            }
    }

    const getWardKey = (e)=>{
        let key = Number(e.target.value);
        setWardKey(key)
        setSelectWard(ward[key]?.name)
        if(parseInt(key) === -1){
            setSelectWard("")
        }
        if(oneDeliveryUser?.province?.code === -1){
            setSelectWard("")
            setWardKey(UNSELECTED_KEY)
        }
    }

    const showNameCity = () =>{
        return city.map((item,value)=>{
            return(
                <option  value={value}  id={item.id} key={value} name={item.name} >{item.name}</option>
            )
        })
    }

    const onSubmit =(data)=>{
        let ward = ""
        if(selectWard !== ""){
            ward = selectWard
        }
        if(data){
            if((data.city) === ""||  data.district === ""){
                setAddressDelivery(false)
            }else{
                setAddressDelivery(true)
                let formData = new FormData();
                formData.append('fullname',data.name)
                formData.append('phone',data.phone)
                formData.append('address',data.address)

                formData.append('province[code]',data.city)
                formData.append('province[name]',selectCity)

                formData.append('district[code]',data.district)
                formData.append('district[name]',selectDistrict)

                formData.append('ward[code]',data.ward)
                formData.append('ward[name]',ward)

                formData.append('note',note)
                formData.append('is_default',checked)
                if(oneDeliveryUser?._id){
                    dispatch(putDeliveryUser(oneDeliveryUser._id, formData))
                }else{
                    dispatch(postDeliveryUser(formData))
                }
            }
        }
    }

    const handleTargetName =(e)=>{
            setName(e.target.value)
    }

    const handleTargetAddress = (e)=>{
        setAddress(e.target.value)
    }
    const handlePhone = (e)=>{
        setPhone(e.target.value)
    }

    const handleAfterSubmit =  React.useCallback(() => {
        if(modalPopup.data.success) {
            ModalService.success(t("swal.success"))
            history.goBack()
        }else {
            ModalService.error(t("swal.failed"))
        }
        setTimeout(() => {
            dispatch(resetPopup())
        }, 1000);
    }, [modalPopup, history, dispatch ,t])

    React.useEffect(() => {
        if(city.length === 0) {
            readLocaleData()
            .then(res =>{
                setCity(res)
                if(oneDeliveryUser?._id){
                    defaultAddressData(res)
                }
            })
        }
        if(oneDeliveryUser !== ""){
                setName(oneDeliveryUser.fullname)
                setPhone(oneDeliveryUser.phone)
                setAddress(oneDeliveryUser.address)
                setChecked(oneDeliveryUser.is_default)
        }
        if(modalPopup.active) {
            handleAfterSubmit()
        }
    }, [city, setCity, oneDeliveryUser, defaultAddressData, modalPopup, handleAfterSubmit])

    return (
        <>
            {
            isLoading &&<div className="overlay-spinner"></div>
            }
                    <Header
                        hasNavigation={true}
                        title= {t("newAddress.title")}
                    />
                    <div id='list_cart_nav' className='body_wrapper'>
                        <div className='display-flex'>
                            <div className="main_container ">
                                <form className="basic-form display-flex" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                            <div className="nav_label">
                                                <span>{t("newAddress.contract")}</span>
                                            </div>
                                            <div className="user-information">
                                                <input maxLength={60} placeholder={t("newAddress.name")} type="text" name="name" ref={register({ required: true })}
                                                defaultValue={name} onChange={handleTargetName} />
                                                    { errors.name && errors.name.type === "required" ?
                                                        <span className="txt-danger">{emptyErrorTxt}</span> :""
                                                    }
                                                <input placeholder={t("newAddress.phone")}  name="phone" type="text" defaultValue={phone} onChange={handlePhone}
                                                    ref={register({
                                                        required: true,
                                                        pattern: /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
                                                    })}
                                                />
                                                    {errors.phone && errors.phone.type === "pattern" && (
                                                    <span className="txt-danger">{phoneErrorTxt}</span>
                                                    )}
                                                    {errors.phone && errors.phone.type === "required" && (
                                                    <span className="txt-danger">{emptyErrorTxt}</span>
                                                    )}
                                            </div>
                                            <div className="nav_label">
                                                <span>{t("newAddress.DeliveryAddress")}</span>
                                            </div>
                                            <div className="user-information" >
                                                <select value={cityKey} onChange={getCityKey} name="city" ref={register({ required : true })} 
                                                >
                                                    <option  value={UNSELECTED_KEY} >{t("newAddress.city")}</option>
                                                        {showNameCity()}
                                                </select>
                                                <select value={districtKey} onChange={getDistrictKey} name="district" ref={register({ required: true })}
                                                >
                                                        <option  value={UNSELECTED_KEY} >{t("newAddress.district")}</option>
                                                        { district.map((item,value)=>{
                                                            return(
                                                                <option id={item.id} key={value} value={value} name={item.name} >{item.name}</option>
                                                            )
                                                        }) }
                                                </select>
                                                <select value={wardKey} onChange={getWardKey} ref={register({ required: true })} name="ward" 
                                                > 
                                                    <option  value={UNSELECTED_KEY} >{t("newAddress.ward")}</option>
                                                            {
                                                                ward.map((item,value)=>{
                                                                    return(
                                                                        <option id={item.id} key={value} value={value} name={item.name}>{item.name}</option>
                                                                    )
                                                                })
                                                            }
                                                </select>
                                                {addressDelivery === false && (
                                                <span className="txt-danger">{addressDeliveryErrorTxt}</span>
                                                )}
                                            </div>
                                            <div className="user-information">
                                                <input maxLength={60} placeholder={t("newAddress.address")} type="text" name="address" ref={register({ required: true })} defaultValue={address}
                                                onChange={handleTargetAddress}></input>
                                                {errors.address && errors.address.type === "required" && (
                                                <span className="txt-danger">{emptyErrorTxt}</span>
                                                )}
                                                <input maxLength={60} placeholder={t("newAddress.note")} defaultValue={note} type="text" name="note" onChange={(e)=>setNote(e.target.value)}></input>
                                            </div>
                                            <div className="nav_label">
                                                <span>{t("newAddress.setting")}</span>
                                            </div>
                                            <div className="setting">
                                                <p>{t("newAddress.default")}</p>
                                                <input type="checkbox" name="scales" checked={checked} id="switch" onChange={(e)=>{setDefaultAddress(e.target.checked)}} />
                                                <label htmlFor="switch"></label>
                                            </div>
                                    </div>
                                                    <div className="fix-bottom fix-style">
                                                        <div className="btn-with-icon right-icon">
                                                        <button type="submit"  className="btn btn-primary" >{oneDeliveryUser !== "" ? t("newAddress.fixButton"): t("newAddress.newButton")}</button>
                                                    </div>
                                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
        </>
    );
}

export default Newaddress;