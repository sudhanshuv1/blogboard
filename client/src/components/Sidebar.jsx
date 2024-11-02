import { useState } from 'react'
import SidebarLink from './SidebarLink'
import { useLocation } from 'react-router-dom'
import { MdOutlinePostAdd } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { TbLayout2 } from "react-icons/tb";
import { PiLayoutFill } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { LiaComments } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {

  const sidebarLinks = [
    {
      text: 'Create Post',
      path: 'post/:id',
      icon: () => {
        return (
          <MdOutlinePostAdd className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Home',
      path: '',
      icon: () => { 
        return (
          <IoHomeOutline className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Layout',
      path: 'layout',
      icon: () => {
        return (
          <TbLayout2 className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Themes',
      path: 'themes',
      icon: () => {
        return (
          <PiLayoutFill className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Views',
      path: 'views',
      icon: () => {
        return (
          <IoEye className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Comments',
      path: 'comments',
      icon: () => {
        return (
          <LiaComments className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Settings',
      path: 'settings',
      icon: () => {
        return (
          <IoSettingsOutline className="inline text-3xl pb-1"/>
        )
      }
    }
  ];

  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useLocation();
  let selectedIndex = sidebarLinks.findIndex(link => link.path === pathname);
  const [selected, setSelected] = useState(selectedIndex);

  return (
    <section className="fixed mr-auto h-[calc(100vh-3rem)] border-2 w-60 top-14">
      <ul className="p-2 h-3/6 flex flex-col justify-around">
        {
          sidebarLinks.map((link, index) => (
            <SidebarLink 
              key={index}
              linkId={index} 
              text={link.text} 
              path={link.path}
              icon={link.icon} 
              selected={selected}
            />
          ))
        }
      </ul>
    </section>
  )
}

export default Sidebar