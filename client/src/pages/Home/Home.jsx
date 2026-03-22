import React from "react";


export default function Home() {
  return (
    <>
      <main className=" w-full bg-white min-h-screen flex items-center">
        <div className="container mx-auto grid grid-cols-12 px-4 lg:px-20   ">
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-6">
            <h1 className="text-4xl font-bold mb-4 w-[70%]">
              Manage your Task on{" "}
              <span className="text-blue-600">Task duty</span>
            </h1>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              mollitia dolore quae, obcaecati qui architecto tempore, modi
              expedita sint similique blanditiis ratione exercitationem quos rem
              voluptates! Ullam quis natus aperiam aspernatur voluptatum aliquid
              asperiores exercitationem? Reprehenderit!
            </p>
            <a
  href="/alltask"
  className="inline-block border-2 border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition md:w-[30%] md:mx-auto lg:mx-0 text-center"
>
  Go to my task
</a>
          </div>

          <div className="col-span-12 lg:col-span-6 flex lg:justify-end md:justify-center items-center mt-20 lg:mt-0">
            <img src="/hero.png" alt="Hero" className="max-w-full h-auto" />
          </div>
        </div>
      </main>
    </>
  );
}
