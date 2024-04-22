import { StyledHeadlines } from "@/components/Headline.styled";
import Link from "next/link";
import AnimatedFox from "@/components/AnimatedFox/AnimatedFox";
import {
  Space,
  StyledLink,
  StyledLoginNav,
  StyledMain,
  StyledTitle,
  StyledWelcome,
} from "@/components/WelcomePage.styled";

import LoginButton from "@/components/LoginButton/LoginButton";
import { SessionProvider } from "next-auth/react";

export default function HomePage() {
  return (
    <StyledMain>
      <Space />
      <StyledWelcome>Willkommen </StyledWelcome>
      <StyledTitle>bei SchlauFuchs!</StyledTitle>

      <AnimatedFox />
      <StyledHeadlines>Die schlaue Art zu lernen!</StyledHeadlines>
      <StyledLoginNav>
        <StyledLink href="/howToUse">
          Wie funktioniert <br />
          die App?
        </StyledLink>

        <SessionProvider>
          <LoginButton />
        </SessionProvider>
      </StyledLoginNav>
    </StyledMain>
  );
}

HomePage.getInitialProps = () => {
  const disableLayout = true;
  return { disableLayout };
};
