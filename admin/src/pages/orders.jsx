import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { subHours, subMinutes } from 'date-fns';
import { Box, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import { OrdersSearch } from 'src/sections/orders/orders-search';
import { OrdersTable } from 'src/sections/orders/orders-table';

const now = new Date();

const orders = [
  {
    id: '5273',
    createdAt: subMinutes(now, 21).getTime(),
    currency: '$',
    customer: {
      name: 'Devon Lane'
    },
    status: 'delivered',
    totalAmount: 192.5,
    updatedAt: subMinutes(now, 7).getTime()
  },
  {
    id: '9265',
    createdAt: subMinutes(now, 56).getTime(),
    currency: '$',
    customer: {
      name: 'Livia Louthe'
    },
    status: 'complete',
    totalAmount: 631,
    updatedAt: subMinutes(now, 54).getTime()
  },
  {
    id: '9266',
    createdAt: subHours(subMinutes(now, 31), 2).getTime(),
    currency: '$',
    customer: {
      name: 'Peri Ottawell'
    },
    status: 'placed',
    totalAmount: 631,
    updatedAt: subHours(subMinutes(now, 43), 1).getTime()
  },
  {
    id: '1090',
    createdAt: subHours(subMinutes(now, 51), 2).getTime(),
    currency: '$',
    customer: {
      name: 'Thadeus Jacketts'
    },
    status: 'processed',
    totalAmount: 100,
    updatedAt: subHours(subMinutes(now, 13), 2).getTime()
  },
  {
    id: '1111',
    createdAt: subHours(subMinutes(now, 6), 3).getTime(),
    currency: '$',
    customer: {
      name: 'Rad Jose'
    },
    status: 'processed',
    totalAmount: 60,
    updatedAt: subHours(subMinutes(now, 54), 2).getTime()
  },
  {
    id: '2475',
    createdAt: subHours(subMinutes(now, 17), 4).getTime(),
    currency: '$',
    customer: {
      name: 'Eydie Hopkyns'
    },
    status: 'complete',
    totalAmount: 1200,
    updatedAt: subHours(subMinutes(now, 1), 2).getTime()
  }
];

const Page = () => {
  const [mode, setMode] = useState('table');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleModeChange = useCallback(
    (event, value) => {
      if (value) {
        setMode(value);
      }
    },
    []
  );

  const handleQueryChange = useCallback(
    (value) => {
      setQuery(value);
    },
    []
  );

  const handleChangePage = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  return (
    <>
      <Helmet>
        <title>
          Orders | Carpatin Free
        </title>
      </Helmet>
      <Box
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Typography variant="h4">
                Orders
              </Typography>
              <Button
                color="primary"
                size="large"
                variant="contained"
              >
                Add
              </Button>
            </Stack>
            <div>
              <Card>
                <OrdersSearch
                  mode={mode}
                  onModeChange={handleModeChange}
                  onQueryChange={handleQueryChange}
                  query={query}
                />
                <Divider />
                <OrdersTable
                  count={orders.length}
                  items={orders}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
