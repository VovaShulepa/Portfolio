import React, { useState } from "react";
import styled from "styled-components";
import TelegramIcon from "@mui/icons-material/Telegram";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const WarningText = styled.div`
  color: yellow; /* Колір попередження */
  font-size: 14px;
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [nameWarning, setNameWarning] = useState(false);
  const [messageWarning, setMessageWarning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameWarning(false);
    setMessageWarning(false);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const message = formData.get("message");

    if (name.length < 2) {
      setNameWarning(true);
      return;
    }

    if (message.length < 10) {
      setMessageWarning(true);
      return;
    }

    const botToken = "6940293925:AAFI2P4J-iEKWVzairiw8_QCi-kZoNB6BgU";

    const chatId = "https://t.me/Portfolio_Feadback_bot";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        text: `${name} sent you a message: ${message}`,
      }),
    };

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        requestOptions
      );

      if (response.ok) {
        setOpen(true);
        e.target.reset();
      } else {
        console.error("Telegram API error:", response);
      }
    } catch (error) {
      console.error("Telegram API error:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm onSubmit={handleSubmit}>
          <ContactTitle>
            Text Me 🚀 <TelegramIcon />
          </ContactTitle>
          <ContactInput placeholder="Your Name" name="name" />
          {nameWarning && (
            <WarningText>Name should be at least 2 characters</WarningText>
          )}
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          {messageWarning && (
            <WarningText>Message should be at least 10 characters</WarningText>
          )}
          <ContactButton type="submit">Send</ContactButton>
        </ContactForm>
        {open && <div>Message sent successfully!</div>}
      </Wrapper>
    </Container>
  );
};

export default Contact;
