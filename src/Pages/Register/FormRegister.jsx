import React from 'react';
import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { https } from '../../services/api';
import { setLoadingOff } from '../../redux/spinnerSlice/spinnerSlice';

const FormRegister = () => {
  //Responsive form
  const formItemLayout = {
    wrapperCol: {
      xs: {
        offset: 0,
        span: 24,
      },
      sm: {
        offset: 0, 
        span: 24,
      },
    },
  };
  const [form] = Form.useForm();
  const navigate = useNavigate()
  

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    https.post("/api/QuanLyNguoiDung/DangKy", values)
    .then((res) => {
     console.log(res);
     message.success("Sign up successfully!")
     navigate("/login")
    })
    .catch((err) => {
     console.log(err.response.data.content);
     message.error("Sign up failed!")
     message.error(err.response.data.content)
     });
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
        <div className='text-gray-400'>
          <NavLink to={"/login"}>Sign in
          </NavLink>
        </div>
        <div>
          <h1 to={"/register"}>Sign up</h1>
          <hr className='bold-hr-2'/>
        </div>
      </div>
    </Form.Item>

      <Form
    className='containerCss bg-blue-100 rounded-b-xl p-5 '
    layout='vertical'
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 500,
      }}
    >

     {/* account */}
     <Form.Item
        name="taiKhoan"
        label="Account"
        rules={[
          {
            required: true,
            message: 'Please enter account',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* password */}
      <Form.Item
        name="matKhau"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please enter password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      {/* confirm password */}
      <Form.Item
        name="confirm"
        label="Confirm password"
        dependencies={['matKhau']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please enter password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('matKhau') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Password does not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

        {/* name*/}
     <Form.Item
        name="hoTen"
        label="Full name"
        rules={[
          {
            required: true,
            message: 'Please enter full name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

     {/* Email */}
     <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'Email is incorrect!',
          },
          {
            required: true,
            message: 'Please enter email!',
          },
          
        ]}
      >
        <Input />
      </Form.Item>
        
        {/* phone */}
      <Form.Item
        name="soDt"
        label="Phone number"
        rules={[
          {
            required: true,
            message: 'Please enter phone number!',
          },
        ]}
      >
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

   
           {/* Button */}
    <Form.Item
      wrapperCol={{
        offset: 10,
        span: 24,
        
      }}>
      <Button className='bg-blue-500' type="primary" htmlType="submit">
          Sign up
        </Button>

      </Form.Item>
 
    </Form>
    </div>
  );
};
export default FormRegister;