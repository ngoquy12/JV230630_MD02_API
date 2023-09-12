/**
 * Validate email
 * @param {*} email : chuỗi email cần kiểm tra (Regex)
 * @returns true nếu đúng định dạng, false nếu sai định dạng
 * Author: NVQUY(12/09/2023)
 */
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
