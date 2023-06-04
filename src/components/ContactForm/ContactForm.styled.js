import { FormControl } from "@chakra-ui/react";
import styled from "styled-components";

export const FormGroup = styled(FormControl)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const FormWrap = styled.div`
  min-width: 288px;
`;
