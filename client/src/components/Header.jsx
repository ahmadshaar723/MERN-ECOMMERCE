import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toggleTheme } from "../redux/theme/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className="border-b-2 ">
      <Link>
        <img src={logo} alt="" className="w-16 h-10 rounded-lg" />
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Link>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </Link>
      <div className="flex gap-2 md:order-2">
        <Link to="/cart" className="flex items-center">
          <Button color="gray" className="w-12 h-10 " pill>
            <FaCartShopping className="w-8" />
          </Button>
          <span className="relative w-5 h-5 text-white rounded-full bg-cyan-600 -top-3 flex text-center justify-center text-sm right-1">
            {currentUser ? <span>{currentUser.count}</span> : <span>0</span>}
          </span>
        </Link>
        <Button
          className="w-12 h-10  "
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/" className="text-base ">
          <Navbar.Link className=" " active={path === "/"} as={"div"}>
            Home
          </Navbar.Link>
        </Link>
        <Link to="/men" className="text-base">
          <Navbar.Link active={path === "/men"} as={"div"}>
            Men
          </Navbar.Link>
        </Link>
        <Link to="/womens" className="text-base">
          <Navbar.Link active={path === "/womens"} as={"div"}>
            Womens
          </Navbar.Link>
        </Link>
        <Link to="/kids" className="text-base">
          <Navbar.Link active={path === "/kids"} as={"div"}>
            Kids
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
