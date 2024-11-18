import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; /* Distribuindo melhor as colunas */
  grid-template-rows: auto; /* Ajuste para evitar que os itens se sobreponham */
  grid-template-areas: "header header" "users-container container"; /* Ajustando as áreas para cabeçalho e conteúdo */
  padding: 0.75rem;
  gap: 1rem;
`;

const Header = styled.div`
  max-width: 21rem;
  margin-bottom: 1.5rem;
  grid-area: header; /* Ajustando a posição do cabeçalho */
`;

const ImgLogo = styled.div`
  background-color: ${({ theme }) => theme.colors.lineGrayStrong};
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  height: 4.5rem;
  width: auto;
  display: flex;
  flex-direction: row;

  .Logo {
    height: 3rem;
    width: auto;
  }
`;

const Heading = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.iconGreenSecondary};
  padding-left: 6px;
  margin-bottom: 10px; /* Para separar os títulos */
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textColorPrimary};
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem; /* Para separar os títulos do conteúdo */
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textColorSecondary};
  font-size: 0.87rem;
`;

export default { Container, Header, ImgLogo, Heading, Title, Paragraph };


