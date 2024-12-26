let formBlock = document.querySelector('.formBlock')
let noneBlock = document.querySelector('.noneBlock')
let onlySaleContainer = document.querySelector('.onlySaleContainer')

document.querySelector('.sendForm').addEventListener('click', function () {
    const form = document.querySelector('.tgForm');
    const name = form.querySelector('input[name="name"]').value;
    const phone = form.querySelector('input[name="phone"]').value;

    if (!name || !phone) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const token = '7740126674:AAF5M3TF43ZD9nGWnpnA8h-qEWBKD-35has'; // Ваш токен
    const chatId = '4592376946';
    const text = `Имя: ${name}\nТелефон: ${phone}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
        }),
    })
        .then((response) => {
            if (response.ok) {
                form.reset();
            } else {
                alert('Ошибка при отправке заявки!');
            }
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            alert('Ошибка сети, попробуйте позже!');
        });

    formBlock.style.display = "none"
    noneBlock.style.display = "block"
});
document.addEventListener("DOMContentLoaded", function () {
    const token = '7740126674:AAF5M3TF43ZD9nGWnpnA8h-qEWBKD-35has'; // Ваш токен
    const chatId = '4592376946'; // Ваш chat_id

    const modal = document.getElementById("modal");
    const openModalButton = document.querySelector(".feedbackBtn"); // Кнопка открытия модалки
    const closeModalButton = document.getElementById("close-modal");
    const reviewForm = document.getElementById("review-form");

    openModalButton.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    reviewForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        modal.style.display = "none";

        const name = document.getElementById("name-input").value.trim();
        const comment = document.getElementById("comment-input").value.trim();
        const photoInput = document.getElementById("photo-input");
        const files = photoInput.files;

        if (!name || !comment) {
            alert("Пожалуйста, заполните имя и комментарий!");
            return;
        }

        try {
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const fileFormData = new FormData();
                    fileFormData.append("chat_id", chatId);
                    fileFormData.append("photo", files[i]);
                    fileFormData.append("caption", `Имя: ${name}\nКомментарий: ${comment}`);

                    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
                        method: "POST",
                        body: fileFormData,
                    });
                }
            } else {
                await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: `Имя: ${name}\nКомментарий: ${comment}`,
                    }),
                });
            }

            alert("Отзыв успешно отправлен!");
            reviewForm.reset();
        } catch (error) {
            console.error("Ошибка отправки:", error);
            alert("Произошла ошибка при отправке отзыва. Попробуйте еще раз.");
        }
    });
});
let onlySale = document.querySelector('.onlySale')


function checkScrollEnd() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        window.removeEventListener("scroll", checkScrollEnd);
        setTimeout(() => {
            onlySaleContainer.style.display = "flex";
        }, 5000);
    }
}

window.addEventListener("scroll", checkScrollEnd);
onlySale.onclick = () => {
    onlySaleContainer.style.display = "none"
}


const swiper = new Swiper('.swiper', {
    slidesPerView: 1.5,
    spaceBetween: 10,
    loop: true, // Optional: Loop through slides
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true,
});