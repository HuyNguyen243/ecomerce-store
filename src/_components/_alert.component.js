import React, { useState, useContext } from "react";
import AlertHelper from "./../_helpers/alert";
import CartHelper from "./../_helpers/cart";
import { ShopContext } from "./../contexts/ShopContext";
import {
  ERROR_NOT_EXIST,
  ERROR_REACH_MAX_QUANTITY,
  ERROR_NOT_AVAILABLE,
  ERROR_NOT_REACH_MIN_PRICE,
} from "./../_config/shop.config";

const Alert = ({ message = "", getPromotionData }) => {
  const { applyPromotion } = useContext(ShopContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };
  async function handleApplyPromotion() {
    setCode("");
    setErrorMsg("")
    if (code === "") {
      CartHelper.removePromotion();
      handleClosePromotion();
    } else {
      setIsProcessing(true);
      let response = await applyPromotion(code.replace(/\//g, ''));
      if (response.success) {
        setIsProcessing(false);
        handleClosePromotion();
        CartHelper.savePromotion(response.data);
        getPromotionData();
      } else {
        setIsProcessing(false);
        switch (response.data.error) {
          case ERROR_NOT_EXIST:
            setErrorMsg("Mã giảm giá này không hợp lệ.");
            break;
          case ERROR_REACH_MAX_QUANTITY:
          case ERROR_NOT_AVAILABLE:
            setErrorMsg("Mã giảm giá này đã hết hiệu lực.");
            break;
          case ERROR_NOT_REACH_MIN_PRICE:
            setErrorMsg(
              `Chỉ áp dụng cho đơn hàng từ ${response.data.data} đ`
            );
            break;
          default:
            setErrorMsg("Không thể áp dụng mã giảm giá này.");
            break;
        }
      }
    }
  }

  const handleclick=()=>{
    console.log("ok")
  }

  const handleClosePromotion = () => {
    setErrorMsg("")
    AlertHelper.hidePromotion();
  };
  return (
    <div>
      {/* inputPromotion */}
      <div tabIndex={0} id="promotion" className="modal">
        <div className="modal-content">
          <div className="modal-header text-md txt-center txt-bold"><span>Mã giảm giá</span></div>
          <div id="text" className="modal-body">
            <input
              type="text"
              value={code}
              className="input-code app-input"
              onChange={handleChangeCode}
              placeholder="Nhập mã giảm giá"
            />
            <span className="txt-danger">{errorMsg}</span>
          </div>
          <div className="counpon" onClick={handleclick}>
            <div className="information-counpon">
              <img src="/images/sale2.png" alt="menu_icon" />f
              <div className="discountcode">
                <p>CC1PLUS1</p>
                <p>MUA 1 TẶNG 1 (Đơn tối thiểu 100.000đ)</p>
                <p>Hạn sử dụng: 30/11/2021</p>
              </div>
            </div>
            <div className="use-count">
              <span><a href="#">Sử dụng ngay</a></span>
            </div>
          </div>
          <div className="counpon">
            <div className="information-counpon">
              <img src="/images/sale2.png" alt="menu_icon" />
              <div className="discountcode">
                <p>CC1PLUS1</p>
                <p>MUA 1 TẶNG 1 (Đơn tối thiểu 100.000đ)</p>
                <p>Hạn sử dụng: 30/11/2021</p>
              </div>
            </div>
            <div className="use-count">
              <span><a href="#">Sử dụng ngay</a></span>
            </div>
          </div>
          <div className="flex-list flex-stretch">
            <button
              className="btn btn-promotion btn-danger"
              onClick={handleClosePromotion}
            >
              Đóng
            </button>

            <button
              className={`btn btn-promotion btn-success ${isProcessing ? "btn-loader" : ""
                }`}
              onClick={handleApplyPromotion}
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
