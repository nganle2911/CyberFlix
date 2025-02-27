import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { https } from '../../services/api';
import moment from 'moment';

export default function MovieProgram() {
    const [dsLichChieu, setDsLichChieu] = useState([]);

    let { maPhim } = useParams();

    useEffect(() => {
        https.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`).then((res) => {
            setDsLichChieu(res.data.content.heThongRapChieu); 
        }).catch((err) => {
            console.log("err", err);
        });
    }, []);

    const items = dsLichChieu.map((cumRap, index) => {
        return {
            key: index,
            label: <img src={cumRap.logo} className='w-14' />,
            children: <Tabs className='cumRap__item' defaultActiveKey='1' style={{height: 500}} items={cumRap.cumRapChieu.map((rap, index) => {
                return {
                    key: index,
                    label: <div className='cumRap__title'>
                        <h2>{rap.tenCumRap}</h2>
                    </div>,
                    children: <div className='cumRap__schedules grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                        {rap.lichChieuPhim.map((phim, index) => {
                            console.log("phim", phim);
                            return <button className='schedule__item' key={index}>
                                <NavLink to={`/booking/${phim.maLichChieu}`} className='schedule__date' key={index}>
                                    <p>{moment(phim.ngayChieuGioChieu).format("DD/MM/YYYY")}</p>
                                    <span>~</span>
                                    <p>{moment(phim.ngayChieuGioChieu).format("hh:mm")}</p>
                                </NavLink>
                            </button>
                        })}
                    </div>
                }
            })} />
        }
    })

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div className='detailPage__movieProgram containerCss'>
            {dsLichChieu.length === 0 ? (
                <div className='movieProgram__content movieProgram__empty'>
                    <h1>
                        The theater systems for this movie has not been updated or is outdated show limit! Please come back later!
                    </h1>
                    <br />
                    <h1>Sorry for the inconvenience!</h1>
                </div>
            ) : (
                <div className='movieProgram__content'>
                    <Tabs className='content__cumRap' defaultActiveKey='1' items={items} onChange={onChange} style={{height: 500}} />
                </div>
            )}
        </div>
    )
}
