import { CheckCircleTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import confirm from 'antd/es/modal/confirm';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function BookingPayment({ ttPhim }) {
    let { dsGheDangDat } = useSelector(state => state.seatSlice);
    let { user } = useSelector(state => state.userSlice);
    let navigate = useNavigate();
    

    // show confirm when payment 
    let showConfirm = () => {
        confirm({
            title: 'Buy ticket successfully !',
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: "60px"}} />,
            onOk() {
                console.log("OK");
                navigate("/");
            },
        })
    }

    let renderThongTinVe = (dsGheDangDat) => {
        let total = 0;
        let arrVe = [];
        dsGheDangDat.map((ghe) => {
            arrVe.push(`ghế ${ghe.tenGhe}, `);
            total += ghe.giaVe;
        });
        return { total, arrVe };
    }

    let handleBuyTicket = (arrVe) => {
        if (user) {
            if (arrVe.length > 0) {
                showConfirm();
            } else {
                message.warning("Please choose your seat!");
            }
        } else {
            localStorage.setItem("BOOKING", '/booking')
            navigate("/login")
            message.error("Please log in to buy ticket!")
        }
    }

    return (
        <>
            <div className='payment__item'>
                <h2 className='text-2xl text-blue-600 capitalize font-normal'>Seat's Information</h2>
            </div>
            <div className='payment__item'>
                <p className='item__title'>Theaters: </p>
                <p className='item__value'>{ttPhim.tenCumRap}</p>
            </div>
            <div className='payment__item'>
                <p className='item__title'>Address: </p>
                <p className='item__value'>{ttPhim.diaChi}</p>
            </div>
            <div className='payment__item'>
                <p className='item__title'>Theater's name: </p>
                <p className='item__value'>{ttPhim.tenRap}</p>
            </div>
            <div className='payment__item'>
                <p className='item__title'>Time: </p>
                <p className='item__value'>{ttPhim.ngayChieu} - {ttPhim.gioChieu}</p>
            </div>
            <div className='payment__item'>
                <p className='item__title'>Movie's name: </p>
                <p className='item__value'>{ttPhim.tenPhim}</p>
            </div>
            <div className='payment__item'>
                <p className='item__title'>Seats: </p>
                <p className='item__value'>{renderThongTinVe(dsGheDangDat).arrVe}</p>
            </div>
            <div className='payment__item'>
                <p className='item__title'>Total amount: </p>
                <p className='item__value text-xl'>{(renderThongTinVe(dsGheDangDat).total).toLocaleString()} VND</p>
            </div>
            <div className='payment__item'>
                <button className='uppercase w-full font-medium rounded-md text-3xl pt-3 pb-3 text-white bg-blue-500'
                onClick={() => {
                    handleBuyTicket(renderThongTinVe(dsGheDangDat).arrVe);
                }}
                >Buy ticket</button>
            </div>           
        </>
    )
}
