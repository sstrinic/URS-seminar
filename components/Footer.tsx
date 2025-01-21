import Icons from "@/components/icons/FooterIcons";
import Link from "next/link";

export type Page = {
  href: string;
  title: string;
};

const pages: Page[] = [
  { href: "/", title: "Log in" },
  { href: "/services", title: "Student View" },
  { href: "/contact", title: "Profesor View" },
];

const Footer = () => (
  <footer>
    <div className="flex flex-col py-5 mt-[3rem] items-center gap-4 text-white [font-family:'Cinzel',Helvetica] text-center">
      <h6 className="text-white font-thin [font-family:'Cinzel',Helvetica] tracking-[2.96px] [text-shadow:0px_5px_4px_#000000bd] text-2xl">Attendance app<span className="relative text-xs align-top">®</span></h6>
      <div className="flex flex-col">
        <ul className="flex flex-row gap-4 mb-3">
          {pages.map(({ href, title }) => (
            <li key={href}>
              <Link href={href}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
         
      </div>
      <p className="font-thin text-xs">
        ©2025. Attendance app. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
