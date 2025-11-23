let searchbtn = document.querySelector(".search_btn");
let searchbox = document.querySelector(".search_box");
let searchcont = document.querySelector(".search_cont");
let recipedetails=document.querySelector(".recipe-details");
let closebtn=document.querySelector(".btnclose");

// Dark mode toggle
let dark = document.getElementById("but1");
let head1 = document.querySelectorAll("h1");
let whole = document.getElementById("whole");


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

// Function for fetching API
const fetchdata = async (query) => {
    // searchcont.innerHTML = ""; // clear results

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    let data = await res.json();
    console.log(data)
    console.log(data.meals[0].strMeal);

    // If no results
    // if (!data.meals) {
    //     searchcont.innerHTML = `<h3 class="text-center">No recipes found!</h3>`;
    //     return;
    // }

    data.meals.forEach((meal) => {
        let div = document.createElement("div");
        div.classList.add("mealcard");
        div.innerHTML = `
            <div class="card p-3">
                <img src="${meal.strMealThumb}" class="img-fluid image" alt="meal">
                <h4 class="mt-2">${meal.strMeal}</h4>
                <p>${meal.strArea}</p>
                  <p>${meal.strCategory}</p>


            </div>
        `;
        const button=document.createElement("button");
        button.innerHTML="View Recipe";
        div.appendChild(button);
        button.addEventListener("click",()=>{
        popup(meal);

    })
        searchcont.appendChild(div);
    });
    
};
// popup function
// function popup(meal){
//     recipedetails.textContent=`
//     <h2>${meal.strMeal}</h2>

    
    
//     `
//     recipedetails.parentElement.style.display="block";
// }

// Search button event
searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    let searchvalue = searchbox.value.trim();
    // if (searchvalue === "") return;

    fetchdata(searchvalue);
});
