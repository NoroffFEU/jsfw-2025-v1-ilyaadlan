// SearchBar for my shop project
// Lets user search products. Used Bootstrap input group.
export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group mb-3 mx-auto" style={{ maxWidth: '320px' }}>
      <span className="input-group-text" id="search-icon" aria-label="Snowflake" role="img">❄️</span>
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={value}
        onChange={onChange}
        aria-label="Search products"
        aria-describedby="search-icon"
      />
    </div>
  );
}
