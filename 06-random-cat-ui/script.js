const catCard =
    document.getElementById("cat-card");

const loader =
    document.getElementById("loader");

const themeBtn =
    document.getElementById("theme-btn");



/* =========================
   MODAL ELEMENTS
========================= */

const modal =
    document.getElementById("modal");

const modalBody =
    document.getElementById("modal-body");

const closeBtn =
    document.getElementById("close-btn");



/* =========================
   API
========================= */

const API_URL =
    "https://api.freeapi.app/api/v1/public/cats/cat/random";



/* =========================
   THEME
========================= */

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");
}



themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");



    if (
        document.body.classList.contains(
            "light"
        )
    ) {

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
});



/* =========================
   FETCH CAT
========================= */

async function fetchCat() {

    try {

        loader.style.display = "block";



        const response = await fetch(
            API_URL
        );

        const result =
            await response.json();

        console.log(result);



        const cat =
            result.data;



        renderCat(cat);



    } catch (error) {

        console.log(error);



        catCard.innerHTML = `
            <h2>
                Failed to fetch cat
            </h2>
        `;

    } finally {

        loader.style.display = "none";
    }
}



/* =========================
   RENDER CAT
========================= */

function renderCat(cat) {

    catCard.innerHTML = `

        <div
            class="card"
            onclick="openModal()"
        >

            <img
                src="${cat.image}"
                alt="${cat.name}"
                class="cat-image"
            />

            <div class="card-content">

                <h2>

                    ${cat.name}

                </h2>

                <p>

                    🌍 ${cat.origin}

                </p>

                <p>

                    🐾 ${cat.temperament}

                </p>

                <button
                    id="fetch-btn"

                    onclick="
                        event.stopPropagation();

                        fetchCat();
                    "
                >

                    Fetch New Cat

                </button>

            </div>

        </div>

    `;



    modalBody.innerHTML = `

        <img
            src="${cat.image}"
            alt="${cat.name}"
            class="modal-image"
        />

        <h2>

            ${cat.name}

        </h2>

        <p class="description">

            ${cat.description}

        </p>

        <div class="details">

            <p>
                <strong>Origin:</strong>
                ${cat.origin}
            </p>

            <p>
                <strong>Life Span:</strong>
                ${cat.life_span} years
            </p>

            <p>
                <strong>Weight:</strong>
                ${cat.weight.metric} kg
            </p>

            <p>
                <strong>Temperament:</strong>
                ${cat.temperament}
            </p>

            <p>
                <strong>Energy:</strong>
                ${cat.energy_level}/5
            </p>

            <p>
                <strong>Intelligence:</strong>
                ${cat.intelligence}/5
            </p>

            <p>
                <strong>Affection:</strong>
                ${cat.affection_level}/5
            </p>

            <p>
                <strong>Dog Friendly:</strong>
                ${cat.dog_friendly}/5
            </p>

            <p>
                <strong>Child Friendly:</strong>
                ${cat.child_friendly}/5
            </p>

        </div>

        <a
            href="${cat.wikipedia_url}"
            target="_blank"
            class="wiki-link"
        >

            Read More

        </a>

    `;
}



/* =========================
   OPEN MODAL
========================= */

function openModal() {

    modal.style.display = "flex";
}



/* =========================
   CLOSE MODAL
========================= */

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";
});



window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";
    }
});



/* =========================
   INITIAL FETCH
========================= */

fetchCat();