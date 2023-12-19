import { FaExternalLinkAlt, FaRegTrashAlt, FaUserCircle, FaLinkedin, FaGithub,  } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { BiError } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { IoDownloadOutline } from "react-icons/io5";

const icons = {
  openExternal: <FaExternalLinkAlt />,
  delete: <FaRegTrashAlt />,
  defaultUser: <FaUserCircle />,
  add: <HiPlus />,
  error: <BiError />,
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  portfolio: <TbWorld />,
  download: <IoDownloadOutline />,
};

export default icons;
