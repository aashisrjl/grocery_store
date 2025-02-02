import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import {
  createTheme,
  filledInputClasses,
  inputBaseClasses,
  inputLabelClasses,
  paperClasses,
  radioClasses,
  SvgIcon,
  switchClasses,
  tableCellClasses,
  tableRowClasses
} from '@mui/material';
import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

// Used only to create transitions
const muiTheme = createTheme();

export const createComponents = ({ palette }) => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.neutral[200],
          color: palette.text.secondary,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600
        },
        sizeLarge: {
          fontSize: 15
        },
        sizeMedium: {
          fontSize: 14
        },
        sizeSmall: {
          fontSize: 13
        },
        contained: {
          '&:focus': {
            boxShadow: `${alpha(palette.primary.main, 0.25)} 0 0 0 0.2rem`
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: `0px 0px 1px ${palette.neutral[200]}, 0px 1px 3px ${alpha(palette.neutral[800],
              0.08)}`
          }
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: 20,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 20
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16
        },
        subheader: {
          fontSize: 14
        },
        title: {
          fontSize: 16
        }
      }
    },
    MuiChip: {
      defaultProps: {
        deleteIcon: (
          <SvgIcon>
            <XCircleIcon />
          </SvgIcon>
        )
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 400,
          letterSpacing: 0
        },
        avatar: {
          backgroundColor: palette.neutral[200],
          borderRadius: 6
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: palette.text.secondary,
            opacity: 1
          },
          [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
            '&::placeholder': {
              opacity: 1 + '!important'
            }
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          borderStyle: 'solid',
          borderWidth: 1,
          overflow: 'hidden',
          padding: '6px 12px',
          transition: muiTheme.transitions.create([
            'border-color',
            'box-shadow'
          ]),
          backgroundColor: palette.background.paper,
          borderColor: palette.neutral[300],
          boxShadow: `0px 1px 2px 0px ${alpha(palette.neutral[800], 0.08)}`,
          '&:hover': {
            backgroundColor: palette.action.hover
          },
          '&:before': {
            display: 'none'
          },
          '&:after': {
            display: 'none'
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: palette.action.disabledBackground,
            borderColor: palette.neutral[300],
            boxShadow: 'none'
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            borderColor: palette.primary.main,
            boxShadow: `${alpha(palette.primary.main, 0.25)} 0 0 0 0.2rem`
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main,
            boxShadow: `${alpha(palette.error.main, 0.25)} 0 0 0 0.2rem`
          }
        },
        input: {
          padding: 0,
          height: 'unset',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.6
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            marginBottom: 8,
            position: 'relative',
            transform: 'none'
          }
        }
      }
    },
    MuiRadio: {
      defaultProps: {
        checkedIcon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="18"
              height="18"
              rx="9"
              fill="currentColor"
            />
            <rect
              x="2"
              y="2"
              width="14"
              height="14"
              rx="7"
              fill="currentColor"
            />
            <rect
              x="5"
              y="5"
              width="8"
              height="8"
              rx="4"
              fill={palette.background.paper}
            />
          </svg>
        ),
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="18"
              height="18"
              rx="9"
              fill="currentColor"
            />
            <rect
              x="2"
              y="2"
              width="14"
              height="14"
              rx="7"
              fill={palette.background.paper}
            />
          </svg>
        )
      },
      styleOverrides: {
        root: {
          color: palette.text.secondary,
          transition: 'color 250ms',
          '&:hover': {
            backgroundColor: 'transparent'
          },
          [`&:hover:not(.${radioClasses.checked})`]: {
            color: palette.text.primary
          }
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          borderRadius: 48,
          height: 24,
          marginBottom: 8,
          marginLeft: 8,
          marginRight: 8,
          marginTop: 8,
          padding: 0,
          width: 44,
          '&:focus-within': {
            boxShadow: `${alpha(palette.primary.main, 0.25)} 0 0 0 0.2rem`
          }
        },
        switchBase: {
          padding: 4,
          '&:hover': {
            backgroundColor: 'transparent'
          },
          [`&.${switchClasses.checked}+.${switchClasses.track}`]: {
            opacity: 1
          },
          [`&.${switchClasses.disabled}+.${switchClasses.track}`]: {
            opacity: 1
          },
          [`&.${switchClasses.checked}.${switchClasses.disabled}+.${switchClasses.track}`]: {
            opacity: 0.5
          },
          [`&.${switchClasses.disabled}`]: {
            [`&+.${switchClasses.track}`]: {
              backgroundColor: alpha(palette.neutral[500], 0.08)
            },
            [`& .${switchClasses.thumb}`]: {
              backgroundColor: alpha(palette.neutral[500], 0.26)
            }
          }
        },
        track: {
          backgroundColor: palette.neutral[500],
          opacity: 1
        },
        thumb: {
          backgroundColor: common.white,
          height: 16,
          width: 16
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: palette.divider
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: palette.neutral[50],
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: palette.divider,
          [`.${tableCellClasses.root}`]: {
            color: palette.text.secondary,
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase'
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          [`&:last-of-type .${tableCellClasses.root}`]: {
            borderWidth: 0
          },
          [`&.${tableRowClasses.hover}`]: {
            '&:hover': {
              backgroundColor: palette.neutral[50]
            }
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled'
      }
    }
  };
};
