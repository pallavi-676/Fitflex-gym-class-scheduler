let week = 1;
const weekLabel = document.getElementById("weekLabel");

if (weekLabel) {
    document.getElementById("prevWeek").onclick = () => {
        if (week > 1) week--;
        weekLabel.textContent = "Week " + week;
    };

    document.getElementById("nextWeek").onclick = () => {
        week++;
        weekLabel.textContent = "Week " + week;
    };
}

const filter = document.getElementById("difficultyFilter");

if (filter) {
    filter.onchange = function () {
        document.querySelectorAll(".class-card").forEach(card => {
            if (this.value === "all" || card.dataset.difficulty === this.value) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    };
}

document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", function () {

        const card = this.closest(".class-card");
        const spotsElement = card.querySelector(".spots");
        let spots = parseInt(spotsElement.textContent);

        if (spots > 0) {
            spotsElement.textContent = spots - 1;

            const className = card.querySelector("h3").textContent;
            localStorage.setItem("selectedClass", className);

            window.location.href = "class-booking.html";
        } else {
            alert("Class Full!");
        }
    });
});

const selectedClassInput = document.getElementById("selectedClass");
if (selectedClassInput) {
    const savedClass = localStorage.getItem("selectedClass");
    if (savedClass) selectedClassInput.value = savedClass;
}

const pricing = document.getElementById("pricing");
const bringFriend = document.getElementById("bringFriend");
const totalAmount = document.getElementById("totalAmount");

function updatePrice() {
    let price = parseInt(pricing.value);
    if (bringFriend.checked) price -= price * 0.10;
    totalAmount.textContent = price;
}

if (pricing && bringFriend) {
    pricing.onchange = updatePrice;
    bringFriend.onchange = updatePrice;
}

const form = document.getElementById("bookingForm");
if (form) {
    form.onsubmit = function (e) {
        e.preventDefault();
        document.getElementById("successMessage").textContent =
            "Registration Successful!";
        form.reset();
        totalAmount.textContent = 500;
    };
}