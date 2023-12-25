const AboutUsCard = (imgURL, name, position, profURL) => {
  return (
    <div className="card w-auto bg-base-100 shadow-md">
      <figure className="px-5 pt-5">
        <img
          src={imgURL}
          alt="Profile Picture"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
};

export default AboutUsCard;
