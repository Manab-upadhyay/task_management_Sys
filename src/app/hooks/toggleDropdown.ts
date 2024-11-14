
import { useState } from "react";
import React from "react";
export const useDropdownToggler = () => {
  const [show, setshow] = React.useState(false);

  const toggleNotification = () => {
    setshow(!show);
  };

  return { show, toggleNotification };
};
