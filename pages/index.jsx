import NavBar from '../components/header/navbar';
import { getSSP } from '../lib/props/serverSide';
import {
    Button
} from '@chakra-ui/react';
import {
    useState,
    useReducer
} from 'react';

export const getServerSideProps = getSSP();

function getPageData(data_per_page, page, data) {
    return data.slice((page - 1) * data_per_page, page * data_per_page);
}

function reducer(state, action) {
    let {
        data_per_page,
        page,
        data_shown,
        data
    } = state;
    switch (action.type) {
        case 'increment':
            return {
                data_per_page,
                page: page + 1,
                data_shown: getPageData(data_per_page, page + 1, data),
                data
            }
        case 'decrement':
            return {
                data_per_page,
                page: page - 1,
                data_shown: getPageData(data_per_page, page - 1, data),
                data
            }
        case 'reset':
            return {
                data_per_page,
                page: 1,
                data_shown: getPageData(data_per_page, 1, data),
                data
            }
        default:
            throw new Error();
    }
}

function Main({ rows }) {
    let initialState = {
        data_per_page: 2,
        page: 1,
        data_shown: [],
        data: rows
    };
    initialState.data_shown = getPageData(
        initialState.data_per_page,
        initialState.page,
        initialState.data
    );
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <NavBar></NavBar>
            {rows.map(row => {
                const keys = Object.keys(row);
                const items = keys.map(key => {
                    const value = row[key];
                    return <li>{key}: {value}</li>;
                })

                return items;
            })}
            <Button onClick={() => dispatch({type: 'reset'})}>Reset</Button>
            <Button onClick={() => dispatch({type: 'decrement'})}>-</Button>
            {'Page: '}
            <Button>{state.page}</Button>
            <Button onClick={() => dispatch({type: 'increment'})}>+</Button>
            <ol>
                {state.data_shown.map(row => {
                    const keys = Object.keys(row);
                    const items = keys.map(key => {
                        const value = row[key];
                        return <li>{key}: {value}</li>;
                    })

                    return items;
                })}
            </ol>
        </>
    )
}

export default Main;
