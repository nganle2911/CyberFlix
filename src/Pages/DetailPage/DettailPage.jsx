import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { https } from '../../services/api'
import { Rate, message } from 'antd'
import MovieProgram from './MovieProgram'

export default function DettailPage() {

  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('Please choose the appropriate showtime!');
  };
  let { maPhim } = useParams()

  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((res) => {
        setIsLoading(false);
        setDetail(res.data.content);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className='py-5 detailPage'>
      <div className='containerCss'>
        <h1 className='text-3xl font-medium'>Movie Content</h1>
        <hr className='bold-hr' />
      </div>

      <div className='containerCss pt-5 flex space-x-5'>
        <img className='h-80 rounded shadow-lg shadow-black' src={detail.hinhAnh} alt="" />

        <div className='space-y-1'>
          <h1 className='text-3xl mb-5 form-medium'>{detail.tenPhim}</h1>
          <p><b>ID Movie:</b> {detail.maPhim}</p>
          <p><b>Description:</b> {detail.moTa}</p>
          <p><b>Showtime:</b> {detail.ngayKhoiChieu}</p>
          <p><b>Trailer:</b> {detail.trailer}</p>
          <p><b>Rating:</b> <Rate value={detail.danhGia} /></p>
          <div>
            {contextHolder}
            <button className='bg-blue-500 text-white rounded px-5 py-1 font-normal text-xl mt-5' onClick={info}>Buy ticket</button>
          </div>

        </div>
      </div>

      <MovieProgram />
    </div>
  )
}
