import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center bg-white max-w-[1092px] m-auto">
      <p className="flex justify-center font-extrabold text-black pt-11 text-4xl max-md:text-3xl text-center">
        Aplikacija za praćenje dolaznosti studenata, dobrodošli!
      </p>
      <p className="max-w-[1024px] mt-11 mb-5 font-light text-black md:text-center m-auto max-md:px-6">
      Ova aplikacija zadužena je za praćenje dolaznosti studenata. Aplikacija se sastoji od dvije stranice.
      Prva stranica omogućava studentu da vidi svoje dolaznosti na kolegije koje pohađa.
      Druga stranica prikazuje profesorov pogled, gdje može vidjeti koliko je student redovito dolazio na njegova predavanja.
      </p>
      <Link className="m-auto my-[15px]" href={"/login"}>
        <span className="scheduleButton hover:bg-[#2980b9] transition duration-300">
          Pogledaj status studenata
        </span>
      </Link>
    </main>
  );
}