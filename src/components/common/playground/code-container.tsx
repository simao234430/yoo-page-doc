import { Box, type BoxProps } from '@chakra-ui/react'

function CodeContainer (props: BoxProps) {
  return (
    <Box
      rounded='8px'
      my='8'

      {...props}
    />
  )
}

export default CodeContainer
