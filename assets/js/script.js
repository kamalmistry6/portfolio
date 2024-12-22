$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });
  // typing text animation script
  // var typed = new Typed(".typing", {
  //   strings: ["Video Editor", "PIECE", "IS", "REAL"],
  //   typeSpeed: 100,
  //   backSpeed: 60,
  //   loop: true,
  // });

  var typed = new Typed(".typing-2", {
    strings: [
      "Video Editor",
      "Motion Editor",
      "Graphic Editor",
      "Thumbnail Designer",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
  document.querySelectorAll(".portfolio-item").forEach((container) => {
    const video = container.querySelector(".video-preview");
    const playButton = container.querySelector(".play-button");
    const overlay = container.querySelector(".video-overlay");

    playButton.addEventListener("click", () => {
      // Start the video and enable controls
      video.play();
      video.setAttribute("controls", true); // Show all video controls
      overlay.style.display = "none"; // Hide the overlay
      video.style.pointerEvents = "auto"; // Enable interaction with video
    });

    video.addEventListener("play", () => {
      // Ensure overlay remains hidden while the video is playing
      overlay.style.display = "none";
    });

    video.addEventListener("pause", () => {
      // Show the overlay only when the video is paused
      overlay.style.display = "flex";
    });

    video.addEventListener("ended", () => {
      // Reset the overlay and controls when the video ends
      video.removeAttribute("controls"); // Hide controls
      overlay.style.display = "flex";
      video.style.pointerEvents = "none"; // Prevent interaction
    });
  });
  // // Select the text element
  // const textToCopy = document.querySelector("#text-to-copy");

  // // Store the original text (email in this case)
  // const originalText = textToCopy.textContent;

  // Add event listener to the text element
  textToCopy.addEventListener("click", () => {
    navigator.clipboard
      .writeText(textToCopy.textContent)
      .then(() => {
        // Change the text to indicate it's copied (or keep it as is)
        textToCopy.textContent = "Copied!";

        // After a short delay, reset the text back to the email
        setTimeout(() => {
          textToCopy.textContent = originalText;
        }, 1000); // Reset to original email after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  });

  const form = document.getElementById("form");
  const toasterContainer = document.getElementById("toasterContainer");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          showToaster("Message send successfully", "success");
        } else {
          showToaster(json.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        showToaster("Something went wrong!", "error");
      })
      .then(() => {
        form.reset();
      });
  });

  function showToaster(message, type) {
    const toaster = document.createElement("div");
    toaster.className = `toaster ${type}`;
    toaster.innerHTML = `
  <div class="toaster-icon">
    ${
      type === "success"
        ? '<i class="fa-solid fa-circle-check success"></i>'
        : '<i class="fa-solid fa-circle-xmark error"></i>'
    }
  </div>
  <div class="toaster-content">
    <p class="toaster-title">
      ${type === "success" ? "Success" : "Error"}
    </p>
    <p class="toaster-message">
      ${
        type === "success"
          ? "Message sent successfully."
          : "Something went wrong!"
      }
    </p>
  </div>
  <button class="toaster-close">&times;</button>
  <div class="toaster-progress"></div>
`;

    toasterContainer.appendChild(toaster);

    setTimeout(() => {
      toaster.classList.add("show");
    });

    setTimeout(() => {
      toaster.classList.remove("show");
      setTimeout(() => {
        toasterContainer.removeChild(toaster);
      });
    }, 3000);
  }
});
