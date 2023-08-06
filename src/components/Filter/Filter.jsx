import "./Filter.css";

const Filter = ({ searchBar, setSearchBar, type }) => {
  return (
    <form>
      <label htmlFor="search">
        <input
          type="search"
          name="search"
          id="search"
          placeholder={`Search through our ${type} database`}
          onChange={(event) => {
            setSearchBar(event.target.value);
          }}
          value={searchBar}
        />
      </label>
    </form>
  );
};

export default Filter;
