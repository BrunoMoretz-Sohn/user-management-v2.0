import styled from 'styled-components';

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 155vh;
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IntroImage = styled.img`
  height: 20rem;
  padding-top: 8rem;
  padding-right: 5rem;
`;

export const IntroText = styled.div`
  padding-top: 6rem;
  padding-left: 15rem;
  padding-bottom: 8rem;
  box-sizing: border-box;
  max-width: 100%;
`;

export const IntroHeading = styled.h4`
  font-size: 3rem;
  font-family: "Montserrat", system-ui;
  font-weight: 500;
`;

export const IntroParagraph = styled.p`
  margin-top: 1vh;
  font-family: "Montserrat", system-ui;
  line-height: 2;
  font-size: 0.9rem;
`;

export const UserList = styled.div`
  padding-right: 2rem;
  margin-top: 3vh;
  height: 84vh;
  width: 35vw;
  margin-bottom: 5vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  box-sizing: border-box;
  border: solid 0.5px ${({ theme }) => theme.colors.lineGrayStrong};
  border-radius: 10px;
`;

export const UserCard = styled.div`
  border: solid 0.5px ${({ theme }) => theme.colors.lineGrayStrong};
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 20px;
  width: 90%;
  min-width: 300px;
  border-radius: 10px;
  box-sizing: border-box;

  p {
    color: ${({ theme }) => theme.colors.textColorPrimary};
    font-weight: 400;

    span {
      color: ${({ theme }) => theme.colors.textColorSecondary};
      font-weight: 200;
    }
  }
`;
