import React from 'react';

const Icon = ({name, styled = '', dataAction = '', hasPointer = true}) => {
  let iconStyle = (styled !== '') ? `material-icons-${styled}` : 'material-icons';
  return (
    <span data-action={dataAction} className={`${iconStyle} ${hasPointer ? 'pointer' : ''}`} >{name}</span>
  );
}

export default Icon;