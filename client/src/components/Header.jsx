import { Button, Navbar, TextInput } from "flowbite-react";
import { Link ,useLocation,useNavigate} from "react-router-dom";
import logo from "../assets/logo.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toggleTheme } from "../redux/theme/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Navbar className="border-b-2">
      <Link>
        <img src={logo} alt="" className="w-16 h-10 rounded-lg" />
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Link>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10  "
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/" className="text-base">
          <Navbar.Link active={path === "/"} as={"div"}>
            Home
          </Navbar.Link>
        </Link>
        <Link to="/about" className="text-base">
          <Navbar.Link active={path === "/about"} as={"div"}>
            About
          </Navbar.Link>
        </Link>
        <Link to="/projects" className="text-base">
          <Navbar.Link active={path === "/projects"} as={"div"}>
            Projects
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
