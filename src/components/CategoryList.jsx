import { Divider } from "@mui/material";
import logo from "../assets/backpack_logo.png";
import CategoryCard from "./CategoryCard.jsx";

function CategoryList({ categoryNames, catAssignMap }) {
  return (
    <>
      {categoryNames.map((categoryName) => (
        <>
          <CategoryCard
            categoryName={categoryName}
            assignments={catAssignMap[categoryName]}
            isLate={categoryName == "Late"}
          />
          <Divider />
        </>
      ))}
    </>
  );
}

export default CategoryList;
