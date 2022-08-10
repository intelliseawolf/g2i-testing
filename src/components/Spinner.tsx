const Spinner = () => {
  return (
    <div className="flex justify-center items-center mx-auto">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
