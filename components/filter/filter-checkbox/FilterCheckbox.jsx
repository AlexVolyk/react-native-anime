import React from 'react'
import Checkbox from '../../checkbox/Checkbox'
import FilterTitle from '../../filter-title/FilterTitle'



const FilterCheckbox = ({ filterData, name, nameType, isChecked, pathName }) => {
    return (
        <>
            <FilterTitle name={name} />
            {
                filterData.data && filterData.data.map((i) =>
                    <Checkbox
                        key={i}
                        nameType={nameType}
                        name={i}
                        isChecked={isChecked}
                        pathName={pathName}
                    />
                )
            }
        </>
    )
}

export default FilterCheckbox