document.addEventListener("DOMContentLoaded", () => {
  const landing = document.querySelector(".landing");
  const enterBtn = document.getElementById("enterBtn");
  const subscribeForm = document.getElementById("subscribeForm");

  if (!landing || !enterBtn || !subscribeForm) return;

  enterBtn.addEventListener("click", () => {
    landing.classList.add("active");
  });

  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;

    if (!email) return;

    console.log("Subscribed:", email);

    subscribeForm.reset();
  });
});
