import React from "react";
import "./App.css";
import SortableTable, {Column} from "./SortableTable/SortableTable";

interface Person {
  firstName: string;
  lastName: string;
  favoriteColor: string;
  age: number;
}

const firstNames = [
  "Emma",
  "Olivia",
  "Ava",
  "Sophia",
  "Isabella",
  "Mia",
  "Charlotte",
  "Amelia",
  "Harper",
  "Evelyn",
  "Liam",
  "Noah",
  "William",
  "James",
  "Oliver",
  "Benjamin",
  "Elijah",
  "Lucas",
  "Mason",
  "Logan",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
];

const favoriteColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "white", "gray"];

const getRandomItem = (arr: any[]): any => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generatePerson = (): Person => {
  return {
    firstName: getRandomItem(firstNames),
    lastName: getRandomItem(lastNames),
    favoriteColor: getRandomItem(favoriteColors),
    age: Math.floor(Math.random() * 100),
  };
};

const People: Person[] = Array.from({length: 100}, generatePerson);
const Columns: Column<Person>[] = [
  {key: "firstName", name: "First Name"},
  {key: "lastName", name: "Last Name"},
  {key: "favoriteColor", name: "Favorite Color"},
  {key: "age", name: "Age"},
];

function App() {
  return (
    <div className="App">
      <h1>Sortable Table</h1>
      <SortableTable data={People} columns={Columns} />
    </div>
  );
}

export default App;
