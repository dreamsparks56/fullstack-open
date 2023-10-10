const Filter = ({ filter, description, onChange }) => 
  <div>
    {description}
    <input value={filter} onChange={onChange}/>
  </div>

export default Filter