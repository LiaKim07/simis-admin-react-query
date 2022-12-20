import React from 'react';
export default function Status (val: boolean) {
    return (
        <React.Fragment>
            <span className='d-flex'>
                <span className='circle'></span>
                <span className=''>{val}</span>
            </span>
        </React.Fragment>
    )
}