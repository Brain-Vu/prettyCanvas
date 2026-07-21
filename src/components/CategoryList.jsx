import { Divider } from "@mui/material";
import logo from "../assets/backpack_logo.png";
import CategoryCard from "./CategoryCard.jsx";
import AssignmentList from "./AssignmentList.jsx";

function CategoryList({ categoryNames, catAssignMap }) {
  return (
    <>
      {categoryNames.every((category) => catAssignMap[category].length == 0) ? (
        <>
          <br />
          {"Nothing for now :)"}
        </>
      ) : categoryNames.length == 1 ? (
        <AssignmentList
          assignments={catAssignMap[categoryNames[0]]}
          isLate={categoryNames[0] == "Late"}
        />
      ) : (
        categoryNames.map((categoryName) => (
          <>
            <CategoryCard
              categoryName={categoryName}
              assignments={catAssignMap[categoryName]}
              isLate={categoryName == "Late"}
            />
            <Divider />
          </>
        ))
      )}
    </>
  );
}

export default CategoryList;
