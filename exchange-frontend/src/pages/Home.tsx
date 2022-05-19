import { Text, Button, Flex, Box, Heading, Container } from '@chakra-ui/react'
import { ButtonEvent } from '../types'

export const alpacaAuthUrl = 'https://app.alpaca.markets/oauth/authorize'

function Home() {
  const handleSubmit = async (evt: ButtonEvent) => {
    evt.preventDefault()
    const alpaca_oauth =
      alpacaAuthUrl +
      `?response_type=code&client_id=${
        import.meta.env.VITE_REACT_APP_CLIENT_ID
      }&redirect_uri=${
        import.meta.env.VITE_REACT_APP_REDIRECT_URI
      }&scope=account:write%20trading%20data`
    document.location.href = alpaca_oauth
  }

  return (
    <Container maxW="6xl">
      <Flex
        align="flex-start"
        justify="center"
        direction="column"
        mt={{ base: 8 }}
      >
        <Heading> My OAuth Trading App</Heading>
        <Box mt="10px">
          <Button
            data-testid="signin"
            colorScheme="teal"
            onClick={handleSubmit}
          >
            Sign in with Alpaca
          </Button>
        </Box>
        <Box mt="10px">
          <Text fontWeight="bold"> Powered by Alpaca </Text>
        </Box>
      </Flex>
    </Container>
  )
}

export default Home
