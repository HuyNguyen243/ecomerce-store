import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getShowLoadingAddtoCart } from '../redux/actions';

function SpinnerAddToCart(props) {
    const loadingAddtoCart = useSelector(state => state.loadingAddtoCart);
    const dispatch = useDispatch()
    
    React.useEffect(()=>{
        if(loadingAddtoCart){
            setTimeout(()=>{
                dispatch(getShowLoadingAddtoCart(false))
            },1000)
        }
    })
    
    return (
        <>
            {
                loadingAddtoCart &&
                <div className="overlay-spinner"></div>
            }
        </>
    );
}

export default SpinnerAddToCart;