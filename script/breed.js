'use strict';

// Thêm hiệu ứng cho sidebar
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

//DOM
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Khởi tạo mảng lưu trữ các giống vật nuôi
let breedArr = JSON.parse(localStorage.getItem("breedArr")) || [];

// Hiển thị danh sách giống vật nuôi
renderTableBreed(breedArr);

///////////////////
// Bắt sự kiện ấn nút submit
submitBtn.addEventListener("click", () => {
  // Lấy dữ liệu từ form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // Validate dữ liệu
  const isValid = validate(data);
  if (!isValid) return;

  // Thêm dữ liệu vào mảng các Breed
  breedArr.push(data);

  // Lưu dữ liệu lại (cập nhật dữ liệu)
  saveToStorage("breedArr", breedArr);

  // Hiển thị lại bảng thông tin các Breed
  renderTableBreed(breedArr);

  // Xóa thông tin từ form nhập
  deleteForm();
});

function validate(data) {
  let isValid = true;

  // Nếu nhập vào một chuỗi trống thì báo lỗi
  if (data.breed.trim().length === 0) {
    alert("Không được để trống trường dữ liệu Breed");
    isValid = false;
  }

  if (data.type === "Select Type") {
    alert("Không được để trống trường dữ liệu Type");
    isValid = false;
  }

  return isValid;
}

// Hàm xóa thông tin form
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

// Hàm hiển thị lại thông tin giống vật nuôi lên bảng
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";

  // Cứ mỗi dòng row breed sẽ thêm 1 hàng vào bảng
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td scope="col">${index + 1}</td>
      <td scope="col">${breedItem.breed}</td>
      <td scope="col">${breedItem.type}</td>
      <td>
        <button type="button" onclick="deleteBreed(${index})" class="btn btn-danger">Delete</button>
      </td>`;

    tableBodyEl.appendChild(row);
  });
}

// Hàm xóa các Breed
function deleteBreed(index) {
  // xác nhận xóa
  const isDelete = confirm("Are you sure");

  if (isDelete) {
    // Xóa khỏi mảng
    breedArr.splice(index, 1);

    // Cập nhật lại dữ liệu dưới localStorage
    saveToStorage("breedArr", breedArr);

    // Gọi lại hàm hiển thị
    renderTableBreed(breedArr);
  }
}

// Hàm lưu dữ liệu vào localStorage
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


