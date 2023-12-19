import {
  FaExternalLinkAlt,
  FaRegTrashAlt,
  FaUserCircle,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { IoDownloadOutline, IoClose } from "react-icons/io5";
import { CgColorPicker } from "react-icons/cg";

const icons = {
  openExternal: <FaExternalLinkAlt />,
  delete: <FaRegTrashAlt />,
  defaultUser: <FaUserCircle />,
  pick: <CgColorPicker />,
  error: <BiError />,
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  portfolio: <TbWorld />,
  download: <IoDownloadOutline />,
  close: <IoClose />,
};

export default icons;
