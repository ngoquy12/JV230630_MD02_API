import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatData";
import FormAdd from "../../components/admin/manager-product/FormAdd";
import FormEdit from "../../components/admin/manager-product/FormEdit";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  // Gọi API lấy thông tin tất cả sản phẩm
  const loadData = () => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json()) // Ép kiểu về dạng json
      .then((response) => setProducts(response)) // Nơi có dữ liệu trả về
      .catch((error) => console.log(error)); // Bắt lỗi
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Hàm xóa thông tin một products theo id
   * @param {*} id id của product cần xóa
   * Author: NVQUY(11/09/2023)
   */
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  // Hàm hiển thị form thêm mới sản phẩm
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Hàm hiển thị form thêm mới sản phẩm
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Hiên thị form edit
  const handleEdit = (productId) => {
    setShowFormEdit(true); // hiển thị form edit
    setIdEdit(productId); // lấy ra id cần edit
  };

  // Đóng form edit
  const handleCloseEdit = () => {
    setShowFormEdit(false); // đóng form edit
  };

  return (
    <>
      {/* Form thêm mới sản phẩm */}
      {showForm && (
        <FormAdd handleCloseForm={handleCloseForm} loadData={loadData} />
      )}

      {/* Form sửa thông tin sản phẩm */}
      {showFormEdit && (
        <FormEdit
          idEdit={idEdit}
          handleCloseEdit={handleCloseEdit}
          loadData={loadData}
        />
      )}

      <div className=" d-flex align-items-center justify-content-center flex-column m-3">
        <div>
          <button onClick={handleShowForm} className="btn btn-primary m-3">
            Thêm mới sản phẩm
          </button>
        </div>
        <table
          border={1}
          className="table table-striped table-hover table-bordered"
        >
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Xuất xứ</th>
              <th scope="col" colSpan={2}>
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{formatMoney(product.price)}</td>
                <td>{product.from}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="btn btn-warning"
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
