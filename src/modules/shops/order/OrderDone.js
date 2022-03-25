import React from "react";
import Icon from './../../../_components/_icon.component';

const OrderDone = ({closeOrder}) => {
    return (
        <div className="order-done-wrapper">
            <div className="done-message-block">
                <div className="message-icon txt-center"><Icon name="check_circle_outline" /></div>
                <div className="message-text"><span>Đặt hàng thành công!</span></div>
            </div>
            <div className="fix-bottom">
                <div className="divider"></div>
                <button type="button" onClick={e => { closeOrder() }} className="btn btn-primary">Đóng</button>
            </div>
        </div>
    )
}

export default OrderDone;