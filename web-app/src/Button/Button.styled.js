import styled from "styled-components";

export const Button = styled.button`
  height: 40px;
  width: 90px;
  border: 1px solid ${({ theme }) => theme.asideBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: inherit;
  color: inherit;
  background-color: ${({ theme }) => theme.asideBackgroundColor};
  border-radius: 5px;
`;

export const DangerButton = styled(Button)`
  background-color: transparent;
  border-color: ${({ theme }) => theme.errorColor};

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.errorColor};
  }

  &:hover {
    cursor: pointer;
  }
`;
