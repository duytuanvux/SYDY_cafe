const HomePage = () => {
  return (
    <div>
      <div className="relative">
        <video
          className="h-auto object-cover"
          preload="auto"
          autoPlay
          muted
          loop
        >
          <source src="src\assets\img\landing.mp4" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center tracking-wider leading-relaxed  text-5xl text-base-cream cursor-none">
          Making every day better.
        </div>
      </div>
    </div>
  );
};

export default HomePage;
