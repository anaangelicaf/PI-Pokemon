import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions/actions";
import "./styles.css/Form.css";

export const Form = () => {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.types);

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "El name es obligatorio";
    }

    return errors;
  };

  const [data, setData] = useState({
    name: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name !== "name") {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value) <= 0 ? 0 : e.target.value,
      });
    } else {
      setErrors(
        validate({
          ...data,
          [e.target.name]: e.target.value,
        })
      );
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const checkbox = (e) => {
    
    if (data.types.includes(e.target.value)) {
      data.types = data.types.filter((id) => id !== e.target.value);
      
      setData({
        ...data,
        types: data.types,
      });
    } else {
      setData({
        ...data,
        types: [...data.types, e.target.value],
      });
    }
  };
  
  const submit = async (e) => {
    
    e.preventDefault();
    
    await fetch("http://localhost:3001/pokemons", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    dispatch(getPokemons());
    alert("Pokemon creado")
    
    setData({
      name: "",
      life: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  };

  return (
    <div className="containerCreate">
      <form action="POST" className="form" onSubmit={submit}>
        <div className="separado">
          <h1>Crea tu propio Pokemon</h1>
          <p className={errors.name ? "danger" : "question"}>
            <label>Pokemon name</label>
            <input
              type="text"
              placeholder="pikachu.."
              name="name"
              value={data.name}
              onChange={handleInputChange}
              required
            />
          </p>
          {errors.name ? <p className="danger">{errors.username}</p> : null}
          <p className="question">
            <label>Vida</label>
            <input
              type="number"
              name="life"
              value={data.life}
              onChange={handleInputChange}
            />
          </p>
          <p className="question">
            <label>Fuerza</label>
            <input
              type="number"
              name="attack"
              value={data.attack}
              onChange={handleInputChange}
            />
          </p>
          <p className="question">
            <label>Defensa</label>
            <input
              type="number"
              name="defense"
              value={data.defense}
              onChange={handleInputChange}
            />
          </p>
          <p className="question">
            <label>Velocidad</label>
            <input
              type="number"
              name="speed"
              value={data.speed}
              onChange={handleInputChange}
            />
          </p>
          <p className="question">
            <label>Altura</label>
            <input
              type="number"
              name="height"
              value={data.height}
              onChange={handleInputChange}
            />
          </p>
          <p className="question">
            <label>Peso</label>
            <input
              type="number"
              name="weight"
              value={data.weight}
              onChange={handleInputChange}
            />
          </p>
        </div>

        <div className="hiddenCB">
          <h1>Tipos</h1>
          <div className="tipos">
            {options?.map((t) => (
              <div key={t.id}>
                <input
                  type="checkbox"
                  name={t.name}
                  value={t.id}
                  id={t.id}
                  onChange={checkbox}
                />
                <label htmlFor={t.id}>{t.name}</label>
                {t.id % 4 === 0 ? <br /> : null}
              </div>
            ))}
            <input type="submit" value="Crear" className="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};
