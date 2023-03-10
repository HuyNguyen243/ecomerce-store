import React ,{ useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyPromotion, resetPopup } from '../../../../redux/actions/index';
import ModalService from '../../../../_services/modal';
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux';
import { getCodePromotion } from '../../../../redux/actions/index';
import { getShowPopup } from '../../../../redux/actions/index';
const MySwal = withReactContent(Swal)

function PopUpAdventisement(props) {
    const generalData = useSelector(state => state.generalData);
    const [advertisement,setAdevertisement]= useState("")
    const dispatch = useDispatch()
    const modalPopup = useSelector(state => state.modalPopup);
    const showPopUpAdventisement = useSelector(state => state.showPopUpAdventisement);
    const { t } = useTranslation();

    React.useEffect(()=>{
        if(showPopUpAdventisement === "" && !modalPopup.active && generalData?.data?.banners?.length > 0){
          dispatch(getShowPopup(true))
        }
        if(generalData?.data.banners?.length > 0){
          setAdevertisement(generalData.data.banners)
        }
      },[setAdevertisement,generalData.data.banners,dispatch,showPopUpAdventisement,modalPopup])

      useEffect(() => {
        const actionUsePromotion = (id) => {
          let formData = new FormData();
          formData.append('promo_id', id)
          dispatch(applyPromotion(formData))
          dispatch(getCodePromotion(id))
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
                        {/* <p className='Minimum-Order'>????n t???i thi???u : <span>30.000??</span></p> */}
                        <p className='Product-Details' dangerouslySetInnerHTML={{__html: description}}></p>
                        <img src='/images/Group227.svg' alt='menu_icon' />
                    </div>
                </div>
              )
            })
          }
        }
          if(showPopUpAdventisement && !modalPopup.active){
            MySwal.fire({
              showCloseButton: true,
              showCancelButton: false,
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
                dispatch(getShowPopup(false))
              }
            })
          }

        },[advertisement,setAdevertisement,generalData,dispatch,modalPopup,t,showPopUpAdventisement]);
        const handleAfterSubmit =  React.useCallback(() => {
            if(modalPopup.data.success) {
                ModalService.success(t("popUpPromotion.success"))
                dispatch(getShowPopup(false))
            }else {
                if(modalPopup.data?.data?.error) {
                  ModalService.error(t(modalPopup.data?.data?.error))
              }else {
                   ModalService.error(t("popUpPromotion.failed"))
              }
            }
            setTimeout(() => {
                dispatch(resetPopup())
            }, 1000);
        }, [modalPopup, dispatch,t])
        React.useEffect(() => {
            if(modalPopup.active) {
                handleAfterSubmit()
            }
        }, [modalPopup, handleAfterSubmit])

}

export default PopUpAdventisement;