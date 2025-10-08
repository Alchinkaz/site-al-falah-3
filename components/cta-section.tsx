"use client"

export default function CTASection() {
  return (
    <section className="py-24 font-inter" style={{ backgroundColor: "#1e1a61" }}>
      <div className="max-w-[22rem] sm:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#1e1a61] rounded-3xl p-8 shadow-xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          What future are you building?
          <br />
          We'd love to connect.
        </h2>
      </div>
    </section>
  )
}
