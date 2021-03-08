import React from "react"
import { Text, Heading } from "@marigold/components"
import { ThemeProvider } from "@marigold/system"
import b2bTheme from "@marigold/theme-b2b"

export default function Home() {
  return (
    <ThemeProvider theme={b2bTheme}>
      <Heading variant="h1">Marigold Docs</Heading>
      <Text>This the Marigold Docs Startpage</Text>
    </ThemeProvider>
  )
}
