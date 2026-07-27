import { Divider } from "@mui/material";
import CategoryCard from "./CategoryCard.jsx";
import AssignmentList from "./AssignmentList.jsx";

function CategoryList({ categoryNames, catAssignMap, tabName }) {
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
          tabName={tabName}
        />
      ) : (
        categoryNames.map((categoryName) => (
          <>
            <CategoryCard
              categoryName={categoryName}
              assignments={catAssignMap[categoryName]}
              tabName={tabName}
            />
            <Divider />
          </>
        ))
      )}
    </>
  );
}

export default CategoryList;
