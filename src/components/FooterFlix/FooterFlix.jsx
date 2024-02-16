import React from 'react';

const imgSource = ["cgv", "bhd", "agri", "beta", "cinestar", "dcine", "ddc", "ivb", "js", "laban", "mega", "lotte", "payoo", "touch", "vietcom", "vietin", "x", "zalo", "galaxy", "starlight"];

export default function FooterFlix() {

    // todo: render logos
    const renderLogos = () => {
        return imgSource.map((item, index) => {
            return (
                <a key={index}className='child__element mb-4'>
                    <img src={`./img/${item}.png`} alt='logo-partner' width={30} height={30} style={{borderRadius: "50%"}} />
                </a>
            )
        });
    }

    return (
        <footer className='footerHome pb-5 lg:px-10'>
            <div className='footer__content containerCss'>
                <div className='footer__top grid grid-cols-12 py-4'>
                    <div className='footerTop__item col-span-4 md:col-span-12'>
                        <h2 className='item__title'>TIX</h2>
                        <div className='item__child grid grid-cols-2'>
                            <p className='child__text mb-2'>FAQ</p>
                            <p className='child__text mb-2'>Brand Guidelines</p>
                            <p className='child__text mb-2'>Terms of use</p>
                            <p className='child__text mb-2'>Privacy policy</p>
                        </div>
                    </div>
                    <div className='footerTop__item col-span-4 md:col-span-12'>
                        <h2 className='item__title'>PARTNERS</h2>
                        <div className='item__child grid grid-cols-4 md:grid-cols-10 sm:grid-cols-8'>
                            {renderLogos()}
                        </div>
                    </div>
                    <div className='footerTop__item col-span-2 md:col-span-6'>
                        <h2 className='item__title'>MOBILE APP</h2>
                        <div className='item__child flex gap-3'>
                            <a className='child__element'>
                                <img src='./img/apple.png' width={30} />
                            </a>
                            <a className='child__element'>
                                <img src='./img/android.png' width={30} />
                            </a>
                        </div>
                    </div>
                    <div className='footerTop__item col-span-2 md:col-span-6'>
                        <h2 className='item__title'>SOCIAL</h2>
                        <div className='item__child flex gap-3'>
                            <a className='child__element'>
                                <img src='./img/fb.png' width={30} />
                            </a>
                            <a className='child__element'>
                                <img src='./img/zl.png' width={30} />
                            </a>
                        </div>
                    </div>
                </div>
                <hr className='footer__line bg-white h-px' />
                <div className='footer__bottom grid grid-cols-12 py-8'>
                    <div className='footerBottom__item col-span-2 md:col-span-3 md:justify-self-center sm:col-span-12 sm:mb-3' style={{ width: "100px" }}>
                        <img src='./img/zion.jpeg' alt='logo' />
                    </div>
                    <div className='footerBottom__item col-span-8 md:col-span-6 md:justify-self-center md:text-center sm:col-span-12 sm:my-5'>
                        <h2 className='item__title'>TIX - PRODUCT OF ZION JOINT STOCK COMPANY</h2>
                        <p className='item__text pt-3'>
                            Address: Z06 Street 13, Tan Thuan Dong Ward, District 7, City. Ho Chi Minh, Vietnam.
                            <br />
                            Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
                            Business registration certificate number: 0101659783,                          
                            <br />
                            30th change registration, dated January 22, 2020 issued by Ho Chi Minh City Department of Planning and Investment.
                            <br />
                            Phone Number (Hotline): 1900 545 436
                        </p>
                    </div>
                    <div className='footerBottom__item col-span-2 md:col-span-3 md:justify-self-center sm:col-span-12' style={{ width: "100px" }}>
                        <img src='./img/logo-check.png' alt='logo' />
                    </div>
                </div>
            </div>
        </footer>
    );
}
