'use client'
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'

type SearchInputProps = {
  placeholder: string

  onChange: (e: string) => void
}
export const SearchInput = ({
  placeholder,
  onChange,
}: SearchInputProps) => {
  return (
    <Stack width="100%" spacing={4} mb={5}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          onChange={e => onChange(e.target?.value)}
          type="tel"
          placeholder={placeholder}
        />
      </InputGroup>
    </Stack>
  )
}
