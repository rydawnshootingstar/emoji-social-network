import React from 'react';

/*
    - preferred way to render a single emoji in jsx
    - explanation: https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7
    - problems: can't control font size when it's treated as an "img"
*/

const Emoji = (props) => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);

export default Emoji;