let searchbtn = document.querySelector(".search_btn");
let searchbox = document.querySelector(".search_box");
let searchcont = document.querySelector(".search_cont");

let dark = document.getElementById("but1");
let head1 = document.querySelectorAll("h1");
let whole = document.getElementById("whole");

let darkMode = false;

// 🌙 Dark Mode
dark.addEventListener("click", (e) => {
    e.preventDefault();
    darkMode = !darkMode;

    if (darkMode) {
        head1.forEach((elem) => elem.style.color = "white");
        whole.style.background = "black";
        dark.textContent = "Light";
    } else {
        head1.forEach((elem) => elem.style.color = "black");
        whole.style.background = "ghostwhite";
        dark.textContent = "Dark";
    }
});

// 🍽 Fetch Meal API
const fetchdata = async (query) => {

    searchcont.innerHTML = ""; // Clear previous results

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let data = await res.json();

    if (!data.meals) {
        searchcont.innerHTML = `<h3 class="text-center text-danger">No recipes found!</h3>`;
        return;
    }

    data.meals.forEach((meal) => {
        let div = document.createElement("div");
        div.classList.add("mealcard");

        div.innerHTML = `
            <div class="card p-3 text-center">
                <img src="${meal.strMealThumb}" class="img-fluid image" alt="meal">
                <h4 class="mt-2">${meal.strMeal}</h4>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
            </div>
        `;

        const btn = document.createElement("button");
        btn.className = "btn btn-primary mt-2";
        btn.textContent = "View Recipe";

        btn.addEventListener("click", () => popup(meal));

        div.appendChild(btn);
        searchcont.appendChild(div);
    });
};

// 🍳 BOOTSTRAP POPUP MODAL FUNCTION
function popup(meal) {

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
        let ing = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if (ing && ing.trim() !== "") {
            ingredients += `
                <li class="list-group-item d-flex justify-content-between">
                    <span>${ing}</span>
                    <span class="fw-bold">${measure}</span>
                </li>`;
        }
    }

    document.querySelector(".meal-title").innerText = meal.strMeal;

    document.querySelector(".meal-content").innerHTML = `
        <div class="text-center mb-3">
            <img src="${meal.strMealThumb}" class="img-fluid mb-3" style="max-width:300px;">
        </div>

        <span class="badge bg-primary mb-2">${meal.strCategory}</span>
        <span class="badge bg-success mb-2">${meal.strArea}</span>

        <h4 class="mt-3">Ingredients</h4>
        <ul class="list-group mb-3">${ingredients}</ul>

        <h4>Instructions</h4>
        <p>${meal.strInstructions}</p>
    `;

    var modal = new bootstrap.Modal(document.getElementById("recipeModal"));
    modal.show();
}

// 🔍 SEARCH BUTTON
searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    let searchvalue = searchbox.value.trim();
    if (searchvalue !== "") fetchdata(searchvalue);
});
