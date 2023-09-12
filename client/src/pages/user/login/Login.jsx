import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { notification } from "antd";
import { resourceForm } from "./../../../resources/resourceVN";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "email":
        if (!valueInput) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
        break;

      default:
        break;
    }
  };

  // Lấy giá trị từ các ô input
  const handleInputChange = (e) => {
    // Lấy name và value từ input
    const { value, name } = e.target;

    // Khi onChange thì gọi đến hàm validate
    validateData(name, value);

    // Kiểm tra name và gán giá trị
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateData("email", email);
    validateData("password", password);

    if (email && password) {
      const newUser = {
        email: email,
        password: password,
      };
      // Gọi API đăng nhập
      axios
        .post(" http://localhost:8000/login", newUser)
        .then((response) => {
          if (response.status === 200) {
            // Lưu dữ liệu lên local
            localStorage.setItem(
              "userLogin",
              JSON.stringify(response.data.user)
            );
            // Chuyển trang
            if (response.data.user.role === 0) {
              console.log("Chuyển vào trang admin");
            } else {
              console.log("Chuyển vào trang người dùng");
            }
          }
        })
        .catch((error) => {
          if (
            error.response.data === "Incorrect password" ||
            error.response.data === "Cannot find user" ||
            error.response.data === "Password is too short"
          ) {
            notification.error({
              message: "Cảnh báo",
              description: "Mật khẩu hoặc Email không đúng.",
            });
          }
        });
    }
  };

  return (
    <>
      <div className="container-login">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>{resourceForm.headingLogin}</h3>
            <div className="btn btn-close"></div>
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Nhập địa chỉ email"
              className={`form-control ${emailError && "border-err"}`}
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {emailError && (
              <div className="text-err mt-1">Email không được để trống.</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="password">
              Mật khẩu
            </label>
            <input
              placeholder="Nhập mật khẩu"
              className={`form-control ${passwordError && "border-err"}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {passwordError && (
              <div className="text-err mt-1">Mật khẩu không được để trống.</div>
            )}
          </div>

          <div>
            <button style={{ width: "100%" }} className="btn btn-primary">
              Đăng nhập
            </button>
          </div>
          <p className="p-2 text-center">
            {resourceForm.confirmAccount} <a href="#">Đăng ký</a>
          </p>
        </form>
      </div>
    </>
  );
}
