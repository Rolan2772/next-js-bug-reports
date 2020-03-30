import {of} from 'rxjs';
import {delay} from "rxjs/operators";


const Home = ({nonExistingObject}) => (
    <div className="container">

        <main>
            <h1>
                Welcome: {nonExistingObject.value}
            </h1>
        </main>

    </div>
);

Home.getInitialProps = async ctx => {
    // Fetch non static data from external API
    const res = of({name: 'test'}).pipe(delay(1000)).toPromise();
    return await res;
};

export default Home
