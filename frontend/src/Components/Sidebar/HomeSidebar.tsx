import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiSettings4Line, RiFeedbackLine} from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiAuctionLine } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { CiCircleList } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { LuArrowRightLeft } from "react-icons/lu";

import IAuth from "../../interfaces/IAuth";

const HomeSidebar: React.FC<IAuth> = ({ isAuth, user, role }) => {
    const authMenus = [
        { name: "User", link: `/user/${user ? user : ''}`, icon: AiOutlineUser },
        { name: "Notifications", link: "/notification", icon: IoMdNotificationsOutline },
        { name: "Analytics", link: "/analytics", icon: TbReportAnalytics },
        { name: "My Bids", link: "/my-bids", icon: RiAuctionLine, margin: true },
        { name: "My Listing", link: "/my-listings", icon: FiFolder },
        { name: "Trade Request", link: "/my-trade", icon: LuArrowRightLeft },
        { name: "Transactions", link: "/transactions", icon: FiShoppingCart },
        { name: "Watchlist", link: "/watchlist", icon: AiOutlineHeart },
        { name: "Settings", link: `/user/edit/${user ? user : ''}`, icon: RiSettings4Line, margin: true },
        { name: "Feedback", link: "/feedback", icon: RiFeedbackLine }
    ];

    const notAuthMenus = [
        { name: "Login", link: `/login`, icon: AiOutlineUser },
        { name: "Signup", link: "/signup", icon: SlLogout },
    ];

    const adminMenus = [
        { name: "Dashboard", link: `/admin`, icon: MdDashboard },
        { name: "User Management", link: "/admin/user-management", icon: AiOutlineUser, margin: true },
        { name: "Listing Management", link: "/admin/listing-management", icon: CiCircleList },
        { name: "System Management", link: "/admin/system-management", icon: RiSettings4Line },
        { name: "Feedback Management", link: "/admin/feedback-management", icon: RiFeedbackLine }
    ];

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menusToRender = isAuth ? (role === "ADMIN" ? adminMenus : authMenus) : notAuthMenus;

    return (
        <div className={`bg-gray-800 min-h-screen ${isOpen ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 z-100`}>
            <div className="py-3 flex justify-end">
                <HiMenuAlt3
                    size={26}
                    className="cursor-pointer"
                    onClick={toggleSidebar}
                />
            </div>
            <div className="mt-4 flex flex-col gap-4">
                {menusToRender.map((menu, i) => (
                    <Link
                        to={menu.link}
                        key={i}
                        className={`${menu.margin ? "mt-5" : ""} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-700 rounded-md`}
                    >
                        <div>{React.createElement(menu.icon, { size: "20" })}</div>
                        <h2
                            style={{ transitionDelay: `${i + 3}00ms` }}
                            className={`whitespace-pre duration-500 ${!isOpen ? "opacity-0 translate-x-28 overflow-hidden" : ""}`}
                        >
                            {menu.name}
                        </h2>
                        <h2
                            className={`${
                                isOpen ? "hidden" : ""
                            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                        >
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeSidebar;
