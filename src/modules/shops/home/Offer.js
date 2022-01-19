import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { applyPromotion, resetPopup } from './../../../redux/actions/index';
import ModalService from './../../../_services/modal';
import { useTranslation } from "react-i18next";
import { getCodePromotion } from './../../../redux/actions/index';

function Offer(data) {
    const dispatch = useDispatch();
    const history = useHistory()
    const modalPopup = useSelector(state => state.modalPopup);
    const carts = useSelector(state => state.carts);
    const { t } = useTranslation();

    const delay = 2500;

    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }
    }
    
    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === data?.data?.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
      }, [index,data]);

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
                    description = description.replace(element,"<span style='color:red;font-weight:bold;font-size:16px;padding:0 2px'  >"+ element +"</span><br/>");
                });

                while((title =findNumber.exec(item.title)) != null){
                    arrayTitle.push(title[0])
                }
                arrayTitle.forEach(element2 => {
                    changeTitle = changeTitle.replace(element2,"<span style='color:red' class='span-element'>"+ element2 +"</span>");
                });
                
                return(
                    <div key={value} onClick={e => actionUsePromotion(item._id)} className="slide">
                        <div className="Offer-Details" >
                            <img src={item.image} alt="img" />
                            <div className="Note-Details">
                                <p className="Note-Details-titles" dangerouslySetInnerHTML={{__html: changeTitle}}></p>
                                {/* <p className="Minimum-Order">Đơn tối thiểu : <span>{item?.price}</span></p> */}
                                <p className="Product-Details" dangerouslySetInnerHTML={{__html: description}}></p>
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
            ModalService.error(t("popUpPromotion.failed"))
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

    return (
        <div className="container no-over">
            <div className="Offer-title">
                    <img src="/images/sale.png" alt="menu_icon" />
                    <p>{t("offer.title")}</p>
            </div>
            <div className="slideshow">
                <div className="slideshowSlider"  style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                        {showslide()}
                </div>
                <div className="slideshowDots">
            {data?.data?.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                        setIndex(idx);
                        }}
                ></div>
            ))}
      </div>
            </div>
        </div>
    );
}

export default Offer;