// Fichero src/component/App.js
import { useState } from 'react';
import data from '../data/data.json';
import '../styles/App.scss';

const App = () => {
  const [clubs, setClubs] = useState(data);
  const [filter, setFilter] = useState('all');
  const [name, setName] = useState('');
  const [openOnWeekdays, setOpenOnWeekdays] = useState(false);
  const [openOnWeekend, setOpenOnWeekend] = useState(false);

  // events

  const handleFilter = (ev) => {
    setFilter(ev.target.value);
  };

  const handleName = (ev) => {
    setName(ev.target.value);
  };

  const handleOpenOnWeekDays = (ev) => {
    setOpenOnWeekdays(ev.target.checked);
  };

  const handleOpenWeekend = (ev) => {
    setOpenOnWeekend(ev.target.checked);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    clubs.push({
      name: name,
      openOnWeekdays: openOnWeekdays,
      openOnWeekend: openOnWeekend,
    });
    setClubs([...clubs]);
  };

  const handleRemove = (ev) => {
    const clubClickedIndex = ev.target.id;
    clubs.splice(clubClickedIndex, 1);
    setClubs([...clubs]);
  };

  // render

  const renderClubs = () => {
    return clubs
      .filter((club) => {
        if (filter === 'openOnWeekdays') {
          return club.openOnWeekdays === true;
        } else if (filter === 'openOnWeekend') {
          return club.openOnWeekend === true;
        }
        return true;
      })
      .map((club, index) => {
        return (
          <li key={index} className="club__item">
            <h2 className="club__name">
              #{index}: {club.name}
            </h2>
            <p className="club__open-weekdays">
              Abierto entre semana: {club.openOnWeekdays ? 'Sí' : 'No'}
            </p>
            <p className="club__open-on-weekend">
              Abierto el fin de semana: {club.openOnWeekend ? 'Sí' : 'No'}
            </p>
            <button
              className="club__remove-button"
              title="Borrar este club"
              id={index}
              onClick={handleRemove}
            >
              ×
            </button>
          </li>
        );
      });
  };

  return (
    <div className="page">
      <header className="header">
        <h1 className="header__title">Mis clubs</h1>
        <form className="filter">
          <label className="filter__label" htmlFor="openOnWeekdays">
            Mostrar
            <select
              className="filter__select"
              value={filter}
              onChange={handleFilter}
            >
              <option value="all">todos</option>
              <option value="openOnWeekdays">los que abren entre semana</option>
              <option value="openOnWeekend">
                los que abren el fin de semana
              </option>
            </select>
          </label>
        </form>
      </header>

      <ul className="club__list">{renderClubs()}</ul>

      <form className="new-club__form" onSubmit={handleSubmit}>
        <h2 className="new-club__title">Añadir un nuevo club</h2>
        <label className="new-club__label" htmlFor="name">
          <span className="new-club__label-text">Nombre del club</span>
          <input
            className="new-club__text"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
          />
        </label>
        <label className="new-club__label" htmlFor="openOnWeekdays">
          <span className="new-club__label-text">¿Abre entre semana?</span>
          <input
            className="new-club__check"
            type="checkbox"
            name="openOnWeekdays"
            id="openOnWeekdays"
            checked={openOnWeekdays}
            onChange={handleOpenOnWeekDays}
          />
        </label>
        <label className="new-club__label" htmlFor="openOnWeekend">
          <span className="new-club__label-text">
            ¿Abre los fines de semana?
          </span>
          <input
            className="new-club__check"
            type="checkbox"
            name="openOnWeekend"
            id="openOnWeekend"
            checked={openOnWeekend}
            onChange={handleOpenWeekend}
          />
        </label>
        <button className="new-club__btn">Añadir un nuevo club</button>
      </form>
    </div>
  );
};

export default App;
