import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      padding: 150,
      paddingTop: 10,
      paddingBottom: 60,
    },
    paddingTop: 10,
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
}));

export const useCardStyles = (isViewed) => {
  return makeStyles((theme) => ({
    root: {
      marginTop: 20,
      marginBottom: 5,
      padding: 20,
      borderColor: isViewed ? '#9a8fb8' : '',
      backgroundColor: isViewed ? '#f1eff5' : '',
      color: isViewed ? '#8f83b0' : '',
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
      marginTop: 8,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
      },
    },
    edit: {
      color: '#536dfe',
      fontSize: 16,
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: '#dce1ff',
      },
      marginRight: 5,
    },
    starButton: {
      borderRadius: 4,
      marginLeft: 1,
      paddingRight: 8,
      '&:hover': {
        backgroundColor: '#ffefd8',
      },
    },
    viewButton: {
      paddingRight: 8,
      borderRadius: 4,
      '&:hover': {
        backgroundColor: '#d8efed',
      },
    },
    addedTime: {
      marginTop: 8,
    },
    timestamp: {
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
  }));
};

export const useEntriesDisplayStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  textAndButton: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  infoText: {
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  goBackButton: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
}));

export const useFilterStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  checkboxGroup: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  filterButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
      width: '100%',
    },
  },
}));

export const useSearchStyles = makeStyles((theme) => ({
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
}));

export const useSortStyles = makeStyles((theme) => ({
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
}));

export const useNavStyles = makeStyles({
  main: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  user: {
    marginRight: 10,
  },
  titleButton: {
    textTransform: 'capitalize',
    fontSize: 20,
  },
});

export const useFabStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const useDeleteBtnStyles = makeStyles((theme) => ({
  deleteButton: {
    color: '#ff6347',
    textTransform: 'capitalize',
    fontSize: 16,
    '&:hover': {
      backgroundColor: '#ffe8e4',
    },
    marginRight: 5,
  },
}));

export const useRegisterLoginForm = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      padding: 240,
      paddingTop: 10,
      paddingBottom: 60,
    },
    paddingTop: 10,
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
}));
