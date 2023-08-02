// import { useEffect } from "react";
import { useState } from "react";
import "./Cep.css";

const Cep = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const fetchingCep = (e) => {
    e.preventDefault();
    if (cep === "") {
      setError(true);
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setAddress(data);
          setError(false);
        })
        .catch((err) => console.log("Erro " + err));
    }
  };

  return (
    <>
      <div className="cep">
        <h1 className="cepTitle">Busque por seu CEP:</h1>
        {error && <h1 className="error">Digite o cep Corretamente</h1>}
        <div className="searchCep">
          <label htmlFor="cep">Digite seu cep:</label>
          <input
            onBlur={fetchingCep}
            type="text"
            onChange={(e) => setCep(e.target.value)}
            className="inputCep"
            htmlFor="cep"
          />
        </div>
        <div className="cepInformation">
          <div className="item">
            <p>Cep:</p>
            <span>{address.cep}</span>
          </div>
          <div className="item">
            <p>Estado:</p>
            <span>{address.uf}</span>
          </div>
          <div className="item">
            <p>Cidade:</p>
            <span>{address.localidade}</span>
          </div>
          <div className="item">
            <p>Localidade:</p>
            <span>{address.logradouro}</span>
          </div>
          <div className="item">
            <p>Bairro: </p>
            <span>{address.bairro}</span>
          </div>
          <div className="item">
            <p>Complemento:</p>
            {address.complemento === "" ? (
              <span>{address.complemento}Não há complemento</span>
            ) : (
              <span>{address.complemento}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cep;
