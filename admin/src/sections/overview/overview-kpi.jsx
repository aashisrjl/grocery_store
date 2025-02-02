import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    legend: {
      show: true
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient'
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    stroke: {
      width: 3
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -12,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewKpi = (props) => {
  const { chartSeries = [], stats = [] } = props;
  const chartOptions = useChartOptions();

  return (
    <Card>
      <CardHeader title="Key Performance Indicators" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              md: 'repeat(5, 1fr)',
              sm: 'repeat(2, 1fr)',
              xs: 'repeat(1, 1fr)'
            }
          }}
        >
          {stats.map((item) => (
            <Card
              elevation={0}
              key={item.label}
              sx={{
                alignItems: 'center',
                backgroundColor: '#F3F4F7',
                borderRadius: 1,
                p: 2
              }}
            >
              <Typography
                color="text.secondary"
                variant="overline"
              >
                {item.label}
              </Typography>
              <Typography variant="h6">
                {item.value}
              </Typography>
            </Card>
          ))}
        </Box>
        <Chart
          height="350"
          options={chartOptions}
          series={chartSeries}
          type="area"
        />
      </CardContent>
    </Card>
  );
};

OverviewKpi.propTypes = {
  chartSeries: PropTypes.array,
  stats: PropTypes.array
}
