import styled from "styled-components";

export const Nav = styled.nav`
  background: linear-gradient(to right, #361999, #78fff1);
  height: 80px;
  display: flex;
  top: 0;
  justify-content: space-between;
  z-index: 10;
  width: 100%;
  height: 70px;
  box-shadow: 0 8px 10px -8px rgba(0, 0, 0, 0.3);
`;

export const NavLogo = styled.div`
  color: #78fff1;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-left: 2rem;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
`;

export const NavSource = styled.div`
  align-items: center;
  display: flex;
  margin-right: 5%;
  font-size: 1.2rem;
  font-weight: 500;
  color: #361999;
  text-decoration: none;
  max-width: 30px;
`;

export const Heading = styled.div`
  margin-top: 50px;
  padding-left: 5%;
  font-size: 1.5rem;
  li {
    font-size: 1.2rem;
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export const ContentContainer = styled.section`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const FooterDiv = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  position: relative;
  bottom: 0;
  left: 0;
  height: 60px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;
