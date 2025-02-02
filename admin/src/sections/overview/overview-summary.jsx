import PropTypes from 'prop-types';
import { Card, Stack, Typography } from '@mui/material';

export const OverviewSummary = (props) => {
  const { icon, label, value } = props;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{ p: 2 }}
      >
        {icon}
        <div>
          <Typography
            color="text.secondary"
            variant="overline"
          >
            {label}
          </Typography>
          <Typography variant="h6">
            {value}
          </Typography>
        </div>
      </Stack>
    </Card>
  );
};

OverviewSummary.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
