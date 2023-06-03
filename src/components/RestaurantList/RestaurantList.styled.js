import styled from "styled-components";

export const SideNav = styled.div`
  padding: 16px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 28px;
`;

export const Button = styled.button`
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
  transition: background-color 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
