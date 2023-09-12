import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { notification } from "antd";
import { resourceForm } from "../../../resources/resourceVN";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    user_name: "",
    address: "",
    dateOfBirth: "",
    role: 1,
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isDisable, setIsDisalble] = useState(false);

  // Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    console.log("nameInput", nameInput);
    switch (nameInput) {
      case "email":
        if (!valueInput) {
          setEmailError("Email không được để trống.");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError("Mật khẩu không được để trống.");
        } else if (valueInput.length < 8) {
          setPasswordError("Mật khẩu không được ngắn hơn 8 ký tự.");
        } else {
          setPasswordError("");
        }
        break;
      case "user_name":
        if (!valueInput) {
          setNameError("Tên không được để trống.");
        } else {
          setNameError("");
        }
        break;
      case "confirmPassword":
        if (!valueInput) {
          setConfirmPasswordError("Mật khẩu không được để trống.");
          return;
        } else if (user.password !== valueInput) {
          setConfirmPasswordError("Mật khẩu không trùng khớp.");
          return;
        } else {
          setConfirmPasswordError("");
        }
        break;

      default:
        break;
    }
  };

  // Xử lý sự kiện checked trong ô checkbox
  const handleChecked = (e) => {
    setIsDisalble(e.target.checked);
  };

  // Lấy giá trị từ các ô input
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    validateData(name, value);

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateData("user_name", user.user_name);
    validateData("email", user.email);
    validateData("password", user.password);
    validateData("confirmPassword", user.confirmPassword);
    console.log("user", user);
  };

  return (
    <>
      <div className="container-login">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>{resourceForm.headingRegister}</h3>
            <div className="btn btn-close"></div>
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="name">
              Họ và tên
            </label>
            <input
              placeholder="Nhập họ và tên"
              className={`form-control ${nameError && "border-err"}`}
              id="name"
              name="user_name"
              type="text"
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {nameError && <div className="text-err mt-1">{nameError}</div>}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="date">
              Ngày sinh
            </label>
            <input
              onChange={handleInputChange}
              className={`form-control `}
              id="date"
              name="dateOfBirth"
              type="date"
            />
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
              onChange={handleInputChange}
            />
            {emailError && <div className="text-err mt-1">{emailError}</div>}
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
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {passwordError && (
              <div className="text-err mt-1">{passwordError}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="confirmPassword">
              Nhập lại mật khẩu
            </label>
            <input
              placeholder="Nhập lại mật khẩu"
              className={`form-control `}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={handleInputChange}
            />
            {confirmPasswordError && (
              <div className="text-err mt-1">{confirmPasswordError}</div>
            )}
          </div>
          <div className="form-check form-check-inline pt-1 pb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
              onChange={handleChecked}
            />
            <label className="form-check-label" for="inlineCheckbox1">
              Bạn có đồng ý với <a href="">điều khoản</a> của chúng tôi?
            </label>
          </div>
          <div>
            <button
              disabled={!isDisable}
              style={{ width: "100%" }}
              className="btn btn-primary"
            >
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
