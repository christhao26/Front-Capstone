import React from 'react';
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
// import * as RiIcons from "react-icons/gr";
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";
import * as BsIcons from "react-icons/bs";




export const SidebarData = [
    // We can copy this little code as many times as we want to create different menu
    {
        title: 'Cranban',
        path:  '/',
        icon:<FcIcons.FcGenericSortingDesc/>,
        cName: 'nav-text'

    },
    {
        title: 'CranBan Board',
        path:  '/Home',
        icon:<BsIcons.BsKanban/>,
        cName: 'nav-text'

    },

    {
        title: 'Reports',
        path:  '/reports',
        icon:<IoIcons.IoIosPaper/>,
        cName: 'nav-text'

    },
    {
        title: 'Roadmap',
        path:  '/products',
        icon:<RiIcons.RiRoadMapLine/>,
        cName: 'nav-text'

    },
    {
        title: 'Issues',
        path:  '/team',
        icon:<HiIcons.HiOutlineDesktopComputer/>,
        cName: 'nav-text'

    },
   
    {
        title: 'Project Settings',
        path: '/support',
        icon: <RiIcons.RiSettingsLine/>,
        cName: 'nav-text'
      },
];

