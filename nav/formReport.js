const form = document.getElementById("form");
const button = document.getElementById("buttons");
const inputs = document.querySelectorAll("input");
const errorEl = document.getElementById("error_el");
const saleActivity = document.getElementById("gifts");
const errorElTwo = document.getElementById("error_el_two");
const buttonTwo = document.getElementById("buttons_two");
const salesContacts = document.getElementById("owners_contact");
const errorHiddenSales = document.getElementById("err_hidden_two");
const selectEls = document.getElementById("brand_category_2");
const ownerContactEl = document.getElementById("non_user");
const ownerElTwos = document.getElementById("user_yes");
const testAdvet = document.getElementById("media_consumption_14");
const showAdvert = document.getElementById("tv_adverts");
const FeedBackUser = document.getElementById("brand_category_6");
const mechanicUser = document.getElementById("area_of_service_12");
const specifyEl = document.getElementById("specify_user");
const selectElements = document.querySelectorAll(".select_els");
const mechanicContact = document.getElementById("mechanic_users");
const preloaderSubmit = document.getElementById("preloader_submit");
const submitButton = document.getElementById("buttonSubmit_icon");
const submitButtonIcon = document.getElementById("hide_icons");
const selectedParents = document.querySelectorAll(".select_parent");
console.log(selectedParents);



const selectedValues = {
  // valueTwo : $("#no_user_item").val(),
  brand_category_2 : $("#yes_user_item").val(),
  brand_category_6 : $("#water_bottle").val(),
  area_of_service_12 : $("#mechanic_item").val(),
  media_consumption_14 : $("#yes_advert").val()

 }



mechanicUser.addEventListener("input",function(){
valueOne = $("#mechanic_item").val()
if($("#area_of_service_12").val() === valueOne){
  mechanicContact.style.display = "flex";
}else{
  mechanicContact.style.display = "none";
}
},false);


selectEls.addEventListener("input",function(){
valueOne = $("#yes_user_item").val()
valueTwo = $("#no_user_item").val();

if($("#brand_category_2").val() === valueTwo){
  ownerContactEl.style.display = "flex";

  ownerElTwos.style.display = "none";
}else{
  ownerContactEl.style.display = "none";

  ownerElTwos.style.display = "flex";
}
},false);

//  advert show card
testAdvet.addEventListener("input",function(){
valueOne = $("#yes_advert").val();
valueTwo = $("#no_advert").val();
console.log(valueTwo);
if($("#media_consumption_14").val() === valueOne){
  showAdvert.style.display = "flex";
}else{
  showAdvert.style.display = "none";
}
},false);


FeedBackUser.addEventListener("input",function(){
valueOne = $("#water_bottle").val()

if($("#brand_category_6").val() === valueOne){
  specifyEl.style.display = "flex";
}else{
  specifyEl.style.display = "none";
}
},false);



// preloader on submit button


submitButtonIcon.addEventListener("click",function(){
  inputs.forEach((inputsItems) => {
    selectElements.forEach((selectItems) => {
      if(inputsItems.value === "" || selectItems.value === ""){
      }else{
        submitButton.style.display = "none";
        $("#preloader_icon_three").css("display", "inline-block");
      }
     })
  })

})


form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    const mydate = new Date ();
    const sendYear = mydate.getFullYear();
    const sendMonth = mydate.getMonth() + 1;
    const sendDates = mydate.getDate();
    const fullDate = [sendYear,sendMonth,sendDates].join('/');
    const formData_one = new FormData(form);
    nameEl = $("#ba_name").text();
    PhoneEl = $("#ba_phone").text();
    locationsEl = $("#ba_location").text();
    //  respondentLa = $("#respondent_latitude").val();
    //  respondentLong = $("#respondent_longitude").val();
    //  appending to the formData object created above
    formData_one.append("ba_name", nameEl);
    formData_one.append("ba_phone", PhoneEl);
    formData_one.append("ba_location", locationsEl);
    formData_one.append("survey_date",fullDate);

    // formData_one.append("respondent_latitude", respondentLa);
    // formData_one.append("respondent_longitude",respondentLong);

    console.log([...formData_one]);
    inputs
    setTimeout(() => {
      fetch("https://api6.staging.iguru.co.ke/api/oryx", {
      method: "POST",
      body: formData_one,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          submitButton.style.display = "inline-block";
          $("#preloader_icon_three").css("display", "none");
          workingNotifier("Thank your for filling the form. Your details are successfully submitted!");
          shouldProceed = false;
        } else {
          console.log(data.error);
        }
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          appNotifier("Network error, Please try again!");
          shouldProceed = false;
          console.log(err);
        }else{
          appNotifier("Operation has not been completed!")
        }
      });
    }, 1000)
    inputs.forEach((input) => {
      input.value = "";
    });
     selectElements.forEach((selectItems) => {
      selectItems.value = "";
     })

  },
  false
);



function validationForm(input_test) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input_test);
}

// checking values for optional field
// function checkSelectedValues () {
//   selectedParents.forEach((selectedItemsParents) => {
//     selectedItemsParents.addEventListener("change", () => {
//       const selectId = selectedItemsParents.id;
//       console.log(selectId);
//       const selectValue = selectedItemsParents.value;
//       console.log(selectValue);
//       const desiredValues = selectedValues[selectId];
//       console.log(desiredValues);
//       if(selectValue === desiredValues){
//        console.log("testing if its working");
//       }
//     })
//   })
// }


const workingNotifier = (message) => {
  new swal({
    title: message,
    text: "",
    icon: "success",
  }).then((result) => {
    if(result.isConfirmed){
      location.reload();
    }
  });
};

function appNotifier(message) {
  new swal({
    title: message,
    text: "",
    icon: "warning",
  });
}
