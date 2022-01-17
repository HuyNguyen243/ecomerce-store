import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getShowLoaded } from '../redux/actions';

function Spiner(props) {
    const showSpinner = useSelector(state => state.showSpinner);
    const dispatch = useDispatch()

    React.useEffect(()=>{
        if(showSpinner){
            setTimeout(()=>{
                dispatch(getShowLoaded(false))
            },1500)
        }
    })
    
    return (
        <>
            {
                showSpinner &&
                <div className="overlay-spinner"></div>
            }
        </>
    );
}

export default Spiner;