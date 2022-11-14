import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";

// Ici j'ai adapté et exporté la BDD Plants avec son typage
export interface Plants {
  id?: number;
  name: string;
  unitprice_ati: number;
  quantity: number;
  category: string;
  rating: number;
  url_picture: string;
}
/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */
let listPlant: Plants[] = [];
let checkedCateg: string[] = [];

const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plants[]>([
    ...listPlant,
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/plant").then((response) => {
      listPlant = response.data.data;
      console.log(listPlant);
      setListPlantDisplayed([...listPlant]);
    });
  }, []);

  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    console.log("categories checked", mesCategoriesChecked);
    /**
     * Filtrer nos données ici
     */
    let resultFilteredPlants;
    checkedCateg = [...mesCategoriesChecked];

    if (checkedCateg.length > 0) {
      resultFilteredPlants = listPlant.filter((x) =>
        checkedCateg.includes(x.category)
      );
    } else {
      resultFilteredPlants = [...listPlant];
    }

    setListPlantDisplayed(resultFilteredPlants); // mettre à jour l'affichage de notre composant en fonction de la valeur de result
  };

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listPlant}
        onChangeCategoriesCheck={handleCheckCategories}
      />
      <div className="container-fluid custom-main">
        {listPlantDisplayed.map((plant, i) => (
          <li key={i}>
            {plant.name} - {plant.category} - 💵 {plant.unitprice_ati}€ - ⭐
            {plant.rating}
          </li>
        ))}{" "}
      </div>
    </div>
  );
};
export default Home;
