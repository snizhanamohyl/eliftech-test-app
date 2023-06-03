import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
  padding: 16px;
`;

export const NavigationLink = styled(NavLink)`
  font-weight: 500;
  font-size: 20px;

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
