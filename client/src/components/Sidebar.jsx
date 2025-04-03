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
      path: '/blog/posts',
      icon: () => {
        return (
          <MdOutlinePostAdd className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Home',
      path: '/blog/posts',
      icon: () => { 
        return (
          <IoHomeOutline className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Layout',
      path: '/blog/layout',
      icon: () => {
        return (
          <TbLayout2 className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Themes',
      path: '/blog/themes',
      icon: () => {
        return (
          <PiLayoutFill className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Views',
      path: '/blog/views',
      icon: () => {
        return (
          <IoEye className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Comments',
      path: '/blog/comments',
      icon: () => {
        return (
          <LiaComments className="inline text-3xl pb-1"/>
        )
      }
    },
    {
      text: 'Settings',
      path: '/blog/settings',
      icon: () => {
        return (
          <IoSettingsOutline className="inline text-3xl pb-1"/>
        )
      }
    }
  ];

  const { pathname } = useLocation();
  // Remove the blogId at the end of the pathname
  const basePath = pathname.replace(/\/[^\/]+$/, '');

  let selectedIndex = sidebarLinks.findIndex(link => link.path === basePath);
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
              setSelected={setSelected}
            />
          ))
        }
      </ul>
    </section>
  )
}

export default Sidebar