(function () {
  const recipes = [
    {
      id: 1,
      name: "Tea",
      ingredients: ["Water", "Tea Leaves", "Sugar", "Milk"],
      steps: [
        "Boil water",
        {
          text: "Add ingredients",
          substeps: ["Add tea leaves", "Add sugar", "Add milk"]
        },
        "Serve hot"
      ]
    },
    {
      id: 2,
      name: "Sandwich",
      ingredients: ["Bread", "Butter", "Vegetables"],
      steps: [
        "Take bread slices",
        {
          text: "Prepare filling",
          substeps: [
            "Chop vegetables",
            {
              text: "Seasoning",
              substeps: ["Add salt", "Add pepper"]
            }
          ]
        },
        "Assemble and serve"
      ]
    }
  ];

  const container = document.getElementById("recipes");

  function renderSteps(steps) {
    const ul = document.createElement("ul");

    steps.forEach(step => {
      const li = document.createElement("li");
      if (typeof step === "string") {
        li.textContent = step;
      } else {
        li.textContent = step.text;
        li.appendChild(renderSteps(step.substeps));
      }
      ul.appendChild(li);
    });

    return ul;
  }

  function renderRecipes() {
    container.innerHTML = "";
    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${recipe.name}</h2>
        <button data-action="steps">Show Steps</button>
        <button data-action="ingredients">Show Ingredients</button>
        <div class="steps hidden"></div>
        <div class="ingredients hidden">
          <ul>
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
      `;

      card.querySelector(".steps").appendChild(renderSteps(recipe.steps));
      container.appendChild(card);
    });
  }

  container.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;

    const card = e.target.closest(".card");
    if (e.target.dataset.action === "steps") {
      card.querySelector(".steps").classList.toggle("hidden");
    }
    if (e.target.dataset.action === "ingredients") {
      card.querySelector(".ingredients").classList.toggle("hidden");
    }
  });

  function init() {
    renderRecipes();
  }

  init();
})();
