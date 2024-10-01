"use strict";

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
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");

const tableBodyEl = document.getElementById("tbody");

let petArr = loadFromStorage("petArr") || [];

// Functions to save and load from localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Ví dụ sử dụng: lưu và hiển thị thú cưng
console.log(petArr);

//Thêm dữ liệu mẫu nếu petArr trống
if (petArr.length === 0) {
  const data1 = {
    id: "P001",
    name: "Tom",
    type: "Cat",
    weight: 5,
    length: 50,
    age: 3,
    color: "red",
    breed: "Tabby",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    bmi: "?",
    date: new Date(2022, 2, 1),
  };

  const data2 = {
    id: "P002",
    name: "Tyke",
    type: "Dog",
    weight: 3,
    length: 40,
    age: 5,
    color: "green",
    breed: "Mixed Breed",
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    bmi: "?",
    date: new Date(2022, 2, 2),
  };
  const data3 = {
    id: "P003",
    name: "Linda",
    type: "Cat",
    weight: 4,
    length: 60,
    age: 6,
    color: "yellow",
    breed: "Terrier",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    bmi: "?",
    date: new Date(2022, 4, 2),
  };
  const data4 = {
    id: "P004",
    name: "Johnson",
    type: "Dog",
    weight: 2,
    length: 20,
    age: 2,
    color: "gray",
    breed: "Mixed Breed",
    vaccinated: false,
    dewormed: false,
    sterilized: true,
    bmi: "?",
    date: new Date(2022, 2, 6),
  };
  const data5 = {
    id: "P005",
    name: "Maxx",
    type: "Cat",
    weight: 12,
    length: 90,
    age: 8,
    color: "blue",
    breed: "Persian",
    vaccinated: true,
    dewormed: false,
    sterilized: true,
    bmi: "?",
    date: new Date(2022, 6, 9),
  };

  petArr.push(data1, data2, data3, data4, data5); // Thêm tất cả dữ liệu mẫu vào mảng
  renderTableData(petArr);
  saveToStorage("petArr", petArr);
}

// Gọi hàm để hiển thị các dữ liệu mẫu khi trang vừa tải
renderTableData(petArr);

// Lấy dữ liệu breed từ localStorage
const breedArr = JSON.parse(localStorage.getItem("breedArr")) || [];

//Bắt sự kiện khi ấn chọn vào typeInput để hiển thị loại giống theo phân loại
typeInput.addEventListener("change", renderBreed);

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
  }
}

// Di chuyển renderTableData ra ngoài
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Render table data
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; // Clear old table

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
      <td>${pet.bmi}</td>
      <td>${new Date(pet.date).getDate()}/${new Date(pet.date).getMonth() + 1}/${new Date(pet.date).getFullYear()}</td>
      <td><button class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button></td>
    `;
    tableBodyEl.appendChild(row);
  });

  saveToStorage("petArr", petArr); // Update localStorage
}  

submitBtn.addEventListener("click", function (e) {
  // ngăn tải lại trang
  e.preventDefault(); 

  // Lấy dữ liệu từ form input
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
    bmi: "?",
    date: new Date(),
  };

  console.log("Data submitted:", data);

  // Validate dữ liệu
  if (validateData(data)) {
    // Kiểm tra ID xem có phải duy nhất hay không
    const isIdUnique = petArr.every((pet) => pet.id !== data.id);
    if (!isIdUnique) {
      alert("ID này đã tồn tại");
      return;
    }

    // Thêm thú cưng vào danh sách
    petArr.push(data);
    // Save new petArr to localStorage
    saveToStorage("petArr", petArr);
    // Xóa dữ liệu nhập trong form input
    clearInput();
    // Hiển thị danh sách thú cưng
    renderTableData(petArr);
  }
});

  // Xử lý điều kiện
  function validateData(data) {
    let isValidate = true;

    if (data.id.trim() === "") {
      alert("Không được để trống trường dữ liệu ID");
      isValidate = false;
    }

    if (data.name.trim() === "") {
      alert("Không được để trống trường dữ liệu Name");
      isValidate = false;
    }

    if (data.type === "Select Type") {
      alert("Không được để trống trường dữ liệu Type");
      isValidate = false;
    }

    if (isNaN(data.weight)) {
      alert("Không được để trống trường dữ liệu Weight");
      isValidate = false;
    }

    if (isNaN(data.length)) {
      alert("Không được để trống trường dữ liệu Length");
      isValidate = false;
    }

    if (isNaN(data.age)) {
      alert("Không được để trống trường dữ liệu Age");
      isValidate = false;
    }

    if (data.breed === "Select Breed") {
      alert("Không được để trống trường dữ liệu Breed");
      isValidate = false;
    }

    if (data.age < 1 || data.age > 15) {
      alert("Độ tuổi nằm trong khoảng 1-15 tuổi");
      isValidate = false;
    }

    if (data.weight < 1 || data.weight > 15) {
      alert("Cân nặng nằm trong khoảng 1-15 kg");
      isValidate = false;
    }

    if (data.length < 1 || data.length > 100) {
      alert("Chiều dài nằm trong khoảng 1-100 cm");
      isValidate = false;
    }

    return isValidate;
  }

  // Xóa dữ liệu vừa nhập ở form input
  function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  }

function deletePet(petId) {
  const isDelete = confirm("Are you sure?");

  if (isDelete) {
    // Nếu người dùng xác nhận, thì tiến hành xoá thú cưng
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // xóa khỏi mảng
        petArr.splice(i, 1);
        //Cập nhật lại dữ liệu dưới localStorage
        saveToStorage("petArr", petArr);
        // Thoát vòng lặp sau khi xóa phần tử
        break;
      }
    }
    // Hiển thị lại bảng sau khi xóa
    renderTableData(petArr);
  }
}

let isShowingHealthyPets = false; // Biến theo dõi trạng thái

function filterHealthyPets() {
  // Lọc những thú cưng có đủ 3 điều kiện
  const healthyPets = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );

  // Hiển thị thú cưng khỏe mạnh
  renderTableData(healthyPets); 
}

// Nút "Show Healthy Pet" để hiển thị thú cưng khỏe mạnh
healthyBtn.addEventListener("click", function () {
  if (!isShowingHealthyPets) {
    // Hiển thị thú cưng khỏe mạnh và đổi nhãn nút thành "Show All Pets"
    filterHealthyPets();
    healthyBtn.textContent = "Show All Pets";
    isShowingHealthyPets = true;
  } else {
    // Hiển thị tất cả thú cưng và đổi nhãn nút thành "Show Healthy Pet"
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    isShowingHealthyPets = false;
  }
});

//Tính chỉ số BMI
let bmi2 = true;

bmiBtn.addEventListener("click", () => {
  //duyệt qua mảng bmi: cập nhật lại thuộc tính bmi
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }

  //Gọi lại hàm hiển thị dữ liệu
  renderTableData(petArr);
});

// Thêm hiệu ứng cho sidebar
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
    });
renderTableData(petArr);



