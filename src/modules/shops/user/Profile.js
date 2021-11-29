import React, { useEffect, useContext, useState} from 'react';
import {PROFILE_NAV} from './../../../_config/shop.config';
import Header from "../header/Header";
import Loader from "./../../../_components/_loader.component";
import { ShopContext } from "./../../../contexts/ShopContext";
import Icon from "./../../../_components/_icon.component";
import { useForm } from "react-hook-form";
import SnackbarHelper from './../../../_helpers/snackbar';

const Profile = ({hideNavigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const { getUserInfo, submitUserInfo } = useContext(ShopContext);
    const [ isProcessing, setIsProcessing ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);

    useEffect(() => {
        document.addEventListener(`open_navigation_${PROFILE_NAV}`, function(e) {
            getInfo()
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { register, handleSubmit, errors } = useForm({});

    const doEdit = () => {
        let edit = !isEditing;
        setIsEditing(edit)
    }

    async function getInfo() {
        setIsLoading(true)
        let response = await getUserInfo();
        if (response) {
            setIsLoading(false)
            setUser(response.data)
        }
    }

    async function updateProfile (data) {
        if(isProcessing) {return}
        setIsProcessing(true)
        let formData = new FormData();
        formData.append('fullname', data.fullname)
        formData.append('phone', data.phone)
        formData.append('address', data.address)
        let response = await submitUserInfo(formData);
        if (response) {
            setIsProcessing(false)
            SnackbarHelper.show('Cập nhật thông tin thành công')
            setIsEditing(false)
        }else {
            SnackbarHelper.show('Cập nhật thông tin thất bại')
            setIsEditing(false)
        }
    }
    
    return (
        <div id={PROFILE_NAV} className="overlay nav-right">
          <Header
            hasNavigation={true}
            doNavigation={hideNavigation}
            navId={PROFILE_NAV}
            title="Cá nhân"
          />
          <div className="main_container">
              {isLoading 
              ? 
                <Loader /> 
              :
                <div className={`user_wrapper ${ isEditing ? 'is-editing' : ''}`}>
                    <span onClick={e => doEdit()} className="edit"><Icon name="edit"/></span>
                    <form onSubmit={handleSubmit(updateProfile)}>
                        <div className="user-info">
                            <div className="info-top flex-list">
                                <img className="avatar" src={user.avatar} alt={user.username} />
                                <div className="username">
                                    <input type="text" name="fullname" className="app-input" ref={register({ required: true })} defaultValue={user.username}/>
                                    {errors.fullname && (
                                        <p className="txt-danger">Trường này không được để trống</p>
                                    )}
                                </div>
                            </div>
                            <div className="info-bot flex-list flex-space">
                                <label className="left flex-list"><Icon name="phone"/>&nbsp;Số điện thoại</label>
                                <div className="right">
                                    <input type="text" name="phone" className="app-input" 
                                        defaultValue={user.phone}
                                        ref={register({
                                            required: true,
                                            pattern: /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
                                        })}
                                    />
                                    {errors.phone && errors.phone.type === "required" && (
                                        <span className="txt-danger">Trường này không được để trống</span>
                                    )}
                                    {errors.phone && errors.phone.type === "pattern" && (
                                        <span className="txt-danger">Số điện thoại không hợp lệ</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="user-addresses flex-space">
                            <label className="left flex-list"><Icon name="location_on"/>&nbsp;Địa chỉ</label>
                            <div className="right">
                                <textarea type="text" name="address" className="app-textarea" ref={register({ required: true })} defaultValue={user.address}></textarea>
                                {errors.address && (
                                    <p className="txt-danger">Trường này là bắt buộc</p>
                                )}
                            </div>
                        </div>
                        <button type="submit" className={`btn btn-update ${ isProcessing ? 'btn-loader' : ''}`}>Cập nhật</button>
                    </form>
                </div>
              }
              </div>
        </div>
    )
}

export default Profile;