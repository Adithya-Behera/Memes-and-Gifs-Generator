import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import useList from '../hooks/useList'; 
import { useState } from 'react';

const Temp = (props) => {
  const { options, loading } = useList();

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      onChange={(event, newValue) => {
        // Handle selection
        console.log(newValue);
        props.onSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a meme"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(optionProps, option, { inputValue }) => {
        const { key, ...rest } = optionProps;
        return (
          <li key={key} {...rest}>
            {option}
          </li>
        );
      }}
    />
  );
};

export default Temp;



//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);