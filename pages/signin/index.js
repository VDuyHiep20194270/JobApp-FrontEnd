import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import Link from "next/link";
import axios from 'axios';
import AppContext from "@/components/AppContext";

const URL = process.env.NEXT_PUBLIC_HOSTNAME

export default function Signin() {
  const { token, setToken, setRole } = useContext(AppContext)
  
  useEffect(() => {
    // console.log(window.localStorage.getItem('token'));
    // console.log(window.localStorage.getItem('role'));    
  }, [])

  const onFinish = (values) => {
    const config = {
      headers: { 
        'content-type': 'text/json',
        Authorization: `Bearer ${token}` 
      }
    }
    console.log("Received values of form: ", values);
    axios.post(`${URL}/api/v1/auth/login`, values)
    .then((res) => {
      console.log(res.data);
      setToken(res.data.accessToken)
      window.localStorage.setItem('token', res.data.accessToken)
      setRole(res.data.role)
      window.localStorage.setItem('role', res.data.role)
    })
    .catch((err) => {
      console.log(err);
      // message.error(err.response.data.message);
    })
  };

  return (
    <div className="bg-screen flex justify-center items-center relative">
      <svg className="absolute top-0 left-0 h-10 pt-7 pl-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 28" role="img" aria-hidden="true">
        <path fill="#C6CAFF" d="M28.18,19.06A6.54,6.54,0,0,1,23,16c.67-5.34,2.62-7,5.2-7s4.54,2,4.54,5-2,5-4.54,5m0-13.34a7.77,7.77,0,0,0-7.9,6.08,26,26,0,0,1-1.93-5.62H12v7.9c0,2.87-1.3,5-3.85,5s-4-2.12-4-5l0-7.9H.49v7.9A8.61,8.61,0,0,0,2.6,20a7.27,7.27,0,0,0,5.54,2.35c4.41,0,7.5-3.39,7.5-8.24V8.77a25.87,25.87,0,0,0,3.66,8.05L17.34,28h3.72l1.29-7.92a11,11,0,0,0,1.36,1,8.32,8.32,0,0,0,4.14,1.28h.34A8.1,8.1,0,0,0,36.37,14a8.12,8.12,0,0,0-8.19-8.31"></path>
        <path fill="#C6CAFF" d="M80.8,7.86V6.18H77.2V21.81h3.65V15.69c0-3.77.34-6.48,5.4-6.13V6c-2.36-.18-4.2.31-5.45,1.87"></path>
        <polygon fill="#C6CAFF" points="55.51 6.17 52.87 17.11 50.05 6.17 45.41 6.17 42.59 17.11 39.95 6.17 36.26 6.17 40.31 21.82 44.69 21.82 47.73 10.71 50.74 21.82 55.12 21.82 59.4 6.17 55.51 6.17"></polygon>
        <path fill="#C6CAFF" d="M67.42,19.07c-2.59,0-4.53-2.05-4.53-5s2-5,4.53-5S72,11,72,14s-2,5-4.54,5m0-13.35A8.1,8.1,0,0,0,59.25,14,8.18,8.18,0,1,0,75.6,14a8.11,8.11,0,0,0-8.18-8.31"></path>
        <path fill="#C6CAFF" d="M91.47,14.13h.84l5.09,7.69h4.11l-5.85-8.53a7.66,7.66,0,0,0,4.74-7.11H96.77c0,3.37-2.66,4.65-5.3,4.65V0H87.82V21.82h3.64Z"></path>
      </svg>
      <Form
        name="normal_login"
        className="signin-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="flex justify-between h-10 mb-6">
          <div className="text-2xl font-medium text-[#0E101A]">Đăng nhập</div>
          <div className="flex items-center">
            <Link href="/signup" className="hover:underline leading-3">
              Bạn chưa có tài khoản
            </Link>
          </div>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Tên đăng nhập",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Mật khẩu",
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          <a className="login-form-forgot" href="#">
            Quên mật khẩu?
          </a>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="w-1/2"
            >
              Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
