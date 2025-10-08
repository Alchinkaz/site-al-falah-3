"use client"

export default function CTASection() {
  return (
    <section className="py-24 font-inter" style={{ backgroundColor: "#1e1a61" }}>
      <div className="max-w-[22rem] sm:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#1e1a61] rounded-3xl p-8 shadow-xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            What future are you building?
            <br />
            We'd love to connect.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-end items-center">
            <a
              href="https://wa.me/77053333082"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-black px-8 h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center whitespace-nowrap w-full sm:w-auto"
            >
              Schedule a Meeting
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
