import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
      <img
        src="not-found.png"
        alt="not found"
        className="max-w-full w-96 "
      />

      <p className="text-xl font-semibold">Trang này không có gì hết đâu Thuý, quay về nha 🥰</p>

      <a
        href="/"
        className="inline-block px-6 py-3 mt-8 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
      >
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFound;