import "./Filter.css";

const Filter = ({ searchBar, setSearchBar, type, setPage }) => {
  return (
    <form>
      <label htmlFor="search">
        <input
          type="search"
          name="search"
          id="search"
          placeholder={`Search through our ${type} database`}
          onChange={(event) => {
            setPage(1);
            setSearchBar(event.target.value);
          }}
          value={searchBar}
        />
      </label>
    </form>
  );
};

export default Filter;
