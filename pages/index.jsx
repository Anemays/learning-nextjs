import NavBar from '../components/header/navbar';
import { getSSP } from '../lib/props/serverSide';

export const getServerSideProps = getSSP();

function Main ({ posts }) {
    return (
        <>
            <NavBar></NavBar>
        </>
    )
}

export default Main;
