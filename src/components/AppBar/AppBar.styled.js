import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
  padding: 16px;
`;

export const NavigationLink = styled(NavLink)`
  font-weight: 500;
  font-size: 20px;
  position: relative;

  &:not(:last-child) {
    margin-right: 24px;
  }

  &:hover {
    color: #cea35f;
  }

  &.active {
    color: #cea35f;
  }
`;

export const CartStatus = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #cea35f;
  width: 16px;
  height: 16px;
  color: white;
  font-size: 11px;
  position: absolute;
  right: -20px;
  top: 2px;
`;
