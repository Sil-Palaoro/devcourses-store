"use client"
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <>
            <header>
                <h1>
                    <Link href="/" title="Devcourses Store">
                      Devcourses Store
                    </Link>
                </h1>

                <nav>
                    <ul >
                        <li >
                          <Link title="Home" href="/">Home</Link>
                        </li>          
                        <li>
                          <Link href="#projects" title="Projects" ></Link>
                        </li>
                        <li>
                          <Link href="#skills" title="Skills"></Link>
                        </li>
                        <li>
                          <Link href="#about" title="About"></Link>
                        </li>     
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default NavBar;