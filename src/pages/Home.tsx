import { list_products } from '../data';
import SideBar from '../components/SideBar';
import { useState } from 'react';

export interface Plante {
  id: string;
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
const listePlantes: Plante[] = list_products;
let checkedCateg: string[] = [];

const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listePlantes,
  ]);

  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    console.log('categories checked', mesCategoriesChecked);
    /**
     * Filtrer nos données ici
     */
    let resultFilteredPlants;
    checkedCateg = [...mesCategoriesChecked];

    if (checkedCateg.length > 0) {
      resultFilteredPlants = listePlantes.filter((x) =>
        checkedCateg.includes(x.category)
      );
    } else {
      resultFilteredPlants = [...listePlantes];
    }

    setListPlantDisplayed(resultFilteredPlants); // mettre à jour l'affichage de notre composant en fonction de la valeur de result
  };

  return (
    <div className='d-flex align-items-stretch'>
      <SideBar
        listElementPlant={listePlantes}
        onChangeCategoriesCheck={handleCheckCategories}
      />
      <div className='container-fluid custom-main'>
        {listPlantDisplayed.map((plante, i) => (
          <li key={i}>
            {plante.name} - {plante.category} - 💵 {plante.unitprice_ati}€ - ⭐
            {plante.rating}
          </li>
        ))}{' '}
      </div>
    </div>
  );
};
export default Home;
