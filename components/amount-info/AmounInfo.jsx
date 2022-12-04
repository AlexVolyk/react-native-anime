import React from 'react'
import { View } from 'react-native'
import TotalAmount from '../TotalAmount'


const AmounInfo = ({ totalAmount, currentAmount, prevCurrentAmount }) => {
    return (
        totalAmount && currentAmount && <View style={{
        }}>
            {
                totalAmount && <TotalAmount
                    totalAmount={totalAmount}
                />
            }
            {
                currentAmount && <TotalAmount
                    totalAmount={currentAmount}
                    prevCurrentAmount={prevCurrentAmount}
                    topSpace={60}
                    color={'black'}
                    backgroundColor={'rgba(50, 214, 47, 0.3)'}
                />
            }
        </View>
    )
}

export default AmounInfo