import React from 'react';
import Navmenu from '../Navmenu/Navmenu';
import Signin from '../Signin/Signin';

import './slider.css';

const Slider = props => {
    let drawerClasses = 'slider';

    if (props.show) {
        drawerClasses = 'slider open';
    }

    return (
        <nav className={drawerClasses} >
            <Navmenu />
            <Signin />
        </nav>
    );
};

export default Slider;