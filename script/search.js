'use strict';

// Thêm hiệu ứng cho sidebar
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

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

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formContainer = document.getElementById("container-form");

let petArr = loadFromStorage("petArr") || [];
const breedArr = loadFromStorage("breedArr") || []; 
// Functions to save and load from localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

findBtn.addEventListener("click", function(){
  let petArrFind = petArr;
  
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => String(pet.id).includes(idInput.value));
  }
  
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  
  if (typeInput.value != "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type.includes(typeInput.value));
  }
  
  if (breedInput.value != "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed.includes(breedInput.value)); // Đúng thuộc tính breed
  }
  
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  renderTableData(petArrFind); // Cần render lại bảng sau khi lọc
});


// Hiển thị bảng dữ liệu thú cưng
function renderTableData(petArr) {
  //xóa nội dung hiện có của bảng
  tableBodyEl.innerHTML = "";
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
    `;
    tableBodyEl.appendChild(row);
  });
}

// Khởi tạo bảng dữ liệu ban đầu
renderTableData(petArr);

//hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date; 
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date))
  }
}

// Hiển thị tất cả các giống loài từ localStorage
function renderBreed() {
  // Xóa các tùy chọn giống cũ
  breedInput.innerHTML = '<option>Select Breed</option>';

  // Hiển thị tất cả các giống loài từ breedArr mà không phân biệt loại
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = breedItem.breed;
    breedInput.appendChild(option);
  });
}

// Gọi hàm renderBreed để hiển thị tất cả các giống khi trang tải
renderBreed();



