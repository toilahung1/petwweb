/*
'use strict';

//Data dùng để test
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
}

//Dữ liệu test chức nwang Breed
const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed2 = {
  breed: "Tabby",
  type: "Cat",
};
const breed3 = {
  breed: "Terrier",
  type: "Dog",
};
const breed4 = {
  breed: "Mixed Breed",
  type: "Cat",
};


//Lấy dữ liệu từ petArr
if(!getFromStorage("petArr")) {
  //Gắn data để test
  saveToStorage("petArr", [data1,data2])
}

const petArr = getFromStorage("petArr");

//Lấy dữ liệu từ breedArr
if(!getFromStorage("breedArr")) {
  //Gắn dữ liệu để test
  saveToStorage("breedArr", [breed1,breed2,breed3,breed4])
}

const breedArr = getFromStorage("breedArr")

//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu 
function saveToStorage(key, value) {
  localStorage(key, JSON.stringify(value))
}

*/