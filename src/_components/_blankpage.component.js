import React from 'react';
import Icon from './_icon.component';

const Blankpage = ({message}) => {
    return (
        <div className="blank-page flex-list flex-center"><Icon name="warning" />&nbsp;<span>{message}</span></div>
    );
}

export default Blankpage;