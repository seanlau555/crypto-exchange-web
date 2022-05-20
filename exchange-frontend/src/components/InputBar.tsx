import { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { InputEvent, FormEvent } from '../types'

function InputBar({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (evt: InputEvent) => {
    setInputValue(evt.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    onSubmit(inputValue)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Symbol:
        <Input
          bg="white"
          textTransform="uppercase"
          placeholder="Input ticker..."
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
      <Button type="submit" colorScheme="teal" ml="8px">
        Submit
      </Button>
    </StyledForm>
  )
}

export default InputBar

const StyledForm = styled.form`
  display: flex;
  width: 400px;
  label {
    display: flex;
    align-items: center;
    input {
      margin-left: 8px;
    }
  }
`
