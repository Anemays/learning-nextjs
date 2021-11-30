import { getSSP } from '../../lib/props/serverSide';
import {
    Button
} from '@chakra-ui/react';
import {
    useState,
    useReducer,
    useEffect
} from 'react';

export const getServerSideProps = getSSP();

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case 'dataLoaded':
            const { data } = action;
            console.log(data)
            return { ...state, data };
    }

    return state;
}

export default function Main() {
    //const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState(initialState);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        async function getData() {
            const resp = await fetch('/api/data');
            const json = await resp.json();
            setData(json);
            setRefresh(false);
        }

        if (!refresh) return;
        getData();
    }, [refresh]);

    return (
        <>
            <Button onClick={() => setRefresh(true)}>Refresh</Button>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Excerpt</th>
                </tr>

                {data.map(row => {
                    const { id, title, excerpt } = row;
                    return (
                        <tr>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{excerpt}</td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}
