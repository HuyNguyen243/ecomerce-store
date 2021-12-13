import React, { useEffect }  from "react";
import CartItem from "../cart/CartItem";
import Header from "../header/Header";
import { ORDER_FORM_NAV } from "./../../../_config/shop.config";
import Swal from "sweetalert2"
import { useHistory, useLocation } from "react-router";
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const OderConfirm = ( 
  hideNavigation
  )=>{
  const showCart=()=>{
    const getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))
    if(getlocal.length >0){
        return getlocal.map((item,value)=>{
            return(
                <CartItem item={item} key={value}/>
            )
        })
    }
  }
  const location = useLocation()
  const history = useHistory()
  useEffect(()=>{
  if(location.pathname === "/oderConfirm"){
    MySwal.fire({
      showCloseButton: true,
      showConfirmButton :false,
      html:       <div className='Offer-Shock'>
                    <div className='Offer-title'>
                      <img src='/images/sale.png' alt='menu_icon' />
                      <p>Bạn ơi bạn có quên ưu đãi này?</p>                    
                    </div>
                    <div className='container swal_sm'>
                        <div className='Offer-Details'>
                            <img src='/images/lg-coca.png'  />
                            <div className='Note-Details'>
                                <p className='Note-Details-titles'>THÙNG 24 LON COCA</p>
                                <p className='Minimum-Order'>Đơn tối thiểu : <span>30.000đ</span></p>
                                <p className='Product-Details'>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet </p>
                            </div>
                        </div>
                    </div>
                  </div>,
    })
  }
  })

const showheader =()=>{
  if(location.pathname === "/oderConfirm"){
    return(
      <Header
      hasNavigation={true}
      navId={ORDER_FORM_NAV}
      title="ĐẶT HÀNG"
      />
    )
  }
}

const handleSubmit = ()=>{
  Swal.fire({
    title: 'XÁC NHẬN ĐẶT HÀNG',
    text: "Bạn có đồng ý đặt đơn hàng này?!",
    icon: 'info',
    confirmButtonText: 'Đồng ý',
    showCancelButton: true,
    cancelButtonText: "Huỷ bỏ"
  }).then((result) => {
    if (result.isConfirmed) {
      MySwal.fire({
        showConfirmButton : false,
        html :  <div class='confirm-swal'>
                  <img src='/images/thank-you.png' alt='menu_icon' />
                  <h3>ĐẶT HÀNG THÀNH CÔNG</h3>
                  <p>Cám ơn anh A đã đặt hàng. Coca sẽ giao hàng đến bạn trong thời gian sớm nhất.</p>
                </div>
      })
      history.replace("/order-product")
    }
  })
}

const showPromotion=()=>{
  MySwal.fire({
    title: 'MÃ GIẢM GIÁ',
    html: <div class='promotion'> 
                <input type='text' class='input-promotion' placeholder='Nhập mã giảm giá'/>
                <div class='container-promotion'>
                  <div class='Offer-promotion'>
                      <img src='/images/sale2.png'  />
                      <div class='content-promotion'>
                          <p class='code-promotion'>CC1PLUS1</p>
                          <p class='Minimum-Order'>MUA 1 TẶNG 1 (Đơn tối thiểu 100.000đ)</p>
                          <p class='expiry-promotion'>Hạn sử dụng: 30/11/2021</p>
                      </div>
                  </div>
                  <div class='use-promotion'>
                    <span>Sử dụng ngay</span>
                  </div>
                </div>
          </div>,
    confirmButtonText: 'Áp dụng',
    showCancelButton: true,
    cancelButtonText: "Đóng"
  })
}

  return(
    <div className="body_wrapper ">
      {showheader()}
     
      <div className="main_container">
        <div className="nav_label">
          <span>Thông tin nhận hàng</span>
        </div>
        <div className="user_info">
        <div className="name_number">
          <p>Nguyen Van A</p>
          <span>|</span>
          <p>(+84) 905459483</p>
        </div>
          <p className="address">117 Nguyễn Đình Chính, phường 5, quận Phú Nhuận, Hồ Chí Minh</p>
          <span>Giao hàng hỏa tốc</span>
          <span> Dự kiến giao hàng trước 20h00 ngày 15/11/2021</span>
        </div>
        <form className="basic-form" >
         <div className="form-group">
             <div className="shipping">
             <span className="shiper" >Giao hàng tiết kiệm 1</span>
             </div>
         </div>
        </form>
        <div className="news-style-cart ">
        {showCart()}
        </div>
      </div>
      <div className="fix-bottom">
       <div className="divider"></div>
       <div className="row cart-total">
         <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
         <div className="col-6 text-bold txt-right">
          <input type="text" name="code"   placeholder="Nhập mã giảm giá" className={"btn-discount"} onClick={showPromotion}  />
         </div>
         <div className="col-6  text-sm">Tổng tiền hàng:</div>
         <div className="col-6 text-bold txt-right">
           <span className="text-nm">1</span>
         </div>
         <div className="col-6  text-sm">Phí vận chuyển:</div>
         <div className="col-6 text-bold txt-right">
           <span className="text-nm">1</span>
         </div>
         <div className="col-6  text-sm">Mã giảm giá</div>
         <div className="col-6 text-bold txt-right">
           <span className="text-nm">1</span>
         </div>
         <div className="col-6 text-bold text-sm new-text">Tổng cộng:</div>
         <div className="col-6 text-bold txt-right">
           <span className="text-nm new-text">1</span>
         </div>
       </div>
       <div className="btn-with-icon right-icon">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Xác nhân đặt hàng</button>
      </div>
     </div>
    </div>
  )
}
export default OderConfirm

// const OrderConfirm = ({
//   createOrder,
//   userInfo,
//   orderProducts,
//   isProcessing,
//   setStep,
//   prevStep,
//   promotion = {
//     priceReduce: 0,
//     priceAfterPromotion: 0,
//   },
//   hasDefaultPromotion = false
// }) => {
//   // let listItems;
//   // let sumPrice = 0;

//   // const promotionTmp = CartHelper.getPromotion();
//   // if (promotionTmp !== null && !hasDefaultPromotion) {
//   //   promotion = promotionTmp;
//   // }

//   // const priceFormat = (price) => {
//   //   return NumberHelper.formatCurrency(price);
//   // };

//   // const goBack = (step) => {
//   //   setStep(step);
//   // };

// const showProduct =()=>{
//   let getlocal = JSON.parse(localStorage.getItem("order_6149b1a9c941488634c963cf_4954465131233429"))

//   if (getlocal.length > 0) {
//     return getlocal.map((item, index) => {
//       let price =
//         item.couponPrice > 0 ? item.couponPrice : item.pricePerProduct;
//       // sumPrice += item.quantity * price;
//       return (
//         <div key={index}>
//           <div className="shop-item cart">
//             <ImageDisplay src={item.image} alt={item.name} />
//             <div className="item-info">
//               <span className="item-name">{item.name}</span>
//             <div className="news-style-QTY">
//               <PriceDisplay
//                 // coupon={item.couponPrice}
//                 price={item.pricePerProduct}
//               />
//               {/* <span>Số lượng: {item.quantity}</span> */}
//               <div className="col-7 item-quantity flex-list">
//             <div className="flex-list quantity-options">
//               <span
//                 className="quantiy-action quantity-minus"
//                 // onClick={() => updateCartQuantity(index, item.quantity - 1)}
//               >
//                 <img src="/images/add-.svg" alt="menu_icon" className="add" />

//               </span>
//               <span className="qty-span">{item.quantity}</span>
//               <span
//                 className="quantiy-action quantity-add"
//                 // onClick={() => updateCartQuantity(index, item.quantity + 1)}
//               >
//                 <img src="/images/add+.svg" alt="menu_icon" className="add" />
//               </span>
//             </div>
//             <div
//               className="col-2"
//               onClick={() => {
//                 // removeCartItem(index);
//               }}
//             >
//               <img src="/images/delete.svg" alt="menu_icon" className="delete" />
//             </div>
//             </div>

//           </div>
//             </div>
//           </div>
//         </div>
//       );
//     });
//   }
// }

//   // const priceUsePromotion = (
//   //   <div>
//   //     <div className="divider"></div>
//   //     <div className="row cart-total">
//   //       <div className="col-6 text-bold text-sm">Giảm:</div>
//   //       <div className="col-6 text-bold txt-info txt-right">
//   //         <span className="text-sm txt-danger">{priceFormat(-parseInt(promotion.priceReduce))}</span>
//   //       </div>
//   //     </div>
//   //     <div className="row cart-total">
//   //       <div className="col-6 text-bold text-sm">Tổng cộng:</div>
//   //       <div className="col-6 text-bold txt-info txt-right">
//   //         <span className="text-md">
//   //           {priceFormat(parseInt(promotion.priceAfterPromotion))}
//   //         </span>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   // const price = (
//   //   <div>
//   //     <div className="divider"></div>
//   //     <div className="row cart-total">
//   //       <div className="col-6 text-bold text-sm">Mã giảm giá:</div>
//   //       <div className="col-6 text-bold txt-right">
//   //           <input type="text" name="code"  placeholder="Nhập mã giảm giá" className="btn-discount" />
//   //       </div>
//   //       <div className="col-6  text-sm">Tổng tiền hàng:</div>
//   //       <div className="col-6 text-bold txt-right">
//   //         <span className="text-nm">{priceFormat(parseInt(sumPrice))}</span>
//   //       </div>
//   //       <div className="col-6  text-sm">Phí vận chuyển:</div>
//   //       <div className="col-6 text-bold txt-right">
//   //         <span className="text-nm">{priceFormat(parseInt(sumPrice))}</span>
//   //       </div>
//   //       <div className="col-6  text-sm">Mã giảm giá</div>
//   //       <div className="col-6 text-bold txt-right">
//   //         <span className="text-nm">{priceFormat(parseInt(sumPrice))}</span>
//   //       </div>
//   //       <div className="col-6 text-bold text-sm new-text">Tổng cộng:</div>
//   //       <div className="col-6 text-bold txt-right">
//   //         <span className="text-nm new-text">{priceFormat(parseInt(sumPrice))}</span>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="order_confirm_wrapper">
//       <div className="user_order_info">
//         {/* <div className="detail_info">
//           <div>{userInfo.customerName}</div>
//         </div> */}
//       <div className="nav_label">
//         <span>Thông tin nhận hàng</span>
//       </div>
//       <div className="user_info">
//         <div className="name_number">
//           <p>Nguyen Van A</p>
//           <span>|</span>
//           <p>(+84) 905459483</p>
//         </div>
//           <p className="address">117 Nguyễn Đình Chính, phường 5, quận Phú Nhuận, Hồ Chí Minh</p>
//           <span>Giao hàng hỏa tốc</span>
//           <span> Dự kiến giao hàng trước 20h00 ngày 15/11/2021</span>
//       </div>
//       <div className="main_container">
//       <form className="basic-form" >
//       <div className="form-group">
//           <div className="shipping">
//           <a className="shiper" href="#">Giao hàng tiết kiệm 1</a>
//           </div>
//       </div>
//       </form>
//       </div>
//         {userInfo.note ? (
//           <div className="detail_info">
//             <label>Ghi chú:</label>
//             <div>{userInfo.note}</div>
//           </div>
//         ) : (
//             ""
//           )}
//       </div>
//       {showProduct()}
//       {/* <div className="main_container">
//         <div className="nav_label">
//           <span>Sản phẩm</span>
//         </div>
//         <div className="list-products">{listItems}</div>
//       </div> */}
//       <div className="fix-bottom">
//         {/* {promotion.priceAfterPromotion === 0 ? price : priceUsePromotion} */}
//         {createOrder ? (
//           <div className="flex-list group-btn">
//             {/* <div className="btn-with-icon btn-with-icon-left">
//               <button
//                 onClick={() => {
//                   goBack(prevStep);
//                 }}
//                 type="button"
//                 className="btn btn-default"
//               >
//                 Trở về
//               </button>
//               <Icon name="keyboard_backspace" />
//             </div> */}
//             <div className="btn-with-icon right-icon">
//               <button
//                 onClick={() => {
//                   createOrder();
//                 }}
//                 className={`btn btn-primary ${isProcessing ? "btn-loader" : ""
//                   }`}
//               >
//                 Xác nhận
//               </button>
//               {/* <Icon name="east" /> */}
//             </div>
//           </div>
//         ) : (
//             ""
//           )}
//       </div>
//     </div>
//   );
// };

// export default OrderConfirm;
