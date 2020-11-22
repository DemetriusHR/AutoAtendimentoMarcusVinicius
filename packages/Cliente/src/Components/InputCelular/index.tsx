import React, { useCallback, useState } from 'react';
import { InputProps } from 'antd/lib/input';

import Input from '../Input';

const NonNumeric = /\D/g;

const mapToNumeric: (value: string) => string = (value: string) => value.replace(NonNumeric, '');

const formataCelular: (value: string) => string = (value: string) => mapToNumeric(value)
  .replace(/(\d{2})(\d)/, '($1)$2')
  .replace(/(\d{5})(\d)/, '$1-$2')
  .replace(/(\d{5})(\d{4})$/, '$1-$2');

const InputCelular: React.FC<InputProps> = React.memo(
  ({ onChange, ...rest }: InputProps) => {
    const [valueInput, setValue] = useState(rest.value);

    const onChangeInput = useCallback(
      (e) => {
        const { value } = e.target;
        let valor = value.length < 15 ? value : value.substring(0, value.length - 1);
        valor = formataCelular(valor);

        setValue(valor);

        if (onChange) {
          onChange(e);
        }
      },
      [onChange],
    );

    return <Input {...rest} onChange={onChangeInput} value={valueInput} />;
  },
);

export default InputCelular;
