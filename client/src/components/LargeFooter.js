import React from "react";
import styled from "styled-components";

import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@mui/material";

import SmallFooter from "./SmallFooter";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FaxIcon from "@mui/icons-material/Fax";

import BinaliImg from "../assets/binali.jpeg";


function Footer() {
  return (
    <Container>
      <SmallFooter />
      {/* Social Network */}
      <SocialNetwork>
        <div className="col-lg-8">Get connected with us on social network</div>
        <div>
          <SocialIcon>
            <div>
              <FacebookIcon />
            </div>
            <div>
              <TwitterIcon />
            </div>
            <div>
              <GoogleIcon />
            </div>
            <div>
              <InstagramIcon />
            </div>
            <div>
              <LinkedInIcon />
            </div>
            <div>
              <GitHubIcon />
            </div>
          </SocialIcon>
        </div>
      </SocialNetwork>
      <CompanyDetails>
        {/* Description */}
        <div className="col-lg-6">
          <div>Secure Logix</div>
          <div>
          Secure Logix: Your Comprehensive Security Solution. Our platform simplifies security incident and log management, providing a user-friendly interface and robust features. Stay secure and compliant with our dedicated service.

          </div>
        </div>
        {/* About */}
        <div className="about">
          <div>Contact</div>
          <IconGroup>
            <HomeIcon />
            <div>88, Heel oya, Bandarawela</div>
          </IconGroup>
          <IconGroup>
            <EmailIcon />
            <div>secure.logix@gmail.com</div>
          </IconGroup>
          <IconGroup>
            <PhoneIcon />
            <div>0716556268</div>
          </IconGroup>
          <IconGroup>
            <FaxIcon />
            <div>0112345289</div>
          </IconGroup>
        </div>
        
      </CompanyDetails>
      {/* Developer Description */}
      <hr />
      <div className="dev-head">Developed by :</div>
      <DeveloperDetails>
        <div>
          <DevImg src={BinaliImg} />
          <div>Binali Kulathunge</div>
        </div>
      </DeveloperDetails>
      {/* CopyRight */}
      <Copyright>&copy; 2023 Copyright: SecureLogix</Copyright>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  padding: 12px calc(3.5vw + 5px) 0;
  background: black;

  .dev-head {
    padding: 12px 0;
  }
`;
const SocialNetwork = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 12px;

  .col-lg-8 {
    grid-column: 1/4;
  }

  @media (max-width: 960px) and (min-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    .col-lg-8 {
      grid-column: 1/3;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));

    .col-lg-8 {
      display:flex;
      justify-content:center;
      align-items:center;
      grid-column: 1/2;
      tex-align
    }
  }
`;

const SocialIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-gap: 12px;
`;

const CompanyDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 12px;

  div {
    text-align: justify;
    text-justify: inter-word;
    padding: 12px 0;
  }
  .col-lg-6 {
    grid-column: 1/3;
  }

  @media (max-width: 1210px) and (min-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 30px;
    grid-row-gap: 0;

    .col-lg-6 {
      padding: 0;
    }

    .table-container {
      grid-column: 1/4;
      padding: 0;
    }
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 0;

    .col-lg-6 {
      padding: 0;
    }

    .table-container,
    .about {
      grid-column: 1/3;
      padding: 0;
    }
  }
`;

const IconGroup = styled.div`
  display: flex;
  div {
    padding: 0 12px;
  }
`;
const DeveloperDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 12px;

  div {
    text-align: center;
    text-transform: uppercase;
  }

  @media (max-width: 960px) and (min-width: 400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const DevImg = styled.img`
  border-radius: 50%;
  text-align: center;
  width: 30%;
  margin: 0 auto;
  object-fit: cover;
`;

const Copyright = styled.div`
  padding: 12px 0;
  text-align: center;
`;
