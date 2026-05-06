const mealsContainer = document.getElementById("meals-container");

const loader = document.getElementById("loader");

const searchInput = document.getElementById("search-input");

const themeBtn = document.getElementById("theme-btn");

const prevBtn = document.getElementById("prev-btn");

const nextBtn = document.getElementById("next-btn");

const pageInfo = document.getElementById("page-info");

const modal = document.getElementById("modal");

const modalBody = document.getElementById("modal-body");

const closeBtn = document.getElementById("close-btn");

const API_URL = "https://api.freeapi.app/api/v1/public/meals";

let currentPage = 1;

let allMeals = [];

console.log("Meals app started");

const savedTheme = localStorage.getItem("theme");

console.log(savedTheme);

if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeBtn.addEventListener("click", () => {
  console.log("theme button clicked");

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");

    console.log("light theme enabled");
  } else {
    localStorage.setItem("theme", "dark");

    console.log("dark theme enabled");
  }
});

async function fetchMeals(page = 1) {
  try {
    console.log("fetching meals...");

    console.log("current page:", page);

    loader.style.display = "block";

    const response = await fetch(`${API_URL}?page=${page}`);

    console.log(response);

    const result = await response.json();

    console.log(result);

    allMeals = result.data.data;

    console.log(allMeals);

    renderMeals(allMeals);

    updatePagination(result.data);
  } catch (error) {
    console.log(error);

    mealsContainer.innerHTML = `
            <h2>
                Failed to fetch meals
            </h2>
        `;
  } finally {
    loader.style.display = "none";

    console.log("loading finished");
  }
}

function renderMeals(meals) {
  console.log("rendering meals...");

  console.log(meals);

  const cards = meals
    .map((meal) => {
      console.log(meal);

      return `

            <div
                class="meal-card"

                onclick="
                    openModal(
                        '${meal.idMeal}'
                    )
                "
            >

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                    class="meal-image"
                />

                <div class="meal-content">

                    <h2>

                        ${meal.strMeal}

                    </h2>

                    <div class="badges">

                        <span>

                            ${meal.strCategory}

                        </span>

                        <span>

                            ${meal.strArea}

                        </span>

                    </div>

                    <p class="tags">

                        ${meal.strTags || "No tags"}

                    </p>

                </div>

            </div>

        `;
    })
    .join("");

  mealsContainer.innerHTML = cards;
}

function openModal(idMeal) {
  console.log("modal opened");

  console.log(idMeal);

  const meal = allMeals.find((item) => item.idMeal === idMeal);

  console.log(meal);

  let ingredients = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    const measure = meal[`strMeasure${i}`];

    console.log(ingredient, measure);

    if (ingredient && ingredient.trim() !== "") {
      ingredients += `

                <li>

                    ${measure}
                    ${ingredient}

                </li>

            `;
    }
  }

  modalBody.innerHTML = `

        <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
            class="modal-image"
        />

        <h2>

            ${meal.strMeal}

        </h2>

        <div class="modal-badges">

            <span>

                ${meal.strCategory}

            </span>

            <span>

                ${meal.strArea}

            </span>

        </div>
<h3>

            Ingredients

        </h3>

        <ul class="ingredients-list">

            ${ingredients}

        </ul>

        <h3>

    Instructions

</h3>

<ul class="instructions-list">

    ${meal.strInstructions
      .split("\r\n")
      .filter((step) => step.trim() !== "")
      .map((step) => {
        return `

                    <li>

                        ${step}

                    </li>

                `;
      })
      .join("")}

</ul>

        
        <div class="modal-actions">

            <a
                href="${meal.strYoutube}"
                target="_blank"
                class="youtube-btn"
            >

                Watch Recipe

            </a>

            <a
                href="${meal.strSource}"
                target="_blank"
                class="source-btn"
            >

                View Source

            </a>

        </div>

    `;

  modal.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
  console.log("modal closed");

  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target === modal) {
    modal.style.display = "none";
  }
});

searchInput.addEventListener("input", (e) => {
  console.log("searching...");

  console.log(e.target.value);

  const value = e.target.value.toLowerCase();

  const filteredMeals = allMeals.filter((meal) => {
    return meal.strMeal.toLowerCase().includes(value);
  });

  console.log(filteredMeals);

  renderMeals(filteredMeals);
});

function updatePagination(data) {
  console.log("updating pagination");

  console.log(data);

  pageInfo.innerText = `Page ${data.page} of ${data.totalPages}`;

  prevBtn.disabled = !data.previousPage;

  nextBtn.disabled = !data.nextPage;
}

prevBtn.addEventListener("click", () => {
  console.log("previous clicked");

  if (currentPage > 1) {
    currentPage--;

    console.log(currentPage);

    fetchMeals(currentPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

nextBtn.addEventListener("click", () => {
  console.log("next clicked");

  currentPage++;

  console.log(currentPage);

  fetchMeals(currentPage);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

fetchMeals(currentPage);
