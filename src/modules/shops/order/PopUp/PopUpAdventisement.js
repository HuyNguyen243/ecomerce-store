import React ,{ useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyPromotion, resetPopup } from '../../../../redux/actions/index';
import ModalService from '../../../../_services/modal';
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux';
const MySwal = withReactContent(Swal)

function PopUpAdventisement(props) {

    const generalData = useSelector(state => state.generalData);
    const [advertisement,setAdevertisement]= useState("")
    const dispatch = useDispatch()
    const modalPopup = useSelector(state => state.modalPopup);
    const { t } = useTranslation();
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
              let findNumber = /\d+k/g;
              let number = []
              let find;
              let description = item.description;
              let title;
              let arrayTitle =[]
              
              let changeTitle = item.title

              while((find =findNumber.exec(item.description)) != null){
                  number.push(find[0])
              }
              number.forEach(element => {
                  description = description.replace(element,"<span style='color:red;font-weight:bold;font-size:15px;padding:0 2px'  >"+ element +"</span>");
              });

              while((title =findNumber.exec(item.title)) != null){
                  arrayTitle.push(title[0])
              }
              arrayTitle.forEach(element2 => {
                  changeTitle = changeTitle.replace(element2,"<span style='color:red'  class='span-element'>"+ element2 +"</span>");
              });
              return(
                <div className='Offer-Details' key={value} onClick={e => actionUsePromotion(item._id)}>
                    <img src={item.image} alt="logo" />
                    <div className='Note-Details'>
                        <p className='Note-Details-titles' dangerouslySetInnerHTML={{__html: changeTitle}}></p>
                        {/* <p className='Minimum-Order'>Đơn tối thiểu : <span>30.000đ</span></p> */}
                        <p className='Product-Details' dangerouslySetInnerHTML={{__html: description}}></p>
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
                          <p>{t("popUpAdventisement.title")}</p>
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

        },[advertisement,setAdevertisement,generalData,dispatch,modalPopup,t]);
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