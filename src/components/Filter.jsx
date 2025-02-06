import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Grid2, ListItem } from '@mui/material';
export default function Filter(){
    return(
        <Grid2 container direction={'column'}>
            <Grid2>
                <ListItem>
                    <Typography variant='h6'>Search Results</Typography>
                </ListItem>
            </Grid2>
            <Grid2>
                <ListItem>
                    <Typography variant='h6'>Filters</Typography>
                </ListItem>
            </Grid2>
          
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">All</Typography>
          <hr/>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Posts</Typography>
        </AccordionSummary>
      </Accordion>
      </Grid2>
    )
}