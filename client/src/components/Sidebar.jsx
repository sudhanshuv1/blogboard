import SidebarLink from './SidebarLink';
import { useDispatch } from 'react-redux';
import { setSelectedIndex } from '../features/uiSlice';
import { useLocation } from 'react-router-dom';
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
      text: 'Home',
      path: '/blog/posts',
      icon: () => <IoHomeOutline className="inline text-3xl pb-1" />,
    },
    {
      text: 'Create Post',
      path: '/blog/posts',
      icon: () => <MdOutlinePostAdd className="inline text-3xl pb-1" />,
    },
    {
      text: 'Layout',
      path: '/blog/layout',
      icon: () => <TbLayout2 className="inline text-3xl pb-1" />,
    },
    {
      text: 'Themes',
      path: '/blog/themes',
      icon: () => <PiLayoutFill className="inline text-3xl pb-1" />,
    },
    {
      text: 'Views',
      path: '/blog/views',
      icon: () => <IoEye className="inline text-3xl pb-1" />,
    },
    {
      text: 'Comments',
      path: '/blog/comments',
      icon: () => <LiaComments className="inline text-3xl pb-1" />,
    },
    {
      text: 'Settings',
      path: '/blog/settings',
      icon: () => <IoSettingsOutline className="inline text-3xl pb-1" />,
    },
  ];


  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Extract blogId and postId from the pathname
  const pathSegments = pathname.split('/');
  const basePath = pathname.replace(/\/[^\/]+$/, '');

  // Determine the initial selected index
  let selected = sidebarLinks.findIndex((link) => link.path === basePath);

  // If both blogId and postId exist, set selectedIndex to 1
  if (pathSegments.length > 4) {
    selected = 1;
  }

  console.log("PATH SEGMENTS ARRAY : ", pathSegments, "\n");
  console.log("PATHlENGTH : ", pathSegments.length, "\n");
  console.log("PATHNAME: ", pathname, "\nPATH SEGEMENT 1 : ", pathSegments[2], "\nPATH SEGMENT 2 : ", pathSegments[3]);
  console.log("BASE PATH : ", basePath);

  dispatch(setSelectedIndex(selected));

  return (
    <section className="fixed mr-auto h-[calc(100vh-3rem)] border-2 w-60 top-14">
      <ul className="p-2 h-3/6 flex flex-col justify-around">
        {sidebarLinks.map((link, index) => (
          <SidebarLink
            key={index}
            linkId={index}
            text={link.text}
            path={link.path}
            icon={link.icon}
          />
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;