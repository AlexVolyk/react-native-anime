import React from 'react'
import { Text, View } from 'react-native'


const FilterTitle = ({ name }) => {
    return (
        <View style={{
            marginTop: 5,
            marginBottom: 5,
            paddingLeft: 10,
            paddingBottom: 5,
            borderBottomWidth: 0.5,
            borderBottomColor: 'grey',
        }}>
            <Text style={{
                fontSize: 18,
                color: 'grey'
            }}>
                {name}
            </Text>
        </View>
    )
}

export default FilterTitle