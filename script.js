$(document).ready(() => {
  // Loader Hide after finish
  setTimeout(() => {
    $(".loader").fadeOut(1);
    $(".loader").css("display", "none");
    $(".wrapper").addClass("show");
  }, 9500);

  // Get Today's Date
  function clockTick() {
    currentTime = new Date();
    month = currentTime.getMonth() + 1;
    day = currentTime.getDate();
    year = currentTime.getFullYear();
    currDate = day + " " + month + ", " + year;
    currDate = currentTime.toLocaleString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setInterval(clockTick, 1000);
    return currDate.toString();
  }
  $(".date-show span").html(clockTick());

  //   Clock Runner
  const numbers = [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // 0
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], // 1
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 3
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], // 4
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 5
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 6
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 7
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 9
  ];

  const blocks = [];
  const digits = Array.from(document.querySelectorAll(".block"));

  for (let i = 0; i < 4; i++) {
    blocks.push(digits.slice(i * 15, i * 15 + 15));
  }

  const setNum = (block, num) => {
    let n = numbers[num];
    for (let i = 0; i < block.length; i++) {
      block[i].classList[n[i] === 1 ? "add" : "remove"]("active");
    }
  };

  const time = {
    s: "",
    m: "",
    h: "",
    p: null,
  };

  // time loop
  const animator = () => {
    let d = new Date(),
      h = d.getHours().toString(),
      m = d.getMinutes().toString(),
      s = d.getSeconds().toString();

    s = s.length === 1 ? "0" + s : s;
    m = m.length === 1 ? "0" + m : m;
    h = h.length === 1 ? "0" + h : h;

    if (s !== time.s) {
      for (let i = 0; i < digits.length; i++) {
        let d = digits[i];
        if (i === +s) {
          d.classList.add("second");
          if (time.p !== null) digits[time.p].classList.remove("second");
          time.p = i;
          time.s = s;
        }
      }
    }

    if (m !== time.m) {
      setNum(blocks[2], m[0]);
      setNum(blocks[3], m[1]);
      time.m = m;
    }

    if (h !== time.h) {
      setNum(blocks[0], h[0]);
      setNum(blocks[1], h[1]);
      time.h = h;
    }
    window.requestAnimationFrame(animator);
  };

  // init
  window.requestAnimationFrame(animator);

  // Toggle Menu
  $("#btn-menu").on("click", () => {
    $("#btn-menu i").toggleClass("bi bi-list bi bi-x");
    $(".overlay-menu").toggleClass("open");
    $(".overlay-menu div").toggleClass("open");
  });

  // //   Menu Swipe
  var slideIndex = 0;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    var i;
    var slides = $(".pageTab");
    var dots = $(".dot");
    if (n > slides.length) {
      slideIndex = 0;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
  }
  //Dynamic Click Small
  let sMoves = document.querySelectorAll(".menu-item .dot");
  $(sMoves[0]).addClass("active");
  sMoves.forEach((smove, i) => {
    smove.addEventListener("click", (e) => {
      currentSlide(i);
      $(e.target).toggleClass("active");
      console.log("Cliked", i);
    });
  });

  //Dynamic Click
  let moves = document.querySelectorAll(".icons-list-item .dot");
  moves.forEach((move, i) => {
    move.addEventListener("click", (e) => {
      currentSlide(i);
      //   $(e.target).toggleClass("active");
      console.log("Clicked", i);
    });
  });

  //   Open Vedio
  $(".movie-btn").on("click", () => {
    $(".overlay-mov").toggleClass("open");
    $(".overlay-mov video").attr("autoplay", "");
  });
  $(".close-mov").on("click", () => {
    $(".overlay-mov").toggleClass("open");
    $(".overlay-mov video").removeAttr("autoplay");
  });

  //   iFrame Content Preview
  let frames = document.querySelectorAll(".pj-item a");
  let framesSrc = Array.from(frames, (fram) => fram.href);

  frames.forEach((frame, i) => {
    frame.addEventListener("click", (e) => {
      e.preventDefault();
      $(".iframe-preview iframe").attr("src", `${framesSrc[i]}`);
      $(".open-page a").attr("href", `${framesSrc[i]}`);
      $(".overlay-frame").toggleClass("open");
    });
  });
  $(".close-frame a").on("click", () => {
    $(".overlay-frame").toggleClass("open");
  });
});
