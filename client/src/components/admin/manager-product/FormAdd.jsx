import React, { useState } from "react";
import "./product.css";
import { notification } from "antd";

export default function FormAdd({ handleCloseForm, loadData }) {
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    from: "",
  });

  // Hàm lấy giá trị từ các ô input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Hàm thêm mới product
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API thêm mới
    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ép kiểu dữ liệu đầu vào từ javascript sang json
      },
      body: JSON.stringify({ ...product, price: parseInt(product.price) }),
    })
      .then((response) => {
        // Kiểm tra dữ liệu trả về
        if (response.status === 201) {
          // Hiên thị notifycation thành công
          notification.success({
            message: "Thành công",
            description: "Thêm mới sản phẩm thành công.",
          });
          // ẩn form thêm mới
          handleCloseForm();
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="product-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Tên sản phẩm
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="productName"
              name="product_name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Giá
            </label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              id="price"
              name="price"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="from" className="form-label">
              Xuất xứ
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="from"
              name="from"
            />
          </div>
          <div className="d-flex gap-3 justify-content-center">
            <button type="submit" className="btn btn-primary">
              Thêm mới
            </button>
            <button
              onClick={handleCloseForm}
              type="button"
              className="btn btn-danger"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
