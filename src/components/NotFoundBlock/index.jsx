import React from 'react'
import s from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
    return (
        <div className={s.not_found}>
            <h1>
                <span>😕</span>
                <br />
                404 Not Found
            </h1>
            <p className={s.description}>Page is not found in the website</p>
        </div>
    );
}

export default NotFoundBlock;