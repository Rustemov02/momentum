const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner hissəsi */}
      <div className="w-12 h-12 rounded-full border-4 border-gray-800 border-t-blue-500 animate-spin"></div>

      {/* (İstəyə bağlı) Yazı hissəsi */}
      <span className="text-gray-400 text-sm font-medium animate-pulse">
        Yüklənir...
      </span>
    </div>
  );
};

export default Loader;
