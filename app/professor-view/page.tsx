import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center bg-white max-w-[1092px] m-auto">
      <p className="flex justify-center font-extrabold text-black pt-11 text-4xl max-md:text-3xl text-center">
        Aplikacija za praćenje statusa dobrodošli!
      </p>
      <p className="max-w-[1024px] mt-11 mb-5 font-light text-black md:text-center m-auto max-md:px-6">
      Aplikacija za praćenje aktivnosti studenata i profesora omogućava jednostavno praćenje prisutnosti i aktivnosti u obrazovnom okruženju. 
      Korisnici mogu pregledati i upravljati statusima prisutnosti, pregledati povijest aktivnosti te generirati izvještaje. 
      Aplikacija je dizajnirana da poboljša administraciju i komunikaciju između studenata i nastavnog osoblja.
      </p>
      <Link className="m-auto my-[15px]" href={"/student-status"}>
        <span className="scheduleButton hover:bg-[#2980b9] transition duration-300">
          Pogledaj status studenata
        </span>
      </Link>
    </main>
  );
}