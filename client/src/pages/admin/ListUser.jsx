import React, { useEffect, useState } from "react";
import axios from "axios"; // Không có ngoặc nhọn nha các pro
import { notification } from "antd";
import FormAddUser from "../../components/admin/manager-user/FormAddUser";
import { formatDate } from "../../utils/formatData";
import debounce from "lodash.debounce";
import Loading from "../../components/base/loading/Loading";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [searchText, setSearcText] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  // Gọi API lấy thông tin tất cả user
  const loadData = async () => {
    setShowLoading(true);
    await axios
      .get(`http://localhost:8000/users?email_&user_name_like=${searchText}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setShowLoading(true);
      });
    setShowLoading(false);
  };

  useEffect(() => {
    const delaySearch = debounce(loadData, 500); // Đặt độ trễ cho hàm search tính từ khi bỏ tay khởi bàn phím
    delaySearch();

    return delaySearch.cancel; // Hủy debounce khi không thực hiện chức năng search
  }, [searchText]);

  // Hàm xóa thông tin user
  const handleDelete = (id) => {
    // Gọi API
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          notification.success({
            message: "Thành công",
            description: "Xóa tài khoản thành công",
          });
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  // Hiển thị form thêm mới
  const handleShowAdd = () => {
    setShowFormAdd(true);
  };

  // Hiển thị form thêm mới
  const handleCloseAdd = () => {
    setShowFormAdd(false);
  };

  return (
    <>
      {/* Loading */}
      {showLoading ? <Loading /> : <></>}

      {/* Form thêm mới user */}
      {showFormAdd && (
        <FormAddUser handleCloseAdd={handleCloseAdd} loadData={loadData} />
      )}

      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <button onClick={handleShowAdd} className="btn btn-primary mb-3">
            Thêm mới tài khoản
          </button>
          <input
            value={searchText}
            onChange={(e) => setSearcText(e.target.value)}
            type="text"
            placeholder="Nhập từ khóa tìm kiếm"
            className="form-control"
            style={{ width: 300, height: 36 }}
          />
        </div>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th colSpan={2} className="text-center">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.gender === 0 ? "Nam" : "Nữ"}</td>
                <td>{formatDate(user.dateOfBirth)}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-warning">Sửa</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
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
