const Home = () => {
  return (
    <>
      <h1>Home</h1>
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
        <button>Start Voting</button>
        <button>Reset Database</button>
      </section>
    </>
  );
};

export default Home;
