import Link from "next/link";
import React from "react";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { BellOutlined, BankOutlined } from "@ant-design/icons";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
const { Header, Content, Sider } = Layout;

export default function SiderCandidate({ children }) {
  const nav = [
    {
      label: "Thông tin tài khoản",
      link: "/",
    },
    {
      label: "Tìm việc làm",
      link: "/search",
    },
    {
      label: "Công việc đang ứng tuyển",
      link: "/apply",
    },
    {
      label: "Thay đổi mật khẩu",
      link: "/password",
    },
    {
      label: "Đăng xuất",
      link: "/signin",
    },
  ];
  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(window.location.host);
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorItemText: "#C2C5CB",
              colorItemTextHover: "#FEFEFE",
              colorItemTextSelected: "#FFFFFF",
              colorItemBgHover: "#3B3D45",
              colorItemBgSelected: "#656A76",
              colorPrimary: "#1677ff",
            },
          },
          token: {},
        }}
      >
        <Layout className="layout">
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width="250px"
            // onBreakpoint={(broken) => {
            //   console.log(broken);
            // }}
            // onCollapse={(collapsed, type) => {
            //   console.log(collapsed, type);
            // }}
          >
            <div className="logo-sider">
              <div>
                <svg
                  className="absolute top-0 left-5 h-9 pt-3 mt-[13px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 102 28"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    fill="#FFFFFF"
                    d="M28.18,19.06A6.54,6.54,0,0,1,23,16c.67-5.34,2.62-7,5.2-7s4.54,2,4.54,5-2,5-4.54,5m0-13.34a7.77,7.77,0,0,0-7.9,6.08,26,26,0,0,1-1.93-5.62H12v7.9c0,2.87-1.3,5-3.85,5s-4-2.12-4-5l0-7.9H.49v7.9A8.61,8.61,0,0,0,2.6,20a7.27,7.27,0,0,0,5.54,2.35c4.41,0,7.5-3.39,7.5-8.24V8.77a25.87,25.87,0,0,0,3.66,8.05L17.34,28h3.72l1.29-7.92a11,11,0,0,0,1.36,1,8.32,8.32,0,0,0,4.14,1.28h.34A8.1,8.1,0,0,0,36.37,14a8.12,8.12,0,0,0-8.19-8.31"
                  ></path>
                  <path
                    fill="#FFFFFF"
                    d="M80.8,7.86V6.18H77.2V21.81h3.65V15.69c0-3.77.34-6.48,5.4-6.13V6c-2.36-.18-4.2.31-5.45,1.87"
                  ></path>
                  <polygon
                    fill="#FFFFFF"
                    points="55.51 6.17 52.87 17.11 50.05 6.17 45.41 6.17 42.59 17.11 39.95 6.17 36.26 6.17 40.31 21.82 44.69 21.82 47.73 10.71 50.74 21.82 55.12 21.82 59.4 6.17 55.51 6.17"
                  ></polygon>
                  <path
                    fill="#FFFFFF"
                    d="M67.42,19.07c-2.59,0-4.53-2.05-4.53-5s2-5,4.53-5S72,11,72,14s-2,5-4.54,5m0-13.35A8.1,8.1,0,0,0,59.25,14,8.18,8.18,0,1,0,75.6,14a8.11,8.11,0,0,0-8.18-8.31"
                  ></path>
                  <path
                    fill="#FFFFFF"
                    d="M91.47,14.13h.84l5.09,7.69h4.11l-5.85-8.53a7.66,7.66,0,0,0,4.74-7.11H96.77c0,3.37-2.66,4.65-5.3,4.65V0H87.82V21.82h3.64Z"
                  ></path>
                </svg>
              </div>
              <div className="flex">
                <Link
                  href={`http://${location}/candidate/notification`}
                  className="flex cursor-pointer"
                  style={{ marginRight: "20px" }}
                >
                  <BellOutlined
                    style={{
                      color: "white",
                      fontSize: "25px",
                      marginTop: "5px",
                    }}
                  />
                  <NotificationBadge count={4} effect={Effect.ROTATE_Y} />
                </Link>
                <div className="div-avatar-sider">
                  <img
                    src="/avatar.png"
                    alt="avatar"
                    className="cursor-pointer"
                    width="33px"
                    height="33px"
                  />
                </div>
              </div>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              items={nav.map((item, index) => {
                const key = index + 1;
                return {
                  key,
                  label: (
                    <>
                      {key < 5 && (
                        <Link href={`http://${location}/candidate${item.link}`}>
                          <span className="text-base font-normal">
                            {item.label}
                          </span>
                        </Link>
                      )}
                      {key === 5 && (
                        <Link href={"/signin"}>
                          <span className="text-base font-normal">
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </>
                  ),
                };
              })}
            />
          </Sider>
          <Content style={{ padding: "0 50px" }}>
            <div
              className="site-layout-content"
              style={{ background: colorBgContainer }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
