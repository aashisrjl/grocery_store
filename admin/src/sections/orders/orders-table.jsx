import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

const statusMap = {
  complete: {
    color: 'success.main',
    label: 'Complete'
  },
  created: {
    color: 'neutral.500',
    label: 'Created'
  },
  delivered: {
    color: 'warning.main',
    label: 'Delivered'
  },
  placed: {
    color: 'info.main',
    label: 'Placed'
  },
  processed: {
    color: 'error.main',
    label: 'Processed'
  }
};

export const OrdersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    page = 0,
    rowsPerPage = 0,
    onRowsPerPageChange
  } = props;

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Order
              </TableCell>
              <TableCell>
                Date
              </TableCell>
              <TableCell>
                Customer
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Total
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((order) => {
              const status = statusMap[order.status];
              const createdDate = format(order.createdAt, 'dd MMM yyyy');
              const createdTime = format(order.createdAt, 'HH:mm');
              const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`);

              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      color="inherit"
                      href="#"
                      underline="none"
                      variant="subtitle2"
                    >
                      #{order.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="inherit"
                      variant="inherit"
                    >
                      {createdDate}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="inherit"
                    >
                      {createdTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {order.customer.name}
                  </TableCell>
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Box
                        sx={{
                          backgroundColor: status.color,
                          borderRadius: '50%',
                          height: 8,
                          width: 8
                        }}
                      />
                      <Typography variant="body2">
                        {status.label}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {totalAmount}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <SvgIcon fontSize="small">
                        <EllipsisVerticalIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

OrdersTable.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
};
