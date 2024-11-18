import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.75rem;
  padding-top: 5rem;
  padding-inline: 5rem;
  padding-bottom: 1.5rem;
  gap: 50px;
  border: solid 0.5px ${({ theme }) => theme.colors.lineGrayStrong};
  background-color: ${({ theme }) => theme.colors.bgGrayPrimary};
  width: 100%;
  height: 150vh;
`;

export const Form = styled.form`
  max-width: 512px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 3vh;

  button {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.bgGraySecondary};
    height: 50px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textColorSecondary};
    transition: 0.5s;

    &:hover {
      opacity: 0.8;
      color: ${({ theme }) => theme.colors.iconGreenPrimary};
    }
  }

  input {
    border: 1px solid ${({ theme }) => theme.colors.bgGrayPrimary};
    border-radius: .5rem;
    height: 5vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bgGrayPrimary};
    color: ${({ theme }) => theme.colors.textColorPrimary};
    font-size: 16px;
    padding-left: 10px;
    outline: none;
    margin-left: 1vw;
    box-sizing: border-box;
  }

  input[type="date"] {
    position: relative;

    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
`;

export const InputContainer = styled.div`
  border: solid 0.5px ${({ theme }) => theme.colors.lineWhiteSecondary};
  display: flex;
  flex-direction: row;
  padding: 0.5vh;
  border-radius: 10px;
`;

export const InputIcon = styled.div`
  color: ${({ theme }) => theme.colors.iconGreenPrimary};
  min-width: 20px;
  min-height: 20px;
  width: 2.5vw;
  height: 2.5vh;
  align-self: center;
  margin-left: 0.5vw;
`;

