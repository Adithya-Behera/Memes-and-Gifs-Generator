import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';

const MemeGridItem = styled(Grid)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
  },
  img: {
    width: '100%',
  },
}));

const MemeSelector = (props) => {
  const { getMemes } = useApi();
  const [memes, setMemes] = useState();

  useEffect(() => {
    const loadMemes = async () => {
      const results = await getMemes();
      setMemes(results);
    };
    loadMemes();
  }, [getMemes]);

  const memeSelected = (meme) => {
    props.onSelect(meme);
  };

  return (
    <>
      <Typography variant="h2">Select your Meme:</Typography>
      <Grid container spacing={2} pt={8}>
        {memes?.map((meme) => (
          <MemeGridItem
            item
            xs={6}
            md={4}
            xl={3}
            key={meme.name}
            onClick={() => memeSelected(meme)}
            sx={{
              img: {
                outline:
                  props.activeMeme === meme.name
                    ? `4px solid ${pink[500]}`
                    : '',
              },
            }}
          >
            <img src={meme.image} alt={meme.name}></img>
          </MemeGridItem>
        ))}
      </Grid>
    </>
  );
};

export default MemeSelector;