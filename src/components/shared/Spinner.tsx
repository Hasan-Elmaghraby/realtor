import spinner from "../../assets/images/spinner.svg";

export const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black/50">
      <div>
        <img src={spinner} alt="Loading ..." className="w-24 mx-auto" />
      </div>
    </div>
  );
};
