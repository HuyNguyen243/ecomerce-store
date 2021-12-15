import React  from 'react';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content';
import { useLocation } from 'react-router';
const MySwal = withReactContent(Swal)



function TotalBottom(props) {
    const location = useLocation()
    const showPromotion =()=>{
        MySwal.fire({
            title: 'MÃ GIẢM GIÁ',
            html: <div className='promotion'> 
                        <input type='text' className='input-promotion' placeholder='Nhập mã giảm giá'/>
                        <div className='container-promotion'>
                          <div className='Offer-promotion'>
                              <img src='/images/sale2.png' alt="sale" />
                              <div className='content-promotion'>
                                  <p className='code-promotion'>CC1PLUS1</p>
                                  <p className='Minimum-Order'>MUA 1 TẶNG 1 (Đơn tối thiểu 100.000đ)</p>
                                  <p className='expiry-promotion'>Hạn sử dụng: 30/11/2021</p>
                              </div>
                          </div>
                          <div className='use-promotion'>
                            <span>Sử dụng ngay</span>
                          </div>
                        </div>
                  </div>,
            confirmButtonText: 'Áp dụng',
            showCancelButton: true,
            cancelButtonText: "Đóng"
          })
    }

    return (
        <>
            <div className="row cart-total">
            <div className={location.pathname === "/cart" || location.pathname === "/product-shipping" ? "row hide" : "row"}>  
                <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
                <div className="col-6 text-bold txt-right">
                    <input type="text" name="code"   placeholder="Nhập mã giảm giá" className={"btn-discount"} onClick={showPromotion}  />
                </div>
            </div>  
            <div className={location.pathname === "/oderInformation"|| location.pathname === "/OderForm"||location.pathname === "/cart" ? "row hide" : "row"}>
                <div className="col-6  text-sm ">Tổng tiền hàng:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">{1}</span>
                </div>
                <div className="col-6  text-sm">Phí vận chuyển:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">1</span>
                </div>
                <div className="col-6  text-sm">Mã giảm giá</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm">1</span>
                </div>
            </div>
            <div className={location.pathname === "/oderInformation"|| location.pathname === "/OderForm" ? "row hide" : "row"}>
                <div className="col-6 text-bold text-sm new-text">Tổng cộng:</div>
                <div className="col-6 text-bold txt-right">
                    <span className="text-nm new-text">{props.totalPrice}</span>
                </div>
            </div>   
            </div> 
     </>
    );
}

export default TotalBottom;