import './FilteringSection.css';

const FilteringSection = () => {
    return (
        <div className="filtering-section">
            <div className="container mt-4">
                {/* First Row */}
                <div className="row">
                    {/* Postcode */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>
                                    <select className="form-control full-width">
                                        <option value="">Postcode</option>
                                        {/* Add postcode options here */}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Breed */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>
                                    <select className="form-control full-width">
                                        <option value="">Breed</option>
                                        {/* Add breed options here */}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Can live with... */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>
                                    <select className="form-control full-width">
                                        <option value="">Can live with...</option>
                                        {/* Add options here */}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Color */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>
                                    <select className="form-control full-width">
                                        <option value="">Color</option>
                                        {/* Add color options here */}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Second Row */}
                <div className="row">
                    {/* Age */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>Age:</label>
                                <div className="input-group">
                                    <input type="number" className="form-control" id="minAge" placeholder="Min"/>
                                    <span className="input-group-text">-</span>
                                    <input type="number" className="form-control" id="maxAge" placeholder="Max"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Gender */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>Gender:</label><br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="gender" id="female"
                                           value="female"/>
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="gender" id="male"
                                           value="male"/>
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Indoor Cat */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>Indoor Cat:</label><br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="indoorCat" id="indoorYes"
                                           value="yes"/>
                                    <label className="form-check-label" htmlFor="indoorYes">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="indoorCat" id="indoorNo"
                                           value="no"/>
                                    <label className="form-check-label" htmlFor="indoorNo">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Size */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>Size:</label><br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="size" id="small"
                                           value="small"/>
                                    <label className="form-check-label" htmlFor="small">Small</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="size" id="medium"
                                           value="medium"/>
                                    <label className="form-check-label" htmlFor="medium">Medium</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="size" id="big"
                                           value="big"/>
                                    <label className="form-check-label" htmlFor="big">Big</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Coat Length */}
                    <div className="col">
                        <div className="filter-box">
                            <div className="form-group">
                                <label>Coat Length:</label><br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="coatLength" id="short"
                                           value="short"/>
                                    <label className="form-check-label" htmlFor="short">Short</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="coatLength"
                                           id="mediumLength" value="medium"/>
                                    <label className="form-check-label" htmlFor="mediumLength">Medium</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="coatLength" id="long"
                                           value="long"/>
                                    <label className="form-check-label" htmlFor="long">Long</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Add remaining filters here */}
                </div>
                {/* Third Row */}
                <div className="row align-items-center">
                    {/* Spacing column to align the reset button */}
                    <div className="col-lg-9"></div>
                    {/* Reset Button */}
                    <div className="col-lg-3">
                        <div className="row justify-content-end">
                            <div className="col-auto align-self-center">
                                <button type="button" className="btn btn-secondary btn-block reset-btn">Reset all
                                    Filters
                                </button>
                            </div>
                            {/* Search Button */}
                            <div className="col-auto align-self-center">
                                <button type="button" className="btn btn-primary btn-block search-btn">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilteringSection;