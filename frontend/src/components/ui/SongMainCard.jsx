function SongMainCard({ cardRef, imageSrc, alt, content }) {


  return (
    <div
      className="song  flex flex-col w-120 h-83 "
      ref={cardRef}
      imageSrc={imageSrc}
    >

      <img
        src={imageSrc}
        alt={alt}
        className="w-full object-cover h-68 rounded-md shadow-2xl"
      />
      <div>{content}</div>
      <div>Shan Khan</div>
    </div>
  );
}

export default SongMainCard;
