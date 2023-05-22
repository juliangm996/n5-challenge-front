import { useEffect, useState, useCallback } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import useApi from '../Hooks/UseApi';
import EditFormModal from './EditFormModal';
import Loading from './Loading';

const PermissionsTable = () => {
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const { data: permissions, get, post, put, loading } = useApi();



    const fetchData = useCallback(async () => {
        await get('/Permission/GetPermissions');
        setIsDataFetched(true); // Actualiza el estado indicando que la llamada GET se ha realizado
    }, [get]);

    useEffect(() => {
        if (!isDataFetched) {
            fetchData();
        }
    }, [fetchData, isDataFetched]);


    const handleEdit = (permission) => {
        setSelectedPermission(permission);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedPermission(null);
        setIsModalOpen(true);
    };

    const handleSave = async (formData) => {
        if (selectedPermission) {
            await put(`/Permission/ModifyPermission`, formData);
        } else {
            await post('/Permission/RequestPermissions', formData);
        }
        await fetchData();
        setIsModalOpen(false);
    };

    // Resto del código...
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre Empleado</TableCell>
                            <TableCell>Apellido Empleado</TableCell>
                            <TableCell>Tipo Permiso</TableCell>
                            <TableCell>Fecha Permiso</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permissions.map((permission) => (
                            <TableRow key={permission.id}>
                                <TableCell>{permission.id}</TableCell>
                                <TableCell>{permission.nombreEmpleado}</TableCell>
                                <TableCell>{permission.apellidoEmpleado}</TableCell>
                                <TableCell>{permission.tipoPermiso}</TableCell>
                                <TableCell>{permission.fechaPermiso}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(permission)}>
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" color="primary" onClick={handleAdd}>
                Agregar Permiso
            </Button>

            <EditFormModal open={isModalOpen} onClose={() => setIsModalOpen(false)}
                permission={selectedPermission} onSave={handleSave} />

        </div>
    );
};

export default PermissionsTable;
