import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    filter: {
        anime: {},
        animesforwatchings: {}
        // "recomennded": ['true'],
        // "year": ["2022"]
    }
}

// const filterSlice = (initialState , action)
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilter: (state, { payload, type }) => {
            // console.log(state, payload);
            let nameType = payload.nameType
            let name = payload.title
            let fil = state.filter.anime

            // console.log(nameType, 'nameType');
            // console.log(name, 'name');
            // console.log(fil, 'fil');

            if (!fil[nameType]) {
                fil[nameType] = [name]
            } else {
                if (!fil[nameType].includes(name)) {
                    fil[nameType] = [...fil[nameType], name]


                }
            }
            // return state.filter = fil

            // setFilter(prev => {
            // let fil = state.filter
            // if (!fil[nameType]) {
            //     fil[nameType] = [name]
            // } else {
            //     if (!fil[nameType].includes(name)) {
            //         fil[nameType] = [...fil[nameType], name]

            //     }
            // }
            // // console.log(prev);
            // return state.filter = fil
            // })
            //     console.log(name, 'add');
        },
        removeFilter: (state, { payload, type }) => {
            // console.log(state, payload);
            let nameType = payload.nameType
            let name = payload.title
            let fil = state.filter.anime

            if (fil[nameType] && fil[nameType].includes(name)) {
                fil[nameType] = fil[nameType].filter((n) => {
                    if (n !== name) {
                        // console.log(n, 'n');
                        return n !== name
                    }
                })
            }
            // return fil
        },
        resetFilter: (state) => {
            state.filter.anime = {}
        },

        addFilterF: (state, { payload, type }) => {
            // console.log(state, payload);
            let nameType = payload.nameType
            let name = payload.title
            let fil = state.filter.animeFW

            // console.log(nameType, 'nameType');
            // console.log(name, 'name');
            // console.log(fil, 'fil');

            if (!fil[nameType]) {
                fil[nameType] = [name]
            } else {
                if (!fil[nameType].includes(name)) {
                    fil[nameType] = [...fil[nameType], name]


                }
            }
            // return state.filter = fil

            // setFilter(prev => {
            // let fil = state.filter
            // if (!fil[nameType]) {
            //     fil[nameType] = [name]
            // } else {
            //     if (!fil[nameType].includes(name)) {
            //         fil[nameType] = [...fil[nameType], name]

            //     }
            // }
            // // console.log(prev);
            // return state.filter = fil
            // })
            //     console.log(name, 'add');
        },
        removeFilterF: (state, { payload, type }) => {
            // console.log(state, payload);
            let nameType = payload.nameType
            let name = payload.title
            let fil = state.filter.animeFW

            if (fil[nameType] && fil[nameType].includes(name)) {
                fil[nameType] = fil[nameType].filter((n) => {
                    if (n !== name) {
                        // console.log(n, 'n');
                        return n !== name
                    }
                })
            }
            // return fil
        },
        resetFilterF: (state) => {
            state.filter.animeFW = {}
        }
        
    }
})

export const { addFilter, removeFilter, resetFilter, addFilterF, removeFilterF, resetFilterF } = filterSlice.actions

export default filterSlice.reducer
// function addFilterObject(name, nameType) {
//     setFilter(prev => {
//         if (!prev[nameType]) {
//             prev[nameType] = [name]
//         } else {
//             if (!prev[nameType].includes(name)) {
//                 prev[nameType] = [...prev[nameType], name]

//             }
//         }
//         // console.log(prev);
//         return prev
//     })
//     console.log(name, 'add');
// }

// function removeFilterObject(name, nameType) {
//     setFilter(prev => {
//         if (prev[nameType] && prev[nameType].includes(name)) {
//             prev[nameType] = prev[nameType].filter((n) => {
//                 if (n !== name) {
//                     // console.log(n, 'n');
//                     return n !== name
//                 }
//             })
//         }
//         return prev
//     })
//     console.log(name, 'remove');

// }