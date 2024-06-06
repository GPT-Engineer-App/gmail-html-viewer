import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Box, Spinner, Heading } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";

const Index = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // フェッチ関数を定義
    const fetchEmails = async () => {
      try {
        // バックエンドAPIからメールデータを取得
        const response = await fetch("/api/emails");
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading emails...</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>
          Gmail Inbox
        </Heading>
        {emails.length === 0 ? (
          <Text>No emails found.</Text>
        ) : (
          emails.map((email) => (
            <Box key={email.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text fontSize="lg" fontWeight="bold">
                <FaEnvelope style={{ marginRight: "8px" }} />
                {email.subject}
              </Text>
              <Text mt={2}>{email.snippet}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
