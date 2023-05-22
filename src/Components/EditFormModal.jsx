import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import EditForm from './EditForm';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        padding: theme.spacing(3),
    },
}));

const EditFormModal = ({ open, onClose, onSave, permission }) => {

    EditFormModal.propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        permission: PropTypes.shape({
            id: PropTypes.number,
            nombreEmpleado: PropTypes.string,
            apellidoEmpleado: PropTypes.string,
            tipoPermiso: PropTypes.number,
            fechaPermiso: PropTypes.string,
            permissionTypes: PropTypes.array,
        }),
    };
    const classes = useStyles();



    return (
        <Modal
            open={open}
            onClose={onClose}
            className={classes.modal}
        >
            <Paper className={classes.paper}>
                <Typography variant="h6">Editar Permiso</Typography>
                <EditForm permission={permission} onSave={onSave} />
            </Paper>
        </Modal>
    );
};

export default EditFormModal;
