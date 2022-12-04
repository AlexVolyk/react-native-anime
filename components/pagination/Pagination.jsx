import React, { useEffect, useState } from 'react'
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native'
import { Link } from '@react-navigation/native'
import * as _ from 'lodash'

const Pagination = ({ perPage, amount, page, objNames, name, title }) => {
    // console.log(title);
    // console.log(perPage, amount, page, name);
    // console.log(perPage, 'pagination');
    if (perPage === null) {
        return null
    }
    const pagesGet = Math.ceil(amount / perPage)

    const [pages, setPages] = useState(_.range(0, pagesGet))
    // const [isAboveZero, setIsAboveZero] = useState(false)
    // console.log(pages);
    // console.log(amount, 'amount');
    // const width = Dimensions.get('screen').width
    // console.log(width);
    // console.log(page, 'current_page');
    // console.log(amount, 'amount');
    // console.log(pagesGet, 'pagesGet');
    useEffect(() => {
        setPages(_.range(0, pagesGet))
        // if (condition) {

        // }
    }, [amount, name])


    const pagination = pages.map(p => {

        const to = title ? {
            screen: name,
            params: {
                page: p,
                title
            }
        } : {
            screen: name,
            params: {
                page: p,
            }
        }

        return (
            <Link
                key={p}
                to={to}
                style={[{
                    backgroundColor: page === p ? 'rgba(176, 176, 176, 0.7)' : 'rgba(63, 54, 58, 0.8)',
                    color: page === p ? 'red' : 'yellow',
                }, style.page_number]}>
                <Text>{p + 1}</Text>
            </Link>
        )
    }
    )


    return (
        // {
        <KeyboardAvoidingView behavior={'height'} style={{}}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    // backgroundColor: 'red',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    height: pages.length > 1 ? 56 : 0,
                    // height: 0 > 1 ? 56 : 0,
                    // height: 56,
                    // flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} style={[style.pagination_inner,
                    //  {width: width}
                ]}>
                {
                    // 0 > 1 && (
                    //     pagination
                    // )
                    pages.length > 1 && (
                        pagination
                    )
                }
            </ScrollView>
        </KeyboardAvoidingView>

        // }
    )
}

const style = StyleSheet.create({
    pagination_inner: {
        // width: 300,
        color: 'red',
        // flex: 3,
        // overflow: 'visible',
        // backgroundColor: 'darkblue',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignContent: 'center',
        alignSelf: 'center',
        // alignItems: 'flex-end',
        // alignItems: 'center',
        // height: 50,
        marginBottom: 60,
    },
    page_number: {
        marginHorizontal: 4,
        paddingHorizontal: 18,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 44,
        borderRadius: 4,
        shadowColor: '#ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 32,
    }
})

export default Pagination