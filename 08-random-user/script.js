const usersContainer =
    document.getElementById(
        "users-container"
    );

const loader =
    document.getElementById("loader");

const searchInput =
    document.getElementById(
        "search-input"
    );

const themeBtn =
    document.getElementById(
        "theme-btn"
    );

const prevBtn =
    document.getElementById(
        "prev-btn"
    );

const nextBtn =
    document.getElementById(
        "next-btn"
    );

const pageInfo =
    document.getElementById(
        "page-info"
    );

const modal =
    document.getElementById("modal");

const modalBody =
    document.getElementById(
        "modal-body"
    );

const closeBtn =
    document.getElementById(
        "close-btn"
    );

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const API_URL =
    "https://api.freeapi.app/api/v1/public/randomusers";

let currentPage = 1;

let allUsers = [];



console.log(
    "Users app started"
);



const savedTheme =
    localStorage.getItem("theme");



if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );
}



//Theme Toggle

themeBtn.addEventListener(
    "click",
    () => {

        console.log(
            "theme changed"
        );

        document.body.classList.toggle(
            "light"
        );



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
    }
);



//Fetch Users

async function fetchUsers(
    page = 1
) {

    try {

        loader.style.display =
            "block";



        console.log(
            "fetching users..."
        );



        const response =
            await fetch(
                `${API_URL}?page=${page}`
            );



        console.log(response);



        const result =
            await response.json();



        console.log(result);



        allUsers =
            result.data.data;



        renderUsers(allUsers);



        updatePagination(
            result.data
        );



    } catch (error) {

        console.log(error);



        usersContainer.innerHTML = `

            <h2>
                Failed to fetch users
            </h2>

        `;

    } finally {

        loader.style.display =
            "none";
    }
}



//Render Users

function renderUsers(users) {

    console.log(
        "rendering users..."
    );



    const cards = users.map(
        (user) => {

            return `

                <div
                    class="user-card"

                    onclick="
                        openModal(
                            '${user.login.uuid}'
                        )
                    "
                >

                    <img
                        src="${user.picture.large}"
                        alt="${user.name.first}"
                        class="user-image"
                    />

                    <div class="user-content">

                        <h2>

                            ${user.name.first}
                            ${user.name.last}

                        </h2>

                        <p>

                            ${user.email}

                        </p>

                        <div class="badges">

                            <span>

                                ${user.gender}

                            </span>

                            <span>

                                ${user.nat}

                            </span>

                        </div>

                        <p class="country">

                            📍
                            ${user.location.country}

                        </p>

                        <p class="age">

                            ${user.dob.age}
                            years old

                        </p>

                    </div>

                </div>

            `;
        }
    ).join("");



    usersContainer.innerHTML =
        cards;
}



//Open Modal

function openModal(uuid) {

    console.log(
        "modal opened"
    );



    const user =
        allUsers.find(
            (item) =>
                item.login.uuid === uuid
        );



    console.log(user);



    modalBody.innerHTML = `

        <img
            src="${user.picture.large}"
            alt="${user.name.first}"
            class="modal-image"
        />

        <h2>

            ${user.name.title}
            ${user.name.first}
            ${user.name.last}

        </h2>

        <div class="modal-badges">

            <span>

                ${user.gender}

            </span>

            <span>

                ${user.nat}

            </span>

        </div>

        <div class="details-grid">

            <div class="detail-card">

                <h4>
                    Email
                </h4>

                <p>

                    ${user.email}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    Phone
                </h4>

                <p>

                    ${user.phone}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    Cell
                </h4>

                <p>

                    ${user.cell}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    Age
                </h4>

                <p>

                    ${user.dob.age}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    Username
                </h4>

                <p>

                    ${user.login.username}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    Country
                </h4>

                <p>

                    ${user.location.country}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    State
                </h4>

                <p>

                    ${user.location.state}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    City
                </h4>

                <p>

                    ${user.location.city}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    Street
                </h4>

                <p>

                    ${user.location.street.number}
                    ${user.location.street.name}

                </p>

            </div>

            <div class="detail-card">

                <h4>
                    Timezone
                </h4>

                <p>

                    ${user.location.timezone.description}

                </p>

            </div>

        </div>

        <a
            href="https://www.google.com/maps?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}"
            target="_blank"
            class="map-btn"
        >

            Open In Maps

        </a>

    `;



    modal.style.display =
        "flex";
}



//Close Modal

closeBtn.addEventListener(
    "click",
    () => {

        modal.style.display =
            "none";
    }
);



window.addEventListener(
    "click",
    (e) => {

        if (e.target === modal) {

            modal.style.display =
                "none";
        }
    }
);



//Search Users

searchInput.addEventListener(
    "input",
    (e) => {

        const value =
            e.target.value.toLowerCase();



        console.log(value);



        const filteredUsers =
            allUsers.filter(
                (user) => {

                    return (

                        user.name.first
                            .toLowerCase()
                            .includes(value)

                        ||

                        user.name.last
                            .toLowerCase()
                            .includes(value)

                    );
                }
            );



        renderUsers(
            filteredUsers
        );
    }
);



//Filter Users

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelector(
                        ".active"
                    )
                    .classList.remove(
                        "active"
                    );



                button.classList.add(
                    "active"
                );



                const filter =
                    button.dataset.filter;



                filterUsers(filter);
            }
        );
    }
);



function filterUsers(filter) {

    let filteredUsers = [];



    if (filter === "all") {

        filteredUsers =
            allUsers;

    } else {

        filteredUsers =
            allUsers.filter(
                (user) => {

                    return (
                        user.gender ===
                        filter
                    );
                }
            );
    }



    renderUsers(filteredUsers);
}



//Pagination

function updatePagination(
    data
) {

    pageInfo.innerText =
        `Page ${data.page} of ${data.totalPages}`;



    prevBtn.disabled =
        !data.previousPage;

    nextBtn.disabled =
        !data.nextPage;
}



//Previous Page

prevBtn.addEventListener(
    "click",
    () => {

        if (currentPage > 1) {

            currentPage--;

            fetchUsers(
                currentPage
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
);



//Next Page

nextBtn.addEventListener(
    "click",
    () => {

        currentPage++;

        fetchUsers(
            currentPage
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);



fetchUsers(currentPage);