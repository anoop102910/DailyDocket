function Avatar({ w, src ,username}) {
    return (
      <div>
        {src ? (
          <img className={`w-[${w}] h-[${w}]  object-cover  object-center rounded-full `} src={src} alt="" />
        ) : (
          <img className={`w-[${w}] h-[${w}]   object-cover object-center rounded-full `} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${username}&size=48&backgroundColor=b6e3f4,c0aede,d1d4f9`} alt="" />
        )}
      </div>
    );
  }
  
  export default Avatar;
  