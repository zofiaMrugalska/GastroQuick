import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menuInterface } from "../../../interfaces/MenuInterfaces";
import { MealServices } from "../../../services/MealServices";

const DynamicRouteForMeal = () => {
  const [oneMeal, setOneMeal] = useState<menuInterface | undefined>();

  console.log(oneMeal, "posilek dynamic");
  const params = useParams();
  console.log(params, "params");
  console.log("++++");
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await MealServices.getOneMealData(params.id);
        console.log(response.data);
        setOneMeal(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [params.id]);

  return <div></div>;
};
export default DynamicRouteForMeal;
