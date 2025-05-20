import { useEffect, useState } from "react";

export default function Recipes() {
  const [getRecipes, setGetRecipes] = useState([]);

  async function getAllRecipes() {
    try {
      const apiResponse = await fetch("https://dummyjson.com/recipes");

      const results = await apiResponse.json();

      if (results.recipes) {
        setGetRecipes(results?.recipes);
      } else {
        setGetRecipes([]);
      }

      console.log(apiResponse);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  console.log(getRecipes);

  return (
    <div>
      <h1>All Recipes</h1>
      <ul>
        {getRecipes && getRecipes.length > 0 ? (
          getRecipes.map((recipes) => (
            <li key={recipes.id}>
              {recipes.name} {recipes.instructions}
            </li>
          ))
        ) : (
          <h1>No recipes found</h1>
        )}
      </ul>
    </div>
  );
}
