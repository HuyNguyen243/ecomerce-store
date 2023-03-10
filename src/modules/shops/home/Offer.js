import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { applyPromotion, resetPopup } from './../../../redux/actions/index';
import ModalService from './../../../_services/modal';
import { useTranslation } from "react-i18next";
import { getCodePromotion } from './../../../redux/actions/index';
import Slider from "react-slick";

function Offer(data) {
    const dispatch = useDispatch();
    const history = useHistory()
    const modalPopup = useSelector(state => state.modalPopup);
    const carts = useSelector(state => state.carts);
    const { t } = useTranslation();

    const actionUsePromotion = (id) => {
        if(carts.length > 0){
            let formData = new FormData();
            formData.append('promo_id', id)
            dispatch(applyPromotion(formData))
            dispatch(getCodePromotion(id))
        }else{
            ModalService.error(t("error.errorCart"))
            setTimeout(() => {
                dispatch(resetPopup())
            }, 1000);
        }
    }

    const showslide =() =>{
        if(data.data!== undefined){
            return data.data.map((item,value)=>{
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
                    description = description.replace(element,"<span style='color:red;font-weight:bold;font-size:14px;padding:0 2px'  >"+ element +"</span>");
                });

                while((title =findNumber.exec(item.title)) != null){
                    arrayTitle.push(title[0])
                }
                arrayTitle.forEach(element2 => {
                    changeTitle = changeTitle.replace(element2,"<span style='color:red' class='span-element'>"+ element2 +"</span>");
                });

                return(
                    <div key={value} onClick={e => actionUsePromotion(item._id)} >
                        <div className="Offer-Details" >
                            <img src={item.image} alt="img" />
                            <div className="Note-Details">
                                <p className="Note-Details-titles" dangerouslySetInnerHTML={{__html: changeTitle}}></p>
                                {/* <p className="Minimum-Order">????n t???i thi???u : <span>{item?.price}</span></p> */}
                                <p className="Product-Details " dangerouslySetInnerHTML={{__html: description}}></p>
                                <img src="/images/Group227.svg" alt="menu_icon" />
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    const handleAfterSubmit =  React.useCallback(() => {
        if(modalPopup.data.success) {
            ModalService.success(t("popUpPromotion.success"))
            history.push('/order-infomation')
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
    }, [modalPopup, history, dispatch ,t])

    React.useEffect(() => {
        if(modalPopup.active) {
            handleAfterSubmit()
        }
    }, [modalPopup, handleAfterSubmit])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
      };

    return (
        <div className="container no-over">
            {data?.data?.length > 0 && 
            <>
                    <div className="Offer-title">
                        <img src="/images/sale.png" alt="menu_icon" />
                        <p>{t("offer.title")}</p>
                    </div>
                    <Slider {...settings}>
                            {showslide()}
                    </Slider>
            </>
        }
      
        </div>
    );
}

export default Offer;