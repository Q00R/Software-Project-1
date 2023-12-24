import { useState, useEffect } from "react";
import { themeChange } from "theme-change";

const ThemeChangerButton = () => {
  const themevalues = [
    "light",
    "dark",
    "cupcake",
    "valentine",
    "halloween",
    "nord",
  ];
  const handleThemeChange = (event) => {
    document.documentElement.setAttribute('data-theme', event.target.value);
  };
  return (
    <div className="dropdown dropdown-hover mb-72">
      <div tabIndex={0} role="button" className="btn m-1">
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
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Default"
            value="default"
            />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Dark"
            value="dark"
            />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cupcake"
            value="cupcake"
            />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Halloween"
            value="halloween"
            />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Valentine"
            value="valentine"
            />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Nord"
            value="nord"
            />
        </li>
      </ul>
    </div>
  );
};

export default ThemeChangerButton;
{/*}
<div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="btn m-1">
    Hover
  </div>
  <ul
    tabIndex={0}
    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
    <li>
      <a>Item 1</a>
    </li>
    <li>
      <a>Item 2</a>
    </li>
  </ul>
</div>;

useEffect(() => {
  themeChange(false);
}, []);

const handleThemeChange = () => {
  if (theme === "light") {
    setTheme("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    setTheme("light");
    document.documentElement.setAttribute("data-theme", "light");
  }
};
*/}