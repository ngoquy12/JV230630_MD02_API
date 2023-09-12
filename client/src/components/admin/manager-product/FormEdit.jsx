import React, { useEffect, useState } from "react";
import "./product.css";
import { notification } from "antd";

export default function FormEdit({ idEdit, handleCloseEdit, loadData }) {
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

  // Gọi API lấy thông tin một sản phẩm theo id
  useEffect(() => {
    // Call API
    fetch(`http://localhost:8000/products/${idEdit}`)
      .then((response) => response.json()) // Ép kiểu về dạng json
      .then((response) => setProduct(response)) // Lấy dữ liệu
      .catch((error) => console.log(error)); // Bắt lỗi
  }, []);

  // Hàm cập nhật product
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API cập nhật
    fetch(`http://localhost:8000/products/${idEdit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // ép kiểu dữ liệu đầu vào từ javascript sang json
      },
      body: JSON.stringify({ ...product, price: parseInt(product.price) }),
    })
      .then((response) => {
        // Kiểm tra dữ liệu trả về
        if (response.status === 200) {
          // Hiên thị notifycation thành công
          notification.success({
            message: "Thành công",
            description: "Cập nhật sản phẩm thành công.",
          });
          handleCloseEdit(); // Đóng form
          loadData(); // Load lại dữ liệu
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
              value={product.product_name}
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
              value={product.price}
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
              value={product.from}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="from"
              name="from"
            />
          </div>
          <div className="d-flex gap-3 justify-content-center">
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
            <button
              onClick={handleCloseEdit}
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
