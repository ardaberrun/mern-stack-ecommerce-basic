import React from 'react';
import './Container.css';

export default function Container({children, ...restProps}) {
    return (
        <div className="container" {...restProps}> 
            {children}
        </div>
    )
}


