import React from 'react';

type HeaderType = {
    title: string
}


const Header = (props: HeaderType) => {
    return (
            <h3>{props.title}</h3>

    );
};

export default Header;