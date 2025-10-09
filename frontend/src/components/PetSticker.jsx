const PetStickers = () => {
  return (
    <>
      {/* Sticker góc trên trái */}
      <div className="fixed bottom-2 left-12 z-40 w-20 h-20 sm:w-96 sm:h-96">
        <img 
          src="/gao.png" 
          alt="Gạo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>

      {/* Sticker góc dưới trái */}
      <div className="fixed bottom-64 right-8 z-40 w-20 h-20 sm:w-96 sm:h-96">
        <img 
          src="/socgao.png" 
          alt="sóc gạo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>

      {/* Sticker góc dưới phải */}
      <div className="fixed bottom-182 left-112 z-100 w-28 h-48 sm:w-36 sm:h-36">
        <img 
          src="/soc.png" 
          alt="sóc"
          className=" object-contain drop-shadow-lg"
        />
      </div>
    </>
  );
};

export default PetStickers;