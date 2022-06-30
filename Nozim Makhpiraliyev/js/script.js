// sahifa yuklangandan keyin ushbu ko'ddagi skriptlar ishga tushadi
document.addEventListener("DOMContentLoaded", () => {
  const reklama = document.querySelectorAll(".promo__adv img");
  const genre = document.querySelector(".promo__genre");
  const bg = document.querySelector(".promo__bg");
  const seriesList = document.querySelector(".promo__interactive-list");
  const submit = document.querySelector("form.add");
  const input = document.querySelector(".adding__input");
  const checkbox = document.querySelector(".checkbox");
  let items = document.querySelectorAll(".promo__interactive-item");
  let deleteArr = document.querySelectorAll(".delete");

  // vebsaytdagi ma'lumotlar ro'yhati
  const interactiveItems = [
    "omar",
    "the final legacy",
    "ertugrul",
    "magnificent century",
    "great seljuks: guardians...",
  ];

  // reklama qismi o'chirildi
  reklama.forEach((items) => {
    items.remove();
  });

  genre.textContent = "Komediya";
  bg.style.backgroundImage = "url(img/1.jpg)";

  // li qo'shish

  // yangi li qo'shilganda uni oldidagi nomeri to'g'ri yozilishi uchun num kiritildi
  let num = 0;
  // 3-usul
  function createItems() {
    interactiveItems.sort();
    interactiveItems.forEach((item, index) => {
      //  num loopdagi item soniga tegnlashadi
      num++;
      seriesList.innerHTML += `<li class='promo__interactive-item'>${
        index + 1
      }. ${item} <div class='delete'></div> </li>`;
    });
    items = document.querySelectorAll(".promo__interactive-item");
    deleteArr = document.querySelectorAll('.delete');
    btnDelete();
  }
  createItems();
  function removeItems() {
    items.forEach((item) => {
      item.remove();
    });
  }

  // 1-usul
  // for (let i = 0; i < interactiveItems.length; i++) {
  //   const item = document.createElement("li");
  //   item.textContent = `${i + 1}. ${interactiveItems[i]}`;
  //   document.querySelector(".promo__interactive-list").append(item);
  //   item.classList.add("promo__interactive-item");
  // }

  // 2-usul
  // interactiveItems.forEach((li, index) => {
  //   const item = document.createElement("li");
  //   item.textContent = `${index + 1}. ${li}`;
  //   seriesList.append(item);
  //   item.classList.add("promo__interactive-item");
  // });

  submit.addEventListener("submit", (event) => {
    event.preventDefault();
    // checkbox sharti
    if(input.value){
      if (checkbox.checked) {
        /* Ma'lumot qaytalanmasligi va qaytalanganda qaysi indeksdagi bilan
        bir xil ekanligini bildirish uchun quyidagi 2 ta o'zgaruvchi kiritildi  */
        let repeat = false;
        let activeItem = 0;
  
        interactiveItems.forEach((item, index) => {
          if (
            item.toLowerCase().slice(0, 18) ==
            input.value.toLowerCase().slice(0, 18)
          ) {
            repeat = true;
            activeItem = index + 1;
          }
        });
  
        if (repeat) {
          repeat = false;
          alert(`${activeItem} - o'rindagi ma'lumot bilan bir xil`);
        } else {
          if (input.value.length > 18) {
            input.value = input.value.slice(0, 18) + "...";
          }
          
          interactiveItems.push(input.value);
          
          removeItems();
          createItems();
          console.log("Sevimli serial qo'shildi");
          input.value = ''
        }
      }
    }
  });

  // ma'lumotni o'chiradi va yangi qo'shilgan ma'lumotlarni ham o'chirishi uchun har doim yangi ma'lumot qo'shilganda shu funksiya ishlashi kerak
  function btnDelete() {
    deleteArr.forEach((item, idx) => {
      item.addEventListener("click", (e) => {
        interactiveItems.splice(idx, 1);
        removeItems();
        createItems();
        // interactiveItems.forEach((item, index) => {

        //   if (index + 1 == +e.target.parentElement.innerText.slice(0, 1)) {
        //     // belgilangan elementni indeksi kiritilib o'chiriladi va ma'lumotlar o'chirilib boshidan belgilangan ma'lumotsiz yuklanadi
        //     interactiveItems.splice(index, 1);
        //     removeItems();
        //     createItems();
        //   }
        // })
      });
    });
  }
});

// submit.addEventListener("click", (e) => {
//   // checkbox ga belgi qo'yilgan bo'lsa ishga tushadi
//   if (checkbox.checked == true) {
//     // test false bo'lsa ro'yhatda bor narsa kiritilgan bo'ladi va hato beradi
//     let test = true;
//     // uchNuqta true bo'lsa 18 ta belgidan keyin ... qo'yadi
//     let uchNuqta = false;

//     interactiveItems.forEach((item) => {
//       if (input.value.length > 18) {
//         uchNuqta = true;
//         // itemni oldidagi nomerini yo'qotib va harflar kichikka o'tkazilib tenglashtirilyabdi
//         if (item.innerText.toLowerCase().slice(3).slice(0, 18) == input.value.toLowerCase().slice(0, 18)) {
//           test = false;
//         }
//       } else {
//         if (item.innerText.toLowerCase().slice(3) == input.value.toLowerCase()) {
//           test = false;
//         }
//       }
//     });

//     if (test) {
//       // num bittaga ko'payib input.value oldiga qo'shiladi
//       num++;
//       if (uchNuqta) {
//         // uchNuqta false ga o'zgartirilmasa doim shu shart bajariladi
//         uchNuqta = false
//         interactiveItems.push(input.value.slice(0, 18) + '...')
//         // seriesList.innerHTML += `<li class='promo__interactive-item'>${num}. ${input.value.slice(0, 18)}... <div class='delete'></div> </li>`;
//       }
//       else
//         interactiveItems.push(input.value)
//     } else {
//       // test true ga tenglashtirilmasa doim shu shart bajarilaveradi va BAG ga aylanadi
//       test = true;
//       // bir xil ma'lumot kiritilsa alert ishga tushadi
//       alert("Bu ma'lumot mavjud");
//     }
//   }
//   // submit bo'lganda sahifa qayta yuklanmasligi uchun
//   e.preventDefault();
//   dleteItem()
// });
