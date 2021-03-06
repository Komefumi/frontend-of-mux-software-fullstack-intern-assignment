import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PaperLinkTabs from '../components/PaperLinkTabs';

import {
  // ROUTE_ROOT,
  ROUTE_MAJOR_LIST_INFO,
  ROUTE_MINOR_CUSTOMER,
  ROUTE_MINOR_FIELD,
  // ROUTE_MINOR_ADD_FIELD,
} from '../constants';

// const ROUTE_LIST_CUSTOMERS = `${ROUTE_MAJOR_LIST_INFO}/${ROUTE_MINOR_CUSTOMER}/`;
// const ROUTE_LIST_FIELDS = `${ROUTE_MAJOR_LIST_INFO}/${ROUTE_MINOR_FIELD}/`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SimpleAccordion = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel3a-content'
          id='panel3a-header'
        >
          <Typography className={classes.heading}>
            Disabled Accordion
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

const labelWithRouteList = [
  { label: 'List Customers', route: ROUTE_MINOR_CUSTOMER },
  { label: 'List Fields', route: ROUTE_MINOR_FIELD },
];

const ListInfo = () => (
  <div>
    <PaperLinkTabs
      majorRoute={ROUTE_MAJOR_LIST_INFO}
      labelWithMinorRouteList={labelWithRouteList}
    />
    <SimpleAccordion />
  </div>
);

export default ListInfo;
