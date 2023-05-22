import { CircularProgress, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <div className={classes.loadingContainer}>
            <CircularProgress />
            <Typography variant="h6" component="h6" gutterBottom>
                Cargando...
            </Typography>
        </div>
    );
};

export default Loading;
