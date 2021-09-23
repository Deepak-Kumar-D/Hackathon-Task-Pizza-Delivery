import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/Extras.css";

function Extras({
  showModal,
  setShowModal,
  addExtras,
  newbase,
  setBase,
  newsauce,
  setSauce,
  newcheese,
  setCheese,
  newveggies,
  setVeggies,
  newmeat,
  setMeat,
}) {
  const [baseData, setBaseData] = useState([]);
  const [sauceData, setSauceData] = useState([]);
  const [cheeseData, setCheeseData] = useState([]);
  const [veggiesData, setVeggiesData] = useState([]);
  const [meatData, setMeatData] = useState([]);

  const handleBase = (e) => {
    setBase(e.target.value);
  };

  const handleVeggies = (e) => {
    const checked = e.target.checked;

    if (checked) {
      let tempVeggies = [...newveggies];
      tempVeggies.push(e.target.value);
      setVeggies(tempVeggies);
    }
  };

  const handleMeat = (e) => {
    const checked = e.target.checked;

    if (checked) {
      let tempMeat = [...newmeat];
      tempMeat.push(e.target.value);
      setMeat(tempMeat);
    }
  };

  useEffect(() => {
    const baseStock = async () => {
      const obj = await axios.get("http://localhost:5000/base", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setBaseData(obj.data.base);
    };

    const sauceStock = async () => {
      const obj = await axios.get("http://localhost:5000/sauce", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setSauceData(obj.data.sauce);
    };

    const cheeseStock = async () => {
      const obj = await axios.get("http://localhost:5000/cheese", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setCheeseData(obj.data.cheese);
    };

    const veggiesStock = async () => {
      const obj = await axios.get("http://localhost:5000/veggies", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setVeggiesData(obj.data.veggies);
    };

    const meatStock = async () => {
      const obj = await axios.get("http://localhost:5000/meat", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setMeatData(obj.data.meat);
    };

    baseStock();
    sauceStock();
    cheeseStock();
    veggiesStock();
    meatStock();
  }, []);

  const closeModal = () => {
    setShowModal(!showModal);
  };
  return (
    <section className={showModal ? "modal-container" : "closeModal"}>
      <div className="modal">
        <h4>Pizza Base</h4>
        <div className="extras">
          {baseData.map((base) => {
            return (
              <label key={base._id} className="base-label">
                <input
                  type="radio"
                  name="base"
                  checked={newbase === base.name}
                  value={base.name}
                  onChange={handleBase}
                />
                <span className="input-bg">{base.name}</span>
              </label>
            );
          })}
        </div>

        <h4>Pizza Base Sauce</h4>
        <div className="extras">
          {sauceData.map((sauce) => {
            return (
              <label key={sauce._id}>
                <input
                  type="radio"
                  name="sauce"
                  checked={newsauce === sauce.name}
                  value={sauce.name}
                  onChange={(event) => setSauce(event.target.value)}
                />
                <span className="input-bg">{sauce.name}</span>
              </label>
            );
          })}
        </div>

        <h4>Cheese</h4>
        <div className="extras">
          {cheeseData.map((cheese) => {
            return (
              <label key={cheese._id}>
                <input
                  type="radio"
                  name="cheese"
                  checked={newcheese === cheese.name}
                  value={cheese.name}
                  onChange={(event) => setCheese(event.target.value)}
                />
                <span className="input-bg">{cheese.name}</span>
              </label>
            );
          })}
        </div>

        <h4>
          Veggies<span> (3 free veggies)</span>
        </h4>
        <div className="extras">
          {veggiesData.map((veggies) => {
            return (
              <label key={veggies._id}>
                <input
                  type="checkbox"
                  name="veggies"
                  checked={newveggies.includes(veggies.name)}
                  value={veggies.name}
                  onChange={handleVeggies}
                />
                <span className="input-bg">{veggies.name}</span>
              </label>
            );
          })}
        </div>

        <h4>
          Meat<span> (1 free meat)</span>
        </h4>
        <div className="extras">
          {meatData.map((meat) => {
            return (
              <label key={meat._id}>
                <input
                  type="checkbox"
                  name="meat"
                  value={meat.name}
                  checked={newmeat.includes(meat.name)}
                  onChange={handleMeat}
                />
                <span className="input-bg">{meat.name}</span>
              </label>
            );
          })}
        </div>

        <div className="buttons">
          <button className="btn-done" onClick={addExtras}>
            Done
          </button>

          <button className="btn-cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default Extras;
