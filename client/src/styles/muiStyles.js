import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '25px 20px',
      [theme.breakpoints.up('md')]: {
        padding: '50px 250px',
      },
    },
    formTitle: {
      textAlign: 'center',
    },
    input: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    inputIcon: {
      marginRight: 8,
    },
    radioLabel: {
      marginLeft: 9,
    },
    radioGroup: {
      marginLeft: 20,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 30,
      },
    },
    radioInput: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
      flexWrap: 'wrap',
    },
    tags: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    tagButton: {
      marginLeft: 10,
    },
    tag: {
      marginLeft: 14,
      textTransform: 'uppercase',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 7,
      },
    },
    tagGroup: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginTop: 8,
        marginLeft: 12,
      },
    },
    tagArea: {
      display: 'flex',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
    },
    buttonGroup: {
      marginTop: 8,
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  { index: 1 }
);

export const useCardStyles = (isViewed, darkMode) => {
  return makeStyles(
    (theme) => ({
      root: {
        marginTop: 20,
        marginBottom: 5,
        padding: 20,
        borderColor: isViewed ? theme.palette.primary.main : '',
        backgroundColor: isViewed ? theme.palette.primary.main + '20' : '',
        color: isViewed
          ? darkMode
            ? '#ffffff'
            : theme.palette.primary.main
          : '',
      },
      cardTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
          alignItems: 'center',
          flexWrap: 'wrap',
        },
      },
      endButtons: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          width: '100%',
          justifyContent: 'space-between',
        },
      },
      linkTitle: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        [theme.breakpoints.down('xs')]: {
          fontSize: 20,
        },
      },
      tag: {
        marginRight: 5,
        textTransform: 'uppercase',
        '&:hover': {
          backgroundColor: '#b0a7c7',
        },
        [theme.breakpoints.down('xs')]: {
          marginBottom: 5,
        },
      },
      tagsGroup: {
        marginBottom: '1.2em',
        [theme.breakpoints.down('xs')]: {
          marginBottom: '0.8em',
        },
      },
      link: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.6em',
        [theme.breakpoints.down('xs')]: {
          fontSize: 16,
        },
      },
      description: {
        marginTop: '0.8em',
        marginBottom: '1.2em',
        [theme.breakpoints.down('xs')]: {
          marginBottom: '1em',
        },
      },
      edit: {
        color: '#7a8efe',
        fontSize: 16,
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: '#dce1ff',
        },
        marginRight: 5,
      },
      starButton: {
        color: '#ffa827',
        borderRadius: 4,
        marginLeft: 1,
        paddingRight: 8,
        '&:hover': {
          backgroundColor: '#ffefd8',
        },
        [theme.breakpoints.down('xs')]: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      viewButton: {
        color: '#46aaa0',
        paddingRight: 8,
        borderRadius: 4,
        '&:hover': {
          backgroundColor: '#d8efed',
        },
        [theme.breakpoints.down('xs')]: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      starIcon: {
        color: '#ffa827',
      },
      viewIcon: {
        color: '#46aaa0',
      },
      addedTime: {
        marginTop: 8,
      },
      timestamp: {
        fontStyle: 'italic',
        fontWeight: 'bold',
      },
    }),
    { index: 1 }
  );
};

export const useEntriesDisplayStyles = makeStyles(
  (theme) => ({
    flexedBar: {
      padding: 15,
      paddingBottom: 0,
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    textAndButton: {
      display: 'flex',
      alignItems: 'flex-start',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-between',
      },
    },
    infoText: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 18,
      },
    },
    goBackButton: {
      marginRight: 20,
      [theme.breakpoints.down('xs')]: {
        marginRight: 15,
      },
    },
    goBackButtonRound: {
      minWidth: '2.6em',
      borderRadius: '10em',
      marginRight: 15,
      padding: '0.4em',
    },
    middleText: {
      textAlign: 'center',
      marginTop: 90,
    },
    sortMenuWrapper: {
      marginLeft: 'auto',
    },
  }),
  { index: 1 }
);

export const useFilterStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '15px 0',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        flexWrap: 'wrap',
        padding: '0 10px',
        margin: '10px 0',
      },
    },
    checkboxGroup: {
      [theme.breakpoints.down('xs')]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 40px)',
        width: '100%',
      },
    },
    filterButton: {
      [theme.breakpoints.down('xs')]: {
        marginTop: 10,
        width: '100%',
      },
    },
    resetBtn: {
      [theme.breakpoints.down('xs')]: {
        maxHeight: '35px',
      },
    },
  }),
  { index: 1 }
);

export const useSearchStyles = makeStyles(
  (theme) => ({
    root: {
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
    field: {
      [theme.breakpoints.down('xs')]: {
        paddingRight: 0,
      },
    },
  }),
  { index: 1 }
);

export const useSortStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      marginRight: 10,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },
    sortIcon: {
      marginRight: 5,
    },
    select: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },
  }),
  { index: 1 }
);

export const useNavStyles = makeStyles(
  (theme) => ({
    navContainer: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    topLeftButton: {
      flexGrow: 1,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 10,
      },
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '300px',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 18,
      },
    },
    madeBy: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 11,
      },
    },
    logoIcon: {
      marginRight: 5,
    },
    user: {
      marginRight: 10,
    },
    titleButton: {
      textTransform: 'capitalize',
      fontSize: 20,
      marginRight: 12,
    },
    navButtons: {
      '&:hover': {
        backgroundColor: '#88929c',
      },
    },
  }),
  { index: 1 }
);

export const useTopPanelStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: 15,
      padding: 10,
    },
    desktopButton: {
      margin: '8px 0px 5px 19px',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1000,
    },
  }),
  { index: 1 }
);

export const useDeleteBtnStyles = makeStyles(
  () => ({
    deleteButton: {
      color: '#ff846e',
      textTransform: 'capitalize',
      fontSize: 16,
      '&:hover': {
        backgroundColor: '#ffe8e4',
      },
      marginRight: 5,
    },
  }),
  { index: 1 }
);

export const useRegisterLoginForm = makeStyles(
  (theme) => ({
    root: {
      minHeight: '100%',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '25px 20px',
      [theme.breakpoints.up('md')]: {
        padding: '50px 300px',
      },
    },
    formTitle: {
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.6rem',
      },
    },
    submitButton: {
      marginTop: 25,
    },
    input: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    inputIcon: {
      marginRight: 8,
    },
    bottomText: {
      textAlign: 'center',
      marginTop: 8,
    },
  }),
  { index: 1 }
);

export const useAlertStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      marginTop: 10,
    },
  }),
  { index: 1 }
);

export const useMainPaperStyles = makeStyles(
  () => ({
    root: {
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
    },
  }),
  { index: 1 }
);
