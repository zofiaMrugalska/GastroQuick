import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { menuInterface, responseOneMealInterface } from "../../../interfaces/MenuInterfaces";
import { MealServices } from "../../../services/MealServices";

const DynamicRouteForMeal = () => {
  const [oneMeal, setOneMeal] = useState<menuInterface>();
  const params = useParams();

  useEffect(() => {
    if (params.id !== undefined) {
      const getData = async (MealId: string) => {
        try {
          const response: responseOneMealInterface = await MealServices.getOneMealData(MealId);
          setOneMeal(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData(params.id);
    }
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
