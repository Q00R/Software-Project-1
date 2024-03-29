import { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import axios from "axios";

const ThemeChangerButton = () => {

  const [Themes, setThemes] = useState([]);

  const handleThemeChange = (event) => {
    document.documentElement.setAttribute("data-theme", event.target.value);
    sessionStorage.setItem("theme", event.target.value);
  };

  const fetchThemes = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/getAvialableThemes", { withCredentials: true })
      .then((res) => {
        setThemes(res.data);
        const theme = (sessionStorage.getItem("theme") ? (res.data.includes(sessionStorage.getItem("theme")) ? sessionStorage.getItem("theme") : null) : null) || res.data[0];
        handleThemeChange({ target: { value: theme } });
        return res;
      });
  };

  useEffect(() => {
    fetchThemes();
    window.addEventListener("themeChange", function (e) {
    fetchThemes();
  });
  }, []);
  // Set Theme to Default theme

  return (
    <div className="dropdown dropdown-hover mb-18">
      <div tabIndex={0} role="button" className="btn mx-2 text-lg">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
      >
        {Themes.map((theme, index) => (
          <li key={index}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
              onChange={handleThemeChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeChangerButton;
