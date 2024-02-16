import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { https } from '../../services/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice/userSlice';

const FormLogin = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Success:', values);
    https.post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        console.log(res);
        message.success("Login successfully!");
        dispatch(setUser(res.data.content))
        const booking = localStorage.getItem("BOOKING");
        if (booking === '/booking') {
          window.history.back();
          localStorage.removeItem("BOOKING");
        } else {
          navigate("/");
        }
        let dataJon = JSON.stringify(res.data.content)
        localStorage.setItem("USER_LOGIN", dataJon)
      })
      .catch((err) => {
        console.log(err);
        message.error("Login failed!")
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='my-10'>
      {/* Header Form */}
      <Form.Item
        style={{
          maxWidth: 500,
        }}
        className='containerCss'>
        <div className='bg-blue-500 flex justify-around font-bold text-white text-2xl rounded-t-xl py-1'>
          <div>
            <h1 to={"/login"}>Sign in
              <hr className='bold-hr-2' />
            </h1>
          </div>
          <div className='text-gray-400'>
            <NavLink to={"/register"}>Sign up</NavLink>
          </div>
        </div>
      </Form.Item>

      <Form
        className='bg-blue-100 rounded-b-xl p-5 containerCss'
        layout='vertical'
        name="basic"
        labelCol={{
          span: 16,
        }}
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item
          className='text-white'
          label="Account"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: 'Please enter account!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="matKhau"
          rules={[
            {
              required: true,
              message: 'Please enter password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Button */}
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,

          }}

        >
          <Button style={{ width: "100%" }} className='bg-blue-500' type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>

  )

}

  ;
export default FormLogin;