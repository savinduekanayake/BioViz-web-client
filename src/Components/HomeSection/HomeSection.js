import React from 'react';
import Services from './Services';

//import css modules
import style from './assets/css/image.module.css';

export default function HomeSection() {
    return (
        <div>
            <h2 className={style.heading}>Services</h2>
            <p className={style.subHeading}>Lorem ipsum dolor sit amet consectetur.</p>
            <Services />
        </div>
    );
}
