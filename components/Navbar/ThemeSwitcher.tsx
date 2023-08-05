"use client";

import React, { useContext, useEffect, useState } from "react";

import ThemeContext from "../../store/ThemeContext";

const ThemeSwitcher = () => {
  const themeCtx: { isDarkTheme?: boolean; toggleThemeHandler: () => void } =
    useContext(ThemeContext);

  function toggleThemeHandler(): void {
    themeCtx.toggleThemeHandler();
  }

  return (
    <fieldset role="radiogroup" aria-label="Theme Switcher" className="">
      <div className="flex items-center gap-[10px]">
        <label htmlFor="light" className="text-default-gray | cursor-pointer">
          Light
        </label>
        <span className="relative z-10 flex h-[30px] w-14">
          <input
            type="radio"
            name="theme"
            id="light"
            value="light"
            checked={!themeCtx.isDarkTheme}
            className="h-full w-6/12 cursor-pointer opacity-0"
            onChange={() => {
              if (themeCtx.isDarkTheme) {
                toggleThemeHandler();
              }
            }}
          />
          <input
            type="radio"
            name="theme"
            id="dark"
            value="dark"
            checked={themeCtx.isDarkTheme}
            className="h-full w-6/12 cursor-pointer opacity-0"
            onChange={() => {
              if (!themeCtx.isDarkTheme) {
                toggleThemeHandler();
              }
            }}
          />
          <span
            className="toggle-bg absolute left-0 top-0 -z-10 h-full w-full rounded-full border-2 border-slate-300 bg-slate-200 dark:border-gray-600 dark:bg-gray-700"
            aria-hidden="true"
          ></span>
        </span>
        <label htmlFor="dark" className="text-default-gray | cursor-pointer">
          Dark
        </label>
      </div>
    </fieldset>
  );
};

export default ThemeSwitcher;
