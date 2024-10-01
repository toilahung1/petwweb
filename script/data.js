'use strict';
 
// Thêm hiệu ứng cho sidebar
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Khởi tạo dữ liệu thú cưng (hoặc load từ localStorage)
let petArr = loadFromStorage("petArr") || [];

// Gán sự kiện cho nút "Export Data"
const exportBtn = document.getElementById("export-btn");

exportBtn.addEventListener("click", function () {
  // Kiểm tra nếu petArr không rỗng
  if (petArr.length === 0) {
    alert("No data available to export!");
    return;
  }

  // Chuyển dữ liệu thú cưng thành JSON
  const jsonStr = JSON.stringify(petArr, null, 2);

  // Tạo đối tượng Blob chứa dữ liệu JSON
  const blob = new Blob([jsonStr], { type: "application/json" });

  // Tải xuống file JSON với tên là pets.json
  saveAs(blob, "pets.json");
});

// Hàm load dữ liệu từ localStorage (nếu có)
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}


////////////////////////////////////////
//IMPORT FILE
document.addEventListener("DOMContentLoaded", function () {
  // Gán sự kiện cho nút "Import Data"
  const fileInput = document.getElementById("input-file");
  const importBtn = document.getElementById("import-btn");
  const tableBodyEl = document.getElementById("tbody");

  importBtn.addEventListener("click", function () {
    const file = fileInput.files[0];

    // Kiểm tra nếu không có file nào được chọn
    if (!file) {
      alert("Please choose a file to import");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const importedData = JSON.parse(event.target.result);

        if (!Array.isArray(importedData)) {
          throw new Error("Invalid file format. Data must be an array of pets.");
        }

        let petArr = loadFromStorage("petArr") || [];

        importedData.forEach(importedPet => {
          const existingPetIndex = petArr.findIndex(pet => pet.id === importedPet.id);
          if (existingPetIndex !== -1) {
            petArr[existingPetIndex] = importedPet;
          } else {
            petArr.push(importedPet);
          }
        });

        saveToStorage("petArr", petArr);

        alert("Import successful!");
        renderTableData(petArr);
      } catch (error) {
        alert("There was an error importing the file: " + error.message);
      }
    };

    reader.readAsText(file);
  });

  function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function renderTableData(petArr) {
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
        <td>${new Date(pet.date).toLocaleDateString()}</td>
      `;
      tableBodyEl.appendChild(row);
    });
  }
});

