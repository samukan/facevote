import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router';

const Home = () => {
  return (
    <>
      <h1 className="text-center p-4 text-lg">Home</h1>
      <section>
        <p>Number of faces in database: X</p>
        <p>Number of votes in database: Y</p>
      </section>
      <section>
        <h3>Results</h3>
        <div>
          <p>Positives: 0</p>
          <p>Negatives: 0</p>
        </div>
      </section>
      <section>
        <h3>Actions</h3>
        <NavLink to={'/face'}>
          <Button>Start Voting</Button>
        </NavLink>
        <Button>Reset Database</Button>
      </section>
    </>
  );
};

export default Home;
