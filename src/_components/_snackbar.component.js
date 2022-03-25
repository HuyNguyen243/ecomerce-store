import React from 'react';

const Snackbar = ({message = ''}) => {
    return (
        <div id="snackbar">{message}</div>
    );
}

export default Snackbar;