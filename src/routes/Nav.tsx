import React, { useEffect, useState } from "react";

import styled from "styled-components";

const NavCss = styled.div<{ active?: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px;
  height: 30px;
  z-index: 1;

  /* Animations */
  transition-timing-function: ease-in;
  transition: all 0.5s;

  background-color: ${(props) => (props.active ? "#111" : "")};
`;

const NavLogo = styled.img`
  position: fixed;
  left: 20px;
  width: 80px;
  object-fit: contain;
`;

const NavAvatar = styled.img`
  position: fixed;
  right: 20px;
  width: 35px;
  object-fit: contain;
`;

const Nav = () => {
  const [show, handleShow]: [show: boolean, handleShow: (x: any) => void] =
    useState(false);

  // 스크롤 감지
  useEffect(() => {
    window.addEventListener("scroll", (): void => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return (): void => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavCss active={show}>
      <NavLogo
        src="https://w.namu.la/s/984a3a524c3a76ef69967a3538f0b655d9e4a9b948314bd8d57f34a1502753104f1613f356c08d4352cdfad86bbea9cd56b2133ea5c9c7a57f1c065b1048cb5bc4f0a5d2e751d17b3d9b4baf2f7e0f0f7de6c0759982a4a68a629313b420f968"
        alt="Netflix Logo"
      />
      <NavAvatar
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_cP0f7_7EFaqYRZ7KnVL31O4bVxewVT1FfA&usqp=CAU"
        alt="Netflix Logo"
      />
    </NavCss>
  );
};

export default Nav;
