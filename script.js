const targetDate = new Date('March 22, 2025 00:00:00').getTime();
//targetDate.setHours(targetDate.getHours() + 120); // Set target date to 5 days from now for testing

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector('.segment-display');
  const segmentDisplayTop = segmentDisplay.querySelector('.segment-display__top');
  const segmentDisplayBottom = segmentDisplay.querySelector('.segment-display__bottom');

  const segmentOverlay = segmentDisplay.querySelector('.segment-overlay');
  const segmentOverlayTop = segmentOverlay.querySelector('.segment-overlay__top');
  const segmentOverlayBottom = segmentOverlay.querySelector('.segment-overlay__bottom');

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);

  if (parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue) {
    return;
  }

  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener('animationend', finishAnimation);
  }

  segmentElements.segmentOverlay.addEventListener('animationend', finishAnimation);
}

function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10) || 0;
  const secondNumber = timeValue % 10 || 0;
  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll('.time-segment');

  updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
}

function getTimeRemaining(targetDateTime) {
  const nowTime = Date.now();
  const complete = nowTime >= targetDateTime;

  if (complete) {
    return {
      complete,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
  const days = Math.floor(secondsRemaining / (60 * 60 * 24)); // Calculate days
  const hours = Math.floor((secondsRemaining % (60 * 60 * 24)) / (60 * 60)); // Calculate hours
  const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60); // Calculate minutes
  const seconds = secondsRemaining % 60; // Calculate seconds

  return {
    complete,
    days,
    hours,
    minutes,
    seconds,
  };
}

function updateAllSegments() {
  const timeRemainingBits = getTimeRemaining(new Date(targetDate).getTime());

  updateTimeSection('days', timeRemainingBits.days); // Update days
  updateTimeSection('hours', timeRemainingBits.hours);
  updateTimeSection('minutes', timeRemainingBits.minutes);
  updateTimeSection('seconds', timeRemainingBits.seconds);

  return timeRemainingBits.complete;
}

const countdownTimer = setInterval(() => {
  const isComplete = updateAllSegments();

  if (isComplete) {
    clearInterval(countdownTimer);
  }
}, 1000);

updateAllSegments();


document.querySelector(".menu-icon").addEventListener("click", function () {
  document.querySelector(".navbar").classList.toggle("active");
});


const images = [
    ["images/celeb1.png", "images/celeb3.png", "images/celeb5.png"], // Carousel 1 images
    ["images/celeb2.png", "images/celeb4.png", "images/celeb6.png"]  // Carousel 2 images
];

let index = [0, 0]; // Track current image for both carousels

function nextSlide(carouselIndex) {
    index[carouselIndex] = (index[carouselIndex] + 1) % images[carouselIndex].length;
    updateImage(carouselIndex);
}

function prevSlide(carouselIndex) {
    index[carouselIndex] = (index[carouselIndex] - 1 + images[carouselIndex].length) % images[carouselIndex].length;
    updateImage(carouselIndex);
}

function updateImage(carouselIndex) {
    document.querySelectorAll(".event-image")[carouselIndex].src = images[carouselIndex][index[carouselIndex]];
}



// document.addEventListener("scroll", function() {
//     let opacity = Math.min(1, window.scrollY / 500); // Increases opacity as you scroll
//     document.body.style.background = `linear-gradient(to right, rgba(94, 31, 41, ${opacity}), rgba(130, 28, 45, ${opacity}))`;
// });


function toggleText() {
    var moreText = document.getElementById("moreText");
    var btnText = document.getElementById("readMoreBtn");
    var section = document.getElementById("collegeInfo");

    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        btnText.innerText = "Read Less";
    } else {
        moreText.style.display = "none";
        btnText.innerText = "Read More";
        setTimeout(() => {
            window.scrollTo({
                top: section.offsetTop - 20, // Adjusted for padding/margin
                behavior: "smooth"
            });
        }, 100); // Delay ensures content collapses first before scrolling
    }
}


var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const navbar = document.querySelector(".navbar");

  menuIcon.addEventListener("click", function () {
      navbar.classList.toggle("active");

      // Toggle class to change menu icon (optional)
      menuIcon.classList.toggle("open");
  });
});
