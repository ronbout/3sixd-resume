import React from 'react';

import './backdrop.css';

// i don't think this is doing anything except turning the background grey for the sample app
// i'm leaving it here to not break the flow from the sample just yet, but also this may be where
// i'll put a different exit option such as the X from current site.. something other than this method
// for this sample, you just click into this greyed area to exit the menu

const Backdrop = props => (
    <div className="backdrop" onClick={props.click} />
)

export default Backdrop;