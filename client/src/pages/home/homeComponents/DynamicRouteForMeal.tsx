import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { menuInterface } from "../../../interfaces/MenuInterfaces";
import { MealServices } from "../../../services/MealServices";

const DynamicRouteForMeal = () => {
  const [oneMeal, setOneMeal] = useState<menuInterface | undefined>();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await MealServices.getOneMealData(params.id);
        setOneMeal(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [params.id]);

  return (
    <div>
      {oneMeal ? (
        <div>
          <h1>{oneMeal.name}</h1>
          <img src={oneMeal.jpg} alt="photo of the meal" />
          <p>{oneMeal.description}</p>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default DynamicRouteForMeal;
