import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    const { type, name } = e.target;
    let { value } = e.target;

    if (type === 'number') {
      value = Number(value);
    } else if (type === 'file') {
      value[0] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // eslint-disable-next-line no-unused-vars
    const blankState = Object.fromEntries(Object.entries(initial).map(([key, _]) => [key, '']));

    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
