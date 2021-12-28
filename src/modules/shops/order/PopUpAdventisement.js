import React ,{ useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyPromotion, resetPopup } from './../../../redux/actions/index';
import ModalService from './../../../_services/modal';

import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux';
const MySwal = withReactContent(Swal)

function PopUpAdventisement(props) {

    const generalData = useSelector(state => state.generalData);
    const [advertisement,setAdevertisement]= useState("")
    const dispatch = useDispatch()
    const modalPopup = useSelector(state => state.modalPopup);

    React.useEffect(()=>{
        if(generalData?.data.banners?.length > 0){
          setAdevertisement(generalData.data.banners)
        }
        
      },[setAdevertisement,generalData.data.banners,])

   
    
      useEffect(() => {

        const actionUsePromotion = (id) => {
          let formData = new FormData();
          formData.append('promo_id', id)
          dispatch(applyPromotion(formData))
      }

        const listSwal = () =>{
          if(advertisement!==""){
            return advertisement.map((item,value)=>{
              return(
                <div className='Offer-Details' key={value} onClick={e => actionUsePromotion(item._id)}>
                    <img src={item.image} alt="logo" />
                    <div className='Note-Details'>
                        <p className='Note-Details-titles'>{item.title}</p>
                        {/* <p className='Minimum-Order'>Đơn tối thiểu : <span>30.000đ</span></p> */}
                        <p className='Product-Details'>{item.description}</p>
                        <img src='/images/Group227.svg' alt='menu_icon' />
                    </div>
                </div>
              )
            })
          }
        }
      
          if(generalData.isLoaded && !modalPopup?.active){
            MySwal.fire({
              showCloseButton: true,
              showConfirmButton :false,
              html:  <div className='Offer-Shock'>
                        <div className='Offer-title'> 
                          <img src='/images/sale.png' alt='menu_icon' />
                          <p>Bạn ơi bạn có quên ưu đãi này?</p>
                        </div>
                        <div className='container'>
                          {listSwal()}
                        </div>
                      </div>
              ,
            }).then((result)=>{
              if(result.isDismissed){
                if(generalData.isLoaded ){
                    generalData.isLoaded = false
                }
              }
            })
          }

        },[advertisement,setAdevertisement,generalData,dispatch,modalPopup]);
        const handleAfterSubmit =  React.useCallback(() => {
            if(modalPopup.data.success) {
                ModalService.success(modalPopup?.data?.message)
                generalData.isLoaded = false
            }else {
                ModalService.error(modalPopup?.data?.message)
            }
            setTimeout(() => {
                dispatch(resetPopup())
            }, 1000);
        }, [modalPopup, dispatch,generalData])
        React.useEffect(() => {
            if(modalPopup.active) {
                handleAfterSubmit()
            }
        }, [modalPopup, handleAfterSubmit])

}

export default PopUpAdventisement;