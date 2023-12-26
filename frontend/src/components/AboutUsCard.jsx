import linkedIn from "../assets/linkedIn.svg";

const AboutUsCard = ({ imgURL, name, position, profURL }) => {
  return (
    <div className="card bg-base-100 shadow-md mb-2 rounded-3xl object-cover w-full">
      <figure className="px-2 pt-5">
        <img
          src={imgURL}
          alt="Profile Picture"
          className="rounded-full h-24 w-24 object-cover"
        />
      </figure>
      <div className="items-center text-center justify-center flex-direction-column m-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <h2 className="text-l font-medium">{position}</h2>
        <a href={profURL} target="_blank" rel="noopener noreferrer">
          <button>
            <img src={linkedIn} className="w-6 object-cover absolute right-[41%] bottom-2  " />
          </button>
        </a>
      </div>
    </div>
  );
};

export default AboutUsCard;
