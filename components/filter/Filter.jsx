import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import SwitchCostume from '../switch/SwitchCostume';
import FilterCheckbox from './filter-checkbox/FilterCheckbox';



const Filter = ({ filterData, pathName }) => {


    function isChecked(filter, name, nameType) {
        // console.log(filter,'filter');
        // console.log(filter[nameType].includes(name), 'filter[nameType].includes(name)');
        if (filter[nameType]) {
            // console.log('filter[nameType]', filter[nameType]);
            return filter[nameType].includes(name)
        }
        return false

    }

    // console.log(toCapitalize(filterData.nameType));

    return (
        <>
            {
                filterData.nameType != 'recomennded' ?
                    <FilterCheckbox
                        filterData={filterData}
                        nameType={filterData.nameType}
                        name={filterData.name}
                        isChecked={isChecked}
                        pathName={pathName}
                    />
                    :
                    <SwitchCostume
                        nameType={filterData.nameType}
                        name={filterData.name}
                        isChecked={isChecked}
                    />
            }
        </>

    )

}

export default Filter