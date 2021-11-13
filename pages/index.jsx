import NavBar from '../components/header/navbar';
import { getSSP } from '../lib/props/serverSide';

export const getServerSideProps = getSSP();

function Main ({ rows }) {
    return (
        <>
            <NavBar></NavBar>
            <ol>
                {rows.map(row => {
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
