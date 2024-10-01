"use strict";

// Lấy các input từ DOM
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const formContainer = document.getElementById("container-form");

let petArr = loadFromStorage("petArr") || [];
const breedArr = loadFromStorage("breedArr") || []; // Lấy giống loài từ localStorage
let editMode = false; // Cờ để xác định trạng thái đang chỉnh sửa
let editingPetId = null; // ID thú cưng đang chỉnh sửa

// Hàm lưu vào localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy từ localStorage
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hiển thị bảng dữ liệu thú cưng
function renderTableData(petArr) {
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight}</td>
      <td>${pet.length}</td>
      <td>${pet.breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${pet.color};"></i></td>
      <td><i class="bi ${pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
      <td><i class="bi ${pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
      <td><i class="bi ${pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
      <td>${new Date(pet.date).getDate()}/${new Date(pet.date).getMonth() + 1}/${new Date(pet.date).getFullYear()}</td>
      <td><button class="btn btn-primary" onclick="editPet('${pet.id}')">Edit</button></td>
    `;
    tableBodyEl.appendChild(row);
  });

  saveToStorage("petArr", petArr); // Cập nhật localStorage
}

// Bắt sự kiện khi ấn chọn vào typeInput để hiển thị loại giống theo phân loại
typeInput.addEventListener("change", renderBreed);

// Hàm hiển thị giống loài
function renderBreed() {
  // Xóa các tùy chọn cũ
  breedInput.innerHTML = "<option>Select Breed</option>";

  // Kiểm tra loại thú cưng được chọn
  if (typeInput.value === "Dog") {
    // Lọc giống cho Dog
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = breedItem.breed;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    // Lọc giống cho Cat
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = breedItem.breed;
      breedInput.appendChild(option);
    });
  } else {
    // Nếu không phải Dog hoặc Cat, không làm gì
    breedInput.innerHTML = "<option>Select Breed</option>"; // Reset lại giống loài
  }
}

// Hiển thị form chỉnh sửa
function editPet(petId) {
  const pet = petArr.find((pet) => pet.id === petId);
  if (!pet) return;

  // Hiển thị form và điền thông tin thú cưng vào form
  formContainer.classList.remove("hide");
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.value = pet.breed; // Đặt giống loài đã chọn
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  // Cập nhật danh sách giống loài dựa trên loại thú cưng
  renderBreed();

  // Đặt chế độ chỉnh sửa và lưu ID thú cưng
  editMode = true;
  editingPetId = petId;

  // Không cho phép thay đổi ID
  idInput.disabled = true;
}

// Xử lý sự kiện nút Submit
submitBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Ngăn tải lại trang

  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value, 10),
    length: parseInt(lengthInput.value, 10),
    age: parseInt(ageInput.value, 10),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // Kiểm tra dữ liệu hợp lệ
  if (validateData(data)) {
    if (editMode) {
      // Cập nhật thông tin thú cưng
      const index = petArr.findIndex((pet) => pet.id === editingPetId);
      if (index !== -1) {
        petArr[index] = { ...petArr[index], ...data }; // Cập nhật dữ liệu
      }
      editMode = false; // Thoát chế độ chỉnh sửa
      editingPetId = null; // Reset ID
      idInput.disabled = false; // Cho phép thay đổi ID cho lần nhập mới
    } else {
      // Thêm thú cưng mới
      const isIdUnique = petArr.every((pet) => pet.id !== data.id);
      if (!isIdUnique) {
        alert("ID này đã tồn tại");
        return;
      }
      petArr.push(data);
    }

    // Lưu lại vào localStorage
    saveToStorage("petArr", petArr);
    // Xóa dữ liệu trên form
    clearInput();
    // Ẩn form
    formContainer.classList.add("hide");
    // Render lại bảng
    renderTableData(petArr);
  }
});

// Kiểm tra dữ liệu hợp lệ
function validateData(data) {
  let isValid = true;
  if (data.name.trim() === "") {
    alert("Không được để trống trường dữ liệu Name");
    isValid = false;
  }
  if (data.type === "Select Type") {
    alert("Không được để trống trường dữ liệu Type");
    isValid = false;
  }
  if (isNaN(data.weight)) {
    alert("Không được để trống trường dữ liệu Weight");
    isValid = false;
  }
  if (isNaN(data.length)) {
    alert("Không được để trống trường dữ liệu Length");
    isValid = false;
  }
  if (isNaN(data.age)) {
    alert("Không được để trống trường dữ liệu Age");
    isValid = false;
  }
  if (data.breed === "Select Breed") {
    alert("Không được để trống trường dữ liệu Breed");
    isValid = false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("Độ tuổi nằm trong khoảng 1-15 tuổi");
    isValid = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Cân nặng nằm trong khoảng 1-15 kg");
    isValid = false;
  }
  if (data.length < 1 || data.length > 100) {
    alert("Chiều dài nằm trong khoảng 1-100 cm");
    isValid = false;
  }

  return isValid;
}

// Xóa dữ liệu trên form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.innerHTML = "<option>Select Breed</option>"; // Reset giống loài
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Khởi tạo: render dữ liệu từ localStorage
renderTableData(petArr);

// Thêm hiệu ứng cho sidebar
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});
