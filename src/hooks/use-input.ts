import {useState} from 'react';


const useInput = (validateValue = (value: string) => true) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [touched, setTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && touched;

  const onChange = (event?: any) => {
    setEnteredValue(event?.target?.value);
  };

  const onBlur = (event?: any) => {
    setTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    onChange,
    onBlur,
    reset
  };
};

export default useInput;