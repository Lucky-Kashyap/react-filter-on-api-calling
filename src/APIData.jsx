import React, { useEffect, useState } from "react";

function APIData() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetch("https://reqres.in/api/users?page=1");
      const res = await data.json();

      setData(res.data);
      setAllData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData(searchText, data);
  }, [searchText]);

  const filterData = (searchText, data) => {
    const filterData = data.filter((result) =>
      result?.first_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setAllData(filterData);
  };
  return (
    <div>
      <h3>Filter Data</h3>

      <input
        type="text"
        placeholder="filter data"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {/* <button onClick={() => filterData(searchText, data)}>Filter</button> */}
      
      <div className="cards">
        {allData.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.avatar} />
            <h3> {item.first_name}</h3>
             {/* <h3>Last name : {item.last_name}</h3>
            <p>Your Email : {item.email}</p>  */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default APIData;
