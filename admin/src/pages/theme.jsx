import { Helmet } from 'react-helmet-async';
import {
  Box,
  Card,
  Container,
  Link,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

const Page = () => (
  <>
    <Helmet>
      <title>
        Theme | Carpatin Free
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
          <div>
            <Typography variant="h4">
              Typography
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h6">
                    Headings
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    We use
                    {' '}
                    <Link
                      color="primary"
                      href="https://fonts.google.com/specimen/Inter"
                      target="_blank"
                      variant="inherit"
                    >
                      Inter
                    </Link>
                    {' '}
                    as our main font name for all our components.
                    <br />
                    <br />
                    The sizes have been reconfigured to match the needs of a clean
                    and SEO friendly dashboard.
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Card>
                  <Stack
                    spacing={3}
                    sx={{ p: 3 }}
                  >
                    {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((variant) => (
                      <Typography
                        key={variant}
                        variant={variant}
                      >
                        Heading
                      </Typography>
                    ))}
                  </Stack>
                </Card>
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant="h6">
                  Body
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Card>
                  <Stack
                    spacing={3}
                    sx={{ p: 3 }}
                  >
                    {[
                      'body1',
                      'body2',
                      'subtitle1',
                      'subtitle2',
                      'overline',
                      'caption'
                    ].map((variant) => (
                      <Typography
                        key={variant}
                        sx={{ textTransform: variant !== 'overline' && 'capitalize' }}
                        variant={variant}
                      >
                        {variant}
                      </Typography>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

export default Page;
