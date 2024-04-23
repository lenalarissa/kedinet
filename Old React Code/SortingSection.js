import React, { useState } from 'react';
import './SortingSection.css';

const SortingSection = () => {

    const [selectedOption, setSelectedOption] = useState('newest-oldest');

    const handleSortChange = (event) => {
        setSelectedOption(event.target.value);
        // sorting the list in a new way needs connection to backend
    };

    return (
        <div className="container mt-3 sorting-section">
            <div className="row justify-content-end">
                <div className="col-auto">
                    <label className="mr-2">Sort by:</label>
                </div>
                <div className="col-auto">
                    <div className="form-group">
                        <label htmlFor="sortOptions"></label>
                        <select
                            className="form-control form-control-sm"
                            id="sortOptions"
                            value={selectedOption}
                            onChange={handleSortChange}
                        >
                            <option value="newest-oldest">Addition (newest to oldest)</option>
                            <option value="oldest-newest">Addition (oldest to newest)</option>
                            <option value="young-old">Age (young to old)</option>
                            <option value="old-young">Age (old to young)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingSection;
