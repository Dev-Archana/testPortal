import React from 'react';

function Navbar() {
    const menuItems = [
        { title: "Home", link: "/" },
        { title: "Features", link: "#" },
        { title: "Test Login", link: "/userlogin" },
        { title: "Admin Login", link: "#" },
        { title: "Contact", link: "#" }
    ];

    return (
        <div className="flex items-center justify-around gap-3 shadow-md pl-6">
            {/* Logo Section */}
            <img src="../public/images/dlithe.png" className="w-40" alt="Dlithe logo" />

            {/* Navigation Menu */}
            <nav>
                <ul className="flex gap-20 text-lg">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.link}
                                className="text-[hsl(0,0%,0%)] font-semibold hover:text-blue-500"
                            >
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;