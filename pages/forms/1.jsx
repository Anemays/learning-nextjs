import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    RadioGroup,
    Radio,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    HStack,
    Button
} from "@chakra-ui/react"

const Main = () => {
    return (
        <>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            
            <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup defaultValue="Itachi">
                    <HStack spacing="24px">
                        <Radio value="Sasuke">Sasuke</Radio>
                        <Radio value="Nagato">Nagato</Radio>
                        <Radio value="Itachi">Itachi</Radio>
                        <Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
                    </HStack>
                </RadioGroup>
                <FormHelperText>Select only if you're a fan.</FormHelperText>
            </FormControl>

            <FormControl id="first-name" isRequired>
                <FormLabel>First name</FormLabel>
                <Input placeholder="First name" />
            </FormControl>

            <FormControl id="country">
                <FormLabel>Country</FormLabel>
                <Select placeholder="Select country">
                    <option>United Arab Emirates</option>
                    <option>Nigeria</option>
                </Select>
            </FormControl>

            <FormControl id="amount">
                <FormLabel>Amount</FormLabel>
                <NumberInput max={50} min={10}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Sign in
            </Button>
        </>
    )
}

export default Main;
