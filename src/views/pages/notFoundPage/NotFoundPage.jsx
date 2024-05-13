import React from 'react';
import svg from '../../../assets/images/404.svg';

export default function Error() {
    return (
        <>
            <div className="cont-404">
                <img src={svg} alt="svg" />
                <button>Back to Home</button>
            </div>
        </>
    );
}
