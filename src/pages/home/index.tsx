const Home = (): JSX.Element => {
  return (
    <div className="flex items-center">
      <div className="g-parallax-container">home</div>
      <button
        className="rounded bg-green-800 px-1 py-2 text-lg text-white hover:bg-green-600"
        type="button"
      >
        count+
      </button>
    </div>
  );
};

export default Home;
