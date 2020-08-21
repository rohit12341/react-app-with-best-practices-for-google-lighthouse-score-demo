import React from 'react';


const Filter = (props) => {

    const {years, handleChange} = props;

    return (
        <div className="col-md-2 filter">
      <h3>Filters</h3>
      <p>Launch year</p>
      <div className="launch-year">
       {years.map((year, i)=>(
         <label key={i} className="item">
         <input type="radio"  onChange={handleChange} name="launch_year" value={year} />
         <span className="checkmark">{year}</span>
         </label>
        ))}
      </div>    

      <p>Successful launch</p>
      <div className="launch-year">
      <label className="item">
          <input type="radio" onChange={handleChange}   value="true" name="launch_success" />
          <span className="checkmark">True</span>
        </label>
        <label className="item">
          <input type="radio" onChange={handleChange}   value="False" name="launch_success" />
          <span className="checkmark">False</span>
        </label>
       </div>

      <p>Successful landing</p>
      <div className="launch-year">
      <label className="item">
          <input type="radio" onChange={handleChange}   value="true" name="landing" />
          <span className="checkmark">True</span>
        </label>
        <label className="item">
          <input type="radio" onChange={handleChange}   value="False" name="landing" />
          <span className="checkmark">False</span>
        </label>
      </div>
     </div>
    )
}


export default Filter;