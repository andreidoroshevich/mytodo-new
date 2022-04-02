import React from 'react';


type unchangibleHeaderType = {
    title: string
}

const UnchangibleHeader = (props: unchangibleHeaderType) => {


    return (
        <div className={'maintitle'}><h3>{props.title}</h3></div>
    );
};

export default UnchangibleHeader;