import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import { notification } from "antd";
import { validateEmail } from "../../../utils/validateData";

export default function FormAddUser({ handleCloseAdd, loadData }) {
  const [gender, setGender] = useState(0);

  const [user, setUser] = useState({
    user_name: "",
    address: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });

  // Danh sách gender
  const listGender = [
    {
      id: 0,
      title: "Nam",
    },
    {
      id: 1,
      title: "Nữ",
    },
    {
      id: 2,
      title: "Khác",
    },
  ];

  // Lấy giá trị từ các ô input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Gửi dữ liệu từ form lên server
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.user_name) {
      notification.error({
        message: "Cảnh báo",
        description: "Tên tài khoản không được để trống.",
      });
      return;
    } else if (!user.email) {
      notification.error({
        message: "Cảnh báo",
        description: "Email không được để trống.",
      });
      return;
    } else if (!user.password) {
      notification.error({
        message: "Cảnh báo",
        description: "Mật khẩu không được để trống.",
      });
      return;
    } else if (!validateEmail(user.email)) {
      notification.error({
        message: "Cảnh báo",
        description: "Email không đúng định dạng.",
      });
      return;
    } else {
      // Gọi API register
      axios
        .post(" http://localhost:8000/users", { ...user, gender: gender })
        .then((response) => {
          if (response.status === 201) {
            //1. Hiển thị notification
            notification.success({
              message: "Thành công",
              description: "Thêm mới tài khoản thành công.",
            });
            //2. Đóng form
            handleCloseAdd();
            //3. load lại dữ liệu
            loadData();
          }
        })
        .catch((err) => {
          if (err.response.data === "Email already exists") {
            notification.error({
              message: "Cảnh báo",
              description: "Email đã tồn tại trong hệ thống.",
            });
          } else {
            notification.error({
              message: "Cảnh báo",
              description: "Lỗi hệ thống.",
            });
          }
        });
    }
  };

  return (
    <>
      <div className="container-1">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center justify-content-between">
            <h3>Thêm mới tài khoản</h3>
            <button
              onClick={handleCloseAdd}
              type="button"
              className="btn btn-secondary"
            >
              X
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Tên <span className="text-danger">*</span>
            </label>
            <input
              name="user_name"
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <div className="d-flex gap-3">
              {listGender.map((genders) => (
                <div className="form-check" key={genders.id}>
                  <input
                    checked={genders.id === gender}
                    onChange={() => setGender(genders.id)}
                    className="form-check-input"
                    type="radio"
                  />
                  <label className="form-check-label">{genders.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày sinh</label>
            <input
              name="dateOfBirth"
              onChange={handleChange}
              type="date"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input
              onChange={handleChange}
              name="address"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Mật khẩu <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={handleCloseAdd}
              type="submit"
              className="btn btn-secondary"
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
