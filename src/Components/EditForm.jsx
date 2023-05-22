// EditForm.jsx
import { useState, useEffect } from 'react';
import { TextField, Button, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import UseApiTypes from '../Hooks/UseApiTypes';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
}));


const EditForm = ({ permission, onSave }) => {
    EditForm.propTypes = {
        permission: PropTypes.shape({
            id: PropTypes.number.isRequired,
            nombreEmpleado: PropTypes.string.isRequired,
            apellidoEmpleado: PropTypes.string.isRequired,
            tipoPermiso: PropTypes.number.isRequired
        }).isRequired,
        onSave: PropTypes.func.isRequired,
    };
    const classes = useStyles();
    const [formData, setFormData] = useState({
        id: '0',
        nombreEmpleado: '',
        apellidoEmpleado: '',
        tipoPermiso: '',
        fechaPermiso: '',
    });
    // const [comboBoxData, setComboBoxData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const { data: comboBoxData, get } = UseApiTypes();




    useEffect(() => {
        get('/PermissionType');
    }, []);
    // Si hay un permiso seleccionado, actualizamos el estado inicial del formulario con sus valores
    useState(() => {
        if (permission) {
            setFormData({
                id: permission.id,
                nombreEmpleado: permission.nombreEmpleado,
                apellidoEmpleado: permission.apellidoEmpleado,
                tipoPermiso: permission.tipoPermiso,
            });

            setSelectedValue(permission.tipoPermiso)
        }
    }, [permission]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <form className={classes.form}>
            <TextField
                label="Nombre Empleado"
                name="nombreEmpleado"
                value={formData.nombreEmpleado}
                onChange={handleChange}
            />
            <TextField
                label="Apellido Empleado"
                name="apellidoEmpleado"
                value={formData.apellidoEmpleado}
                onChange={handleChange}
            />

            <FormControl>
                <InputLabel id="comboBox-label">Tipo de Permiso</InputLabel>
                <Select
                    labelId="comboBox-label"
                    id="comboBox"
                    name='tipoPermiso'
                    value={selectedValue}
                    onChange={(event) => { setSelectedValue(event.target.value); handleChange(event); }}
                >
                    {comboBoxData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.descripcion}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
            </Button>
        </form >
    );


};

export default EditForm;
