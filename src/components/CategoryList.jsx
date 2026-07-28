import { Divider } from "@mui/material";
import CategoryCard from "./CategoryCard.jsx";
import AssignmentList from "./AssignmentList.jsx";

function CategoryList({ categoryNames, categories, tabName }) {
  return (
    <>
      {categoryNames.every((categoryName) => categories[categoryName].length == 0) ? (
        <>
          <br />
          {"Nothing for now :)"}
        </>
      ) : categoryNames.length == 1 ? (
        <AssignmentList
          assignments={categories[categoryNames[0]]}
          tabName={tabName}
        />
      ) : (
        categoryNames.map((categoryName) => (
          <>
            <CategoryCard
              categoryName={categoryName}
              assignments={categories[categoryName]}
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
