import React from "react";
import Link from "next/link";
import { navItems } from "./navItems";

interface INav extends React.ComponentPropsWithoutRef<'nav'> {}

export const Nav:React.FC<INav> = () => {
    return (
        <div className="mr-6 flex items-center space-x-4">
            {
                navItems.map((item, idx) => (
                    <Link key={idx} href={item.link}>
                        <a className="px-4 text-white font-light tracking-[0.15rem] hover:underline"> {item.name} </a>
                    </Link>
                ))
            }
        </div>
    );
};

