import React, { useState } from 'react';
import Header from "../header/Header";
import { useHistory } from "react-router-dom";
import $ from "jquery"
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { postDeliveryUser } from './../../../redux/actions/index';
import { putDeliveryUser } from './../../../redux/actions/index';

function Newaddress() {
    const dispatch = useDispatch();
    const oneDeliveryUser = useSelector(state => state.oneDeliveryUser);
    const history = useHistory()
    async function readData(){
        return $.getJSON( "data/local.json", function( data ) {
            return data;
           });
    }
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")

    const { register, handleSubmit, errors } = useForm();
    let emptyErrorTxt = 'Vui lòng điền thông tin';
    let phoneErrorTxt = 'Số điện thoại không hợp lệ';
    let addressDeliveryErrorTxt = 'vui lòng chọn địa chỉ giao hàng';
  
    const [checked,setChecked]=useState(0)
    const[note,setNote]=useState("")
    // show list select-option
    const [city, setCity] = useState([])
    const [district, setDistricts] = useState([])
    const [ward, setWard] = useState([])
    // ------
    // slect one 
    const [selectCity,setSelectCity] = useState("")
    const [selectDistrict,setSelectDistrict] = useState("")
    const [selectWard,setSelectWard] = useState("")
    // ------
    const [addressDelivery,setAddressDelivery] = useState(true)

    React.useEffect(() => {
        readData()
        .then(res =>{
            setCity(res)
        })
        if(oneDeliveryUser.data !== ""){
            setName(oneDeliveryUser.fullname)
            setPhone(oneDeliveryUser.phone)
            setAddress(oneDeliveryUser.address)
            setDefaultAddress(oneDeliveryUser.is_default)
        }
    }, [setCity,oneDeliveryUser])
 
    const setDefaultAddress=(value)=>{
        if(value === true){
            setChecked(1)
        }else{
            setChecked(0)
        }
    }
    console.log(oneDeliveryUser)

    const getCityKey =(e)=>{
        let key = Number(e.target.value);
        if(key === 9999){
            setDistricts([])
            setWard([])
        }else{
            setDistricts(city[key].districts)
            setSelectCity(city[key].name)
        }
    }

    const getDistrictKey =(e) =>{
        let key = Number(e.target.value);
        if(key === 9999){
            setWard([])
        }else{
            setWard(district[key].wards)
            setSelectDistrict(district[key].name)
        }
    }

    const getWardKey = (e)=>{
        let key = Number(e.target.value);
        setSelectWard(ward[key].name)
    }

    const showNameCity = () =>{
        return city.map((item,value)=>{
            return(
                <option  value={value}  id={item.id} key={value} name={item.name} >{item.name}</option>
            )
        })
    }
    

    const onSubmit =(data)=>{
       if(data){
           if((data.city) === "9999"||  data.district === "9999"){
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
                formData.append('ward[name]',selectWard)
                formData.append('note',note)
                formData.append('is_default',checked)

                if(oneDeliveryUser !== ""){
                    dispatch(putDeliveryUser(oneDeliveryUser._id,formData))
                }else{
                    dispatch(postDeliveryUser(formData))
                }

                    // history.goBack()
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

    return (
        <div >
            <Header
                hasNavigation={true}
                title="THÊM ĐỊA CHỈ GIAO HÀNG MỚI"
            />
            <div className="main_container ">
                <form className="basic-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                            <div className="nav_label">
                                <span>Thông tin liên hệ</span>
                            </div>
                            <div className="user-information">
                                <input placeholder="Họ và tên" type="text" name="name" ref={register({ required: true })}
                                defaultValue={name} onChange={handleTargetName} />
                                    { errors.name && errors.name.type === "required" ?
                                        <span className="txt-danger">{emptyErrorTxt}</span> :""
                                    }
                                <input placeholder="Số điện thoại" type="number" name="phone" defaultValue={phone} onChange={handlePhone}
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
                                <span>Địa chỉ giao hàng</span>
                            </div>
                            <div className="user-information" >
                                <select onChange={getCityKey} name="city" ref={register({ required: true })} 
                                >
                                    <option  value={9999} >Tỉnh/Thành phố</option>
                                        {showNameCity()}
                                </select>
                                <select onChange={getDistrictKey} name="district" ref={register({ required: true })}
                                >
                                        <option  value={9999} >Quận/Huyện</option>
                                        { district.map((item,value)=>{
                                            return(
                                                <option id={item.id} key={value} value={value} name={item.name} >{item.name}</option>
                                            )
                                        }) }
                                </select>
                                <select onChange={getWardKey} ref={register({ required: true })} name="ward" 
                                > 
                                    <option  value={9999} >Phường/Xã</option>
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
                                <input placeholder="Tên đường, số nhà, toà nhà" type="text" name="address" ref={register({ required: true })} defaultValue={address}
                                onChange={handleTargetAddress}></input>
                                  {errors.address && errors.address.type === "required" && (
                                <span className="txt-danger">{emptyErrorTxt}</span>
                                )}
                                <input placeholder="Ghi chú (chỉ giao giờ hành chính, giao cả tuần ...)" defaultValue={note} type="text" name="note" onChange={(e)=>setNote(e.target.value)}></input>
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
                                <button type="submit"  className="btn btn-primary" >{oneDeliveryUser!=="" ? "Thay đổi địa chỉ":"Thêm địa chỉ mới"}</button>
                                </div>
                            </div>
                </form>
               
        </div>
        </div>
    );
}

export default Newaddress;