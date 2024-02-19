import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  orderByName,
  orderByWeight,
  filterBySource,
  filterByTemperament,
} from "../../actions";
import Card from "../Card/Card";
import styles from "./Home.module.css";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [, /*order*/ setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage /*setDogsPerPage*/] = useState(9);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(allDogs);

  useEffect(() => {
    if (allDogs.length === 0) dispatch(getDogs());
  }, [allDogs]);

  function handleOrderByName(e) {
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByWeight(e) {
    e.preventDefault(e);
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterBySource(e) {
    dispatch(filterBySource(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByTemperament(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={styles.background}>
      <SearchBar setCurrentPage={setCurrentPage} />
      <div className={styles.filter}>
        <Box sx={{ minWidth: 170 }}>
          <FormControl fullWidth>
            <InputLabel id="name-order">Order by name</InputLabel>
            <Select
              id="name-order"
              onChange={(e) => handleOrderByName(e)}
              defaultValue=""
            >
              <MenuItem value="asc">A - Z</MenuItem>
              <MenuItem value="desc">Z - A</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 170 }}>
          <FormControl fullWidth>
            <InputLabel id="name-order">Order by weight</InputLabel>
            <Select
              id="weight-order"
              onChange={(e) => handleOrderByWeight(e)}
              defaultValue=""
            >
              <MenuItem value="higher-weight">Higher weight</MenuItem>
              <MenuItem value="lower-weight">Lower weight</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 170 }}>
          <FormControl fullWidth>
            <InputLabel id="source-filter">Filter by source</InputLabel>
            <Select
              id="source-filter"
              onChange={(e) => handleFilterBySource(e)}
              defaultValue=""
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="api">Api</MenuItem>
              <MenuItem value="created">Created</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 170 }}>
          <FormControl fullWidth>
            <InputLabel id="temperament-filter">
              Filter by temperament
            </InputLabel>
            <Select
              id="temperament-filter"
              onChange={(e) => handleFilterByTemperament(e)}
              defaultValue=""
            >
              <MenuItem value="all">All</MenuItem>
              {allTemperaments?.map((e) => (
                <MenuItem value={e.name} key={e}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className={`row ${styles.container}`}>
        {currentDogs.length > 0 ? (
          currentDogs.map((el) => {
            return (
              <div className="col-3">
                <Card
                  id={el.id}
                  key={el.id}
                  name={el.name}
                  image={el.image}
                  weightMin={el.weightMin}
                  weightMax={el.weightMax}
                  temperament={el.temperament}
                />
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        pagination={pagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
