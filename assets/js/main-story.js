$(document).ready(function () {
  // $(".dropdown").on("click", function (e) {
  //   var target = $(e.target);
  //   var dropdown = target.closest(".dropdown");
  //   return (
  //     !dropdown.hasClass("open") ||
  //     !target.hasClass("dropdown-menu__search__input")
  //   );
  // });

  ///////////////////////////////////////////////
  // Slick Banner
  $(".banner-slider").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    prevArrow: false,
    nextArrow: false,
  });

  ////////////////////////////////////////////
  // Slick Photo
  $(".photo-slider").slick({
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5000,
          fade: true,
        },
      },
    ],
  });

  ////////////////////////////////
  // MAx length
  $(".textarea").keydown(function () {
    const lengthText = $(this).val().length + 1;

    if (lengthText >= 200) {
      document.onkeydown = function (e) {
        return false;
      };
    }

    $("#word-number").text(lengthText + "/200");
  });

  ////////////////////////////
  //VALIDATE
  let form = document.getElementById("group-form-input");
  let name = document.getElementById("name");
  let username = document.getElementById("username");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let desc = document.getElementById("desc");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    goFurther();
    checkInputs();
  });

  function checkInputs() {
    const nameValue = name.value.trim();
    const usernameValue = username.value.trim();
    const phoneValue = phone.value;
    const emailValue = email.value.trim();
    const descValue = desc.value.trim();
    console.log(validateNumber(phoneValue.length < 10));

    if (nameValue === "") {
      setErrorFor(name, "* Name không được để trống!");
    } else {
      setSuccessFor(name);
    }

    if (usernameValue === "") {
      setErrorFor(username, "* Username không được để trống!");
    } else {
      setSuccessFor(username);
    }

    if (phoneValue === "") {
      setErrorFor(phone, "* Phone không được để trống!");
    } else if (!validateNumber(phoneValue)) {
      setErrorFor(phone, "* Phone không đúng!");
    } else {
      setSuccessFor(phone);
    }

    if (emailValue === "") {
      setErrorFor(email, "* Email không được để trống!");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "* Email không đúng!");
    } else {
      setSuccessFor(email);
    }

    if (descValue === "") {
      setErrorFor(desc, "* Describe không được để trống!");
    } else {
      setSuccessFor(desc);
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = message;
    formControl.className = "form-control error";
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = "";
    formControl.className = "form-control success";
  }

  function validateNumber(phone) {
    return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone);
  }

  function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  ////////////////////////////////////
  // Back To Top
  var btn = $("#button__story");
  const headerHeight = document.getElementById("header").clientHeight;
  const sectionBannerHeight = document.getElementById("section-banner")
    .clientHeight;
  const sum = headerHeight + sectionBannerHeight;

  $(window).scroll(function () {
    if ($(window).scrollTop() > sum) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 1500);
  });

  //////////////////////////
  // Modal
  $(".modal-toggle").on("click", function (e) {
    e.preventDefault();
    $(".modal").toggleClass("is-visible");
  });

  ///////////////////////////
  // Scroll to page
  $("#btn-register__story").click(function () {
    $("html,body").animate(
      {
        scrollTop: $("#section-form__story").offset().top,
      },
      1000
    );
  });

  $("#btn-info__story").click(function () {
    $("html,body").animate(
      {
        scrollTop: $("#section-rules__story").offset().top,
      },
      1000
    );
  });
});

/////////////////////////////////////
// Set btn disable
document.getElementById("btnSubmit").disabled = true;

////////////////////////////////////
//Validate Check (term & condition)
function goFurther() {
  if (document.getElementById("checked").checked) {
    document.getElementsByClassName("form-checked")[0].style.color = "black";
    document.getElementById("btnSubmit").disabled = false;
    document.getElementById("btnSubmit").className =
      "disabled-emtry success-emtry";
  } else {
    document.getElementsByClassName("form-checked")[0].style.color = "red";
    document.getElementById("btnSubmit").disabled = true;
    document.getElementById("btnSubmit").className = "disabled-emtry";
  }
}

///////////////////////////////////////////
// File upload img
function readURL(input) {
  var selectedFile = input.files[0];
  var idxDot = selectedFile.name.lastIndexOf(".") + 1;
  var extFile = selectedFile.name
    .substr(idxDot, selectedFile.name.length)
    .toLowerCase();
  if (
    extFile == "jpg" ||
    extFile == "jpeg" ||
    extFile == "png" ||
    extFile == "gif"
  ) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".image-upload-wrap").hide();

      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();

      $(".image-title").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    alert("Only jpg/jpeg, png and gif files are allowed!");
  }
}

///////////////////////////////////////////////
// Remove upload
function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
}
$(".image-upload-wrap").bind("dragover", function () {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
  $(".image-upload-wrap").removeClass("image-dropping");
});
