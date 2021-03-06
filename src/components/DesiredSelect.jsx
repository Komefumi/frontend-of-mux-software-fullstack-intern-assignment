import { FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DesiredSelect = ({ inputLabel, selectionData, control, onSelect }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>{inputLabel}</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={control}
        onChange={({ target: { value } }) => {
          // setStore(value);
          onSelect(value);
        }}
      >
        {selectionData.map(({ label, value }) => (
          <MenuItem key={label + '-' + value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DesiredSelect;
