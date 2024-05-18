import { Input } from '@chakra-ui/react'
import { Control, Controller, FieldErrors } from 'react-hook-form'

type TextInputProps = {
  control: Control<any>
  placeholder: string
  name: string
  errors: FieldErrors
  disabled?: boolean
  children?: React.ReactNode
  isDate?: boolean
}

export default function TextInput({
  placeholder,
  control,
  errors,
  children,
  name,
  disabled,
  isDate,
}: TextInputProps) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <Input
            type={isDate ? 'date' : 'text'}
            borderColor={errors[name] && 'red.500'}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            variant="outline"
            size={['sm', 'md', 'lg']}
            isDisabled={disabled}
          >
            {children && children}
          </Input>
        </>
      )}
      name={name}
    />
  )
}
